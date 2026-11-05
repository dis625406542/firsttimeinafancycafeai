import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { pool } from "./db";
import { findJob, videoAvailable } from "./video-jobs";
import { getGeneratedVideoUrl } from "./r2";

function deliveryToken(id: string, email: string) {
  const secret = process.env.VIDEO_HANDLE_SECRET;
  if (!secret || secret.length < 32) throw new Error("VIDEO_HANDLE_SECRET is not configured.");
  return createHmac("sha256", secret).update(`tiny-desk-delivery:${id}:${email}`).digest("hex");
}

// Email links are private bearer tokens, not order codes. The video itself stays in private R2;
// every visit checks payment, storage and the 30-day expiry before issuing a 5-minute URL.
export async function videoForEmailLink(code: string, token: string) {
  if (!/^[A-F0-9]{32}$/.test(code) || !/^[a-f0-9]{64}$/.test(token)) return null;
  const order = (await pool().query<{ id: string; code: string; visitor_hash: string; notification_email: string }>(
    `SELECT id,code,visitor_hash,notification_email FROM {schema}.billing_orders
     WHERE code=$1 AND notification_email IS NOT NULL AND notification_sent_at IS NOT NULL
       AND status='paid' AND template_id='tiny-desk-ai'`, [code])).rows[0];
  if (!order) return null;
  const expected = deliveryToken(order.id, order.notification_email);
  if (!timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"))) return null;
  const job = await findJob(order.visitor_hash, code);
  if (!job || !videoAvailable(job) || !job.r2_key) return null;
  return getGeneratedVideoUrl(job.r2_key, true);
}

export async function sendReadyVideoEmail() {
  const key = process.env.RESEND_API_KEY, from = process.env.VIDEO_EMAIL_FROM;
  if (!key || !from) return;
  const claimed = await pool().query<{ id: string; code: string; visitor_hash: string; notification_email: string }>(
    `UPDATE {schema}.billing_orders o SET notification_claimed_at=now()
     WHERE o.id=(SELECT b.id FROM {schema}.billing_orders b
       JOIN {schema}.video_jobs j ON j.code=b.code AND j.visitor_hash=b.visitor_hash
       WHERE b.notification_email IS NOT NULL AND b.notification_sent_at IS NULL AND b.status='paid'
       AND j.status='finished' AND j.r2_key IS NOT NULL AND COALESCE(j.completed_at,j.stored_at,j.created_at)>now()-interval '30 days'
       AND (b.notification_claimed_at IS NULL OR b.notification_claimed_at<now()-interval '10 minutes')
       ORDER BY b.paid_at ASC LIMIT 1 FOR UPDATE OF b SKIP LOCKED)
     RETURNING o.id,o.code,o.visitor_hash,o.notification_email`);
  const order = claimed.rows[0];
  if (!order) return;
  const site = "https://firsttimeinafancycafeai.org";
  const url = `${site}/api/video/email?code=${order.code}&token=${deliveryToken(order.id, order.notification_email)}`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(15000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `tiny-desk-ready-${order.id}` },
      body: JSON.stringify({ from, to: [order.notification_email], subject: "Your Fancy Cafe AI video is ready",
        text: `Your video is ready. Download it within 30 days of completion: ${url}\n\nThis private link grants access to your video. Do not forward it. If the link expires, your video may still be available in the original browser. Your video code: ${order.code}\n\nFancy Cafe AI` }),
    });
    if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
    await pool().query("UPDATE {schema}.billing_orders SET notification_sent_at=now() WHERE id=$1 AND notification_sent_at IS NULL AND notification_claimed_at IS NOT NULL", [order.id]);
  } catch (error) {
    console.error("Optional delivery email failed; original-browser video remains available", { orderId: order.id, error: error instanceof Error ? error.message : "Unknown error" });
  }
}
