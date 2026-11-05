import { timingSafeEqual } from "node:crypto";
import { pool } from "@/lib/db";
import { startPaidOrder, recoverStaleOrders, purgeOrderInputs } from "@/lib/paid-generation";
import { deleteGeneratedVideo } from "@/lib/r2";
import { sendReadyVideoEmail } from "@/lib/video-email";
import { findJob, needsArchival } from "@/lib/video-jobs";
import { refreshVideo, archiveVideo } from "@/lib/video-delivery";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=300;
export async function GET(request:Request) {
 const secret=process.env.CRON_SECRET||"";
 const supplied=request.headers.get("authorization")||"";
 const expected=`Bearer ${secret}`;
 if(secret.length<32 || supplied.length!==expected.length || !timingSafeEqual(Buffer.from(supplied),Buffer.from(expected))) return new Response(null,{status:401});
 let started=0,polled=0,cleaned=0,heavyDelivery=false;
 try {
  await recoverStaleOrders();
  const active=(await pool().query("SELECT visitor_hash,code FROM {schema}.video_jobs WHERE (delivery_locked_until IS NULL OR delivery_locked_until<now()) AND ((r2_key IS NULL AND ((status='running' AND (video_url IS NULL OR storage_retry_at IS NULL OR storage_retry_at<=now())) OR (status='finished' AND video_url IS NOT NULL AND COALESCE(completed_at,created_at)>now()-interval '30 days' AND (storage_retry_at IS NULL OR storage_retry_at<=now())))) OR (r2_key IS NOT NULL AND code IN (SELECT code FROM {schema}.billing_orders WHERE generation_status<>'finished'))) ORDER BY updated_at LIMIT 1")).rows;
  for(const row of active) {
   await refreshVideo(row.visitor_hash,row.code).catch(()=>{});polled++;
   const current=await findJob(row.visitor_hash,row.code);
   if(current && (needsArchival(current) || current.r2_key)) {
    heavyDelivery=needsArchival(current);
    await archiveVideo(row.visitor_hash,row.code);
   }
  }
  // One heavy operation per invocation: preparation/uploads and local encoding
  // must not consume the same 300-second route budget. A light provider poll
  // does not block queued purchases; only an actual archive attempt takes priority.
  if(!heavyDelivery) {
   const ready=(await pool().query("SELECT id FROM {schema}.billing_orders WHERE status='paid' AND generation_status='ready' ORDER BY paid_at LIMIT 1")).rows;
   for(const row of ready) {await startPaidOrder(row.id).catch(()=>{});started++;}
  }
  const expired=(await pool().query("SELECT id FROM {schema}.billing_orders WHERE input_photos<>'[]'::jsonb AND (input_expires_at<now() OR generation_status='finished') LIMIT 20")).rows;
  for(const row of expired) {try {await purgeOrderInputs(row.id);cleaned++;} catch {/* lifecycle is the independent fallback */}}
  // Explicitly purge expired outputs; any shorter bucket lifecycle must be removed in R2 settings.
  const oldVideos=(await pool().query<{code:string;r2_key:string}>("SELECT code,r2_key FROM {schema}.video_jobs WHERE r2_key IS NOT NULL AND COALESCE(completed_at,stored_at,created_at)<now()-interval '30 days' ORDER BY completed_at LIMIT 10")).rows;
  for(const old of oldVideos) {
   try {await deleteGeneratedVideo(old.r2_key);await pool().query("UPDATE {schema}.video_jobs SET r2_key=NULL,updated_at=now() WHERE code=$1 AND r2_key=$2",[old.code,old.r2_key]);}
   catch(error) {console.error("Expired video purge failed",{code:old.code,error});}
  }
  await sendReadyVideoEmail().catch(error => console.error("Video email worker error", error));
  await pool().query("DELETE FROM {schema}.request_limits WHERE window_start<now()-interval '3 days'");
  return Response.json({started,polled,cleaned},{headers:{"Cache-Control":"no-store"}});
 } catch {return Response.json({error:"Worker failed. Paid orders remain recorded."},{status:503});}
}
