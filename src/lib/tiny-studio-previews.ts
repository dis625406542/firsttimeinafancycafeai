// Short-lived, low-resolution display-only thumbnails. Original photos are stored server-side
// with the paid order; never cache full-resolution uploads or reuse thumbnails as input files.
type SavedFaces = Partial<Record<"back-left" | "back-right" | "keys" | "lead" | "sax", string>>;
type SessionStore = Pick<Storage, "getItem" | "setItem">;
const slots = ["back-left", "back-right", "keys", "lead", "sax"] as const;
const ttl = 3 * 24 * 60 * 60 * 1000;
const key = (code: string) => `tiny-desk-submitted-faces:${code}`;
const isCode = (code: string) => /^[A-F0-9]{32}$/.test(code);
function validFaces(value: unknown): value is SavedFaces {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length < 1 || entries.length > slots.length) return false;
  return entries.every(([slot, data]) =>
    (slots as readonly string[]).includes(slot) &&
    typeof data === "string" &&
    /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(data) &&
    data.length < 25000
  );
}
export function saveSubmittedFaces(storage: SessionStore, code: string, faces: unknown, now = Date.now()): boolean {
  if (!isCode(code) || !validFaces(faces)) return false;
  try { storage.setItem(key(code), JSON.stringify({ at: now, faces })); return true; }
  catch { return false; } // Private browsing / quota: generation must continue without previews.
}
export function loadSubmittedFaces(storage: SessionStore, code: string, now = Date.now()): Partial<SavedFaces> {
  if (!isCode(code)) return {};
  try {
    const entry = JSON.parse(storage.getItem(key(code)) || "null");
    if (!entry || !Number.isFinite(entry.at) || entry.at > now || entry.at + ttl < now || !validFaces(entry.faces)) return {};
    return entry.faces;
  } catch { return {}; }
}
