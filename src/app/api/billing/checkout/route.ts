import { cafeLaunchReady } from "@/lib/cafe-launch";
import { pool } from "@/lib/db";
import { normalizeTinyPortrait } from "@/lib/portrait-normalization";
import { assertTinyReady } from "@/lib/tiny-composition";
import { needsComposition, validateCafeSlots, validateTinyDeskSlots, videoTemplate } from "@/lib/video-templates";
import { localMockPayments } from "@/lib/local-mock-payments";
import { enabled as generationEnabled } from "@/lib/video-access";
import { parseTemplate, templatePhotoCount } from "@/lib/video-templates";
import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/video-access";
import { visitorFrom } from "@/lib/video-visitor";
import { checkoutReady } from "@/lib/billing-ready";
import { createOrder, saveOrderPhotos, checkoutFor, orderFor, completeLocalMockPayment, publicOrder } from "@/lib/billing-orders";
import { consumeLimit } from "@/lib/billing-catalog";
import { ImageModerationError, moderatePortraits } from "@/lib/image-moderation";
import { validatePhotos, validatePhotoBytes } from "@/lib/photo-validation";
import { selectPromptScenario } from "@/lib/video-prompt";
import { SITE_URL } from "@/lib/site";
import { checkoutReturnOrigin } from "@/lib/checkout-origin";
export const runtime="nodejs";
export const maxDuration=300;
const json=(data:unknown,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request:Request) {
 // The legacy checkout is for a different product. Keep it inaccessible until the cafe assets and checkout are reviewed.
 if(!cafeLaunchReady()) return json({error:"Cafe generation is in preview. No payment was taken."},503);
 if(!sameOrigin(request)) return json({error:"Invalid request origin."},403);
 const visitor=visitorFrom(request);
 if(!visitor) return json({error:"Refresh this page first and keep your browser cookie."},401);
 if(Number(request.headers.get("content-length")||0)>4000000) return json({error:"Please use smaller photos."},413);
 try {
  if(!await consumeLimit("checkout",visitor,10) || !await consumeLimit("checkout-global","all",100,86400)) return json({error:"Too many checkout requests. Please try again later."},429);
  const form=await request.formData();
  const email=String(form.get("email")||"").trim();
  // The address is recorded on the order for manual delivery; it no longer requires an email provider.
  if(email && (email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return json({error:"Enter a valid email address, or leave it empty."},400);
  const templateId=parseTemplate(form.get("template"));
  if(!templateId) return json({error:"Unknown video template."},400);

  const mockPayment=localMockPayments(request,templateId);
  if(!(mockPayment ? generationEnabled() : checkoutReady())) return json({error:"Secure checkout or video generation is not configured yet. No payment was taken."},503);
  const code=String(form.get("code")||"");
  if(!/^[A-F0-9]{32}$/.test(code)) return json({error:"Invalid video code."},400);
  // An existing pending order resumes its original immutable photo/price snapshot.
  let order=await orderFor(visitor,code);
  if(order && (order.provider==="local_mock")!==mockPayment) return json({error:"This order uses a different payment mode. Create a new video code."},409);
  if(order && order.template_id!==templateId) return json({error:"This order belongs to a different video template."},409);
  const version=order?.prompt_version??videoTemplate(templateId).promptVersion;
  const photoCount=templatePhotoCount(templateId,version);
  const tiny=needsComposition({templateId,promptVersion:version});
  if(tiny && !mockPayment && generationEnabled())await assertTinyReady({templateId,promptVersion:version});
  const photosInRange=order && order.input_photos.length>=photoCount.min && order.input_photos.length<=photoCount.max;
  if(!order || order.status==="pending" && !photosInRange) {
   const multi=templateId === "fancy-cafe-ai" || photoCount.max>2;
   const resolution=form.get("resolution"),aspect=(multi || photoCount.max===1) ? (form.get("aspectRatio") ?? "9:16") : form.get("aspectRatio");
   if(!["480p","720p"].includes(String(resolution)) || !["9:16","16:9"].includes(String(aspect)) || form.get("consent")!=="yes") return json({error:"Confirm your photo permissions and choose a video format."},400);
   const rawFiles=multi ? form.getAll("photos") : photoCount.max===1 ? [form.get("photo")] : [form.get("zombie"),form.get("survivor")];
   const slots=multi ? form.getAll("slots").map(String) : [];
   if(templateId === "fancy-cafe-ai")validateCafeSlots(slots); else if(tiny)validateTinyDeskSlots(slots);
   if (templateId === "fancy-cafe-ai" && rawFiles.length !== slots.length) return json({error:"Each uploaded portrait must have exactly one role."},400);
   validatePhotos(rawFiles,photoCount);await Promise.all(rawFiles.map(validatePhotoBytes));
   const files:File[]=[];
   for(const file of rawFiles) files.push(tiny ? await normalizeTinyPortrait(file) : file);
   // Three photos per call keeps checkout fast; unclear portraits pass, so batching cannot false-block.
   const assessments=[] as Awaited<ReturnType<typeof moderatePortraits>>;
   for(let i=0;i<files.length;i+=3) {
     try { assessments.push(...await moderatePortraits(files.slice(i,i+3))); }
     catch(error) {
       if(error instanceof ImageModerationError) {
         const match=/^Photo (\d+)/.exec(error.message);
         if(match) {
           const index=i+Number(match[1])-1,label=slots[index];
           throw new ImageModerationError(error.message.replace(/^Photo \d+/,`Photo ${index+1}${label?` (${label})`:""}`),error.status);
         }
       }
       throw error;
     }
   }
   const scenario=templateId==="zombie-couple"?selectPromptScenario(assessments):"gender_neutral";
   if(order && (order.resolution!==resolution || order.aspect_ratio!==aspect)) return json({error:"This order keeps its original format. Use a new video code to change formats."},409);
   const created=order?{order,created:true}:await createOrder(visitor,code,resolution as "480p"|"720p",aspect as "9:16"|"16:9",templateId,mockPayment?request:undefined);
   order=created.created?await saveOrderPhotos(created.order,files.map((file,index)=>({file,slot:slots[index]})),scenario):created.order;
  }
  if(email && order.status==="pending") await pool().query("UPDATE {schema}.billing_orders SET notification_email=$2 WHERE id=$1 AND status='pending'",[order.id,email]);
  if(mockPayment) {
   const paid=await completeLocalMockPayment(request,order);
   return json({mockPayment:true,code:paid.code,order:publicOrder(paid)});
  }
  const origin=checkoutReturnOrigin(request,{
   production:process.env.NODE_ENV==="production",siteUrl:SITE_URL,
   allowedDevOrigins:process.env.DEV_ALLOWED_ORIGINS || ""
  });
  const url=await checkoutFor(order,origin);
  return json({checkoutUrl:url,code:order.code});
 } catch(error) {
  if(error instanceof ImageModerationError) return json({error:error.message},error.status);
  const message=error instanceof Error?error.message:"";
  console.error("checkout failed:", message);
  const safe=/^(Invalid checkout origin|Upload|Use |Photo |File content|This video code|This code|This video option|This order|Photos are still|Checkout expired|This checkout expired|Payment environment)/.test(message);
  return json({error:safe?message:"Unable to open secure checkout. No video was ordered. Check your orders before trying again."},safe?409:503);
 }
}
