// Browser observations, not revenue accounting. Only allow non-identifying fields.
const EVENTS = new Set(["photo_approved", "photo_rejected", "checkout_started", "checkout_redirect", "checkout_error", "checkout_check_failed", "video_ready_viewed", "video_download_clicked"]);
export function studioEvent(name: string, input: Record<string, unknown> = {}) {
  if (!EVENTS.has(name)) return null;
  const params: Record<string, string | number> = {};
  if (["protagonist", "regular"].includes(String(input.role))) params.role = String(input.role);
  if (["480p", "720p"].includes(String(input.resolution))) params.resolution = String(input.resolution);
  if (["9:16", "16:9"].includes(String(input.aspect_ratio))) params.aspect_ratio = String(input.aspect_ratio);
  if (typeof input.photo_count === "number" && Number.isInteger(input.photo_count) && input.photo_count >= 1 && input.photo_count <= 2) params.photo_count = input.photo_count;
  return { name, params };
}
export function emitStudioEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const event = studioEvent(name, params);
  if (event) window.dispatchEvent(new CustomEvent("tiny-studio-event", { detail: event }));
}
