import { videoForEmailLink } from "@/lib/video-email";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const token = params.get("token") || "";
  try {
    const url = await videoForEmailLink(params.get("code") || "", token);
    if (url) return new Response(null, { status: 302, headers: { Location: url, "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex" } });
  } catch { /* Hide whether an order exists. */ }
  return new Response("This private video link is invalid or has expired.", { status: 404, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex" } });
}
