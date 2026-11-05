import { timingSafeEqual } from "node:crypto";
import { mediaHealth } from "../../../../../services/video-composer/local.mjs";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=15;

// An authenticated on-demand runtime check; deploying a Function does not start it.
export async function GET(request:Request) {
 const secret=process.env.CRON_SECRET||"";
 const supplied=request.headers.get("authorization")||"";
 const expected=`Bearer ${secret}`;
 if(secret.length<32 || supplied.length!==expected.length || !timingSafeEqual(Buffer.from(supplied),Buffer.from(expected)))return new Response(null,{status:401});
 try {
  return Response.json(await mediaHealth(),{headers:{"Cache-Control":"no-store"}});
 }catch(error){
  // Full error is already written to runtime logs; never reveal filesystem paths to a client.
  return Response.json({ok:false,error:"Media binary unavailable or encoder validation failed; inspect Vercel Function logs."},{status:503,headers:{"Cache-Control":"no-store"}});
 }
}
