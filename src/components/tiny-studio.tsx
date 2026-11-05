"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Maximize2, Plus, ShieldCheck, X } from "lucide-react";
import { loadSubmittedFaces, saveSubmittedFaces } from "@/lib/tiny-studio-previews";
import { fetchCheckoutCatalog } from "@/lib/billing-catalog-client";

import { emitStudioEvent } from "@/lib/studio-analytics";

export const TINY_TEMPLATE = "tiny-desk-ai";
type LocalPhoto = { file: File; url: string };
type SlotId = "back-left" | "back-right" | "keys" | "lead" | "sax";
type SlotPhoto = LocalPhoto & { status: "checking" | "approved" | "rejected"; error?: string };
const BAND_SLOTS: { id: SlotId; label: string; x: string; y: string }[] = [
  { id: "back-left", label: "Back left", x: "17%", y: "18%" },
  { id: "back-right", label: "Back right", x: "72%", y: "20%" },
  { id: "keys", label: "Keys", x: "44%", y: "48%" },
  { id: "lead", label: "Lead", x: "50%", y: "42%" },
  { id: "sax", label: "Sax", x: "44%", y: "40%" },
];
const SLOT_IMAGES: Record<SlotId, string> = {
  "back-left": "/tiny-band/slots/band-left.webp",
  "back-right": "/tiny-band/slots/band-left.webp",
  keys: "/tiny-band/slots/band-left.webp",
  lead: "/tiny-band/slots/band-lead.webp",
  sax: "/tiny-band/slots/band-sax.webp",
};
type Price = { resolution: "480p" | "720p"; amount_minor: number; currency: string; purchasable: boolean };
type Order = { code: string; status: string; generationStatus: string; resolution?: "480p" | "720p"; aspectRatio?: "9:16" | "16:9" };
type Job = { code: string; status: string; progress: number; videoUrl: string | null; error?: string; resolution?: string; aspectRatio?: string; durationSeconds?: number };
type Stage = "idle" | "redirecting" | "working" | "ready" | "failed";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const money = (amount: number, currency = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount / 100);

function newVideoCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => image.naturalWidth && image.naturalHeight ? resolve(image) : reject(new Error("This image is damaged."));
    image.onerror = () => reject(new Error("Please use a valid JPG, PNG or WebP image."));
    image.src = url;
  });
}

// Keep the long edge at 1600px (enough for the vision gate and the video model) and cap each
// file at 750 KB so five photos still fit under the serverless request-body limit.
async function optimizePhoto(file: File, source: string): Promise<File> {
  const image = await loadImage(source);
  const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare this photo.");
  context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  for (const quality of [0.9, 0.82, 0.72, 0.62, 0.5]) {
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
    if (blob && blob.size <= 750000) return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  }
  throw new Error("This photo is too large after optimization. Please choose a smaller image.");
}

export function TinyStudio() {
  const [band, setBand] = useState<Partial<Record<SlotId, SlotPhoto>>>({});
  const [quality, setQuality] = useState<"480p" | "720p">("480p");
  const [consent, setConsent] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9">("9:16");
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [paid, setPaid] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [billingReady, setBillingReady] = useState(false);
  const [sampleReady, setSampleReady] = useState(false);
  const [billingError, setBillingError] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [prices, setPrices] = useState<Price[]>([]);
  const [testMode, setTestMode] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<"example" | "videos">("example");
  const previewVideo = useRef<HTMLVideoElement | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedFaces, setSubmittedFaces] = useState<Partial<Record<SlotId, string>>>({});
  const [canceledCode, setCanceledCode] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const bootstrap = useRef<Promise<unknown> | null>(null);
  const activeCode = useRef<string | null>(null);
  const generationStarted = useRef(false);
  const poller = useRef<ReturnType<typeof setTimeout> | null>(null);
  const photoUrls = useRef(new Set<string>());
  const selectedPrice = prices.find(price => price.resolution === quality);

  useEffect(() => () => { photoUrls.current.forEach(url => URL.revokeObjectURL(url)); photoUrls.current.clear(); }, []);
  useEffect(() => () => { if (poller.current) clearTimeout(poller.current); }, []);
  // Render the poster in HTML; request the MP4 only after hydration and the payment check starts.
  useEffect(() => { const timer = setTimeout(() => setSampleReady(true), 1200); return () => clearTimeout(timer); }, []);
  // This is an estimate, not provider progress; stop below completion until the stored video is playable.
  useEffect(() => {
    if (!paid || stage !== "working") return;
    const timer = setInterval(() => {
      const code = activeCode.current;
      if (!code) return;
      const key = `tiny-desk-start-${code}`;
      let start = Number(localStorage.getItem(key));
      if (!start || start > Date.now()) { start = Date.now(); try { localStorage.setItem(key, String(start)); } catch { /* Private mode may disallow local storage. */ } }
      const minutes = Math.max(0, (Date.now() - start) / 60000);
      setSimulatedProgress(Math.min(92, Math.floor(12 + 80 * (1 - Math.exp(-minutes / 3)))));
    }, 1000);
    return () => clearInterval(timer);
  }, [paid, stage]);

  async function refreshBilling(code?: string): Promise<Order | null> {
    if (!code) { setBillingReady(false); setBillingError(""); }
    try {
      const url = `/api/billing?template=${TINY_TEMPLATE}${code ? `&code=${encodeURIComponent(code)}` : ""}`;
      // Only the read-only catalog may retry. Paid-order recovery keeps its own request.
      const data = code ? await (async () => {
        const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15000) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Payment information is unavailable.");
        return result;
      })() : await fetchCheckoutCatalog<{ error?: string; order?: Order; prices?: Price[]; enabled?: boolean; emailEnabled?: boolean; testMode?: boolean }>(url);
      if (data.order) return data.order as Order;
      setPrices((data.prices ?? []) as Price[]);
      setEnabled(data.enabled === true);
      setEmailEnabled(data.emailEnabled === true);
      setTestMode(data.testMode === true);
      return null;
    } catch (error) {
      if (code) throw error;
      setEnabled(false);
      setBillingError("We could not check checkout availability. Retry below; your photos stay here. If you already paid, your order can still be checked.");
      emitStudioEvent("checkout_check_failed");
      return null; // A failed catalog request must not prevent paid-order recovery.
    } finally {
      // The server-rendered button must not claim "unavailable" before this check completes.
      if (!code) setBillingReady(true);
    }
  }

  async function refreshJobs() {
    try {
      const response = await fetch(`/api/video?template=${TINY_TEMPLATE}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) return;
      const list = (data.jobs ?? []) as Job[];
      setJobs(list);
      const watched = activeCode.current;
      if (watched) {
        const match = list.find(job => job.code === watched);
        if (match && Number.isFinite(match.progress)) setProgress(current => Math.max(current ?? 0, Math.max(0, Math.min(match.videoUrl ? 100 : 99, match.progress))));
      }
    } catch { /* keep the last known state */ }
  }

  async function checkVideo(code: string) {
    try {
      const response = await fetch(`/api/video?template=${TINY_TEMPLATE}&code=${encodeURIComponent(code)}`, { cache: "no-store" });
      const data = await response.json() as Job & { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not check the video task.");
      if (typeof data.progress === "number" && Number.isFinite(data.progress)) setProgress(current => Math.max(current ?? 0, Math.max(0, Math.min(data.videoUrl ? 100 : 99, data.progress))));
      if (data.status === "finished" && data.videoUrl) {
        // Keep the example on screen; the result is opened by clicking it under "My videos".
        setStage("ready");
        emitStudioEvent("video_ready_viewed");
        setMessage("Your video is ready — open My videos to play or download it.");
        void refreshJobs();
        return;
      }
      if (data.status === "failed" || data.status === "unknown") {
        setStage("failed");
        setMessage(`${data.status === "unknown" ? "Submission status is uncertain" : "Video generation failed"}: ${data.error || "Contact support with your video code."} No new request was submitted.`);
        void refreshJobs();
        return;
      }
      setMessage(`Generating your video… progress is estimated until the finished video is available. You can leave and return in this browser.`);
      poller.current = setTimeout(() => void checkVideo(code), 6000);
    } catch (error) {
      setMessage(`${error instanceof Error ? error.message : "Status unavailable."} Checking again shortly.`);
      poller.current = setTimeout(() => void checkVideo(code), 12000);
    }
  }

  async function startGeneration(code: string) {
    if (generationStarted.current) return;
    generationStarted.current = true;
    activeCode.current = code;
    setStage("working"); setPaid(true);
    setMessage("Payment verified. Preparing your video…");
    try {
      const response = await fetch("/api/video", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, template: TINY_TEMPLATE }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Your purchase is saved. Check again later; do not pay again.");
      void checkVideo(code);
    } catch (error) {
      generationStarted.current = false;
      setStage("failed");
      setMessage(error instanceof Error ? error.message : "Your paid order is saved. Do not pay again.");
    }
  }

  async function resume(code: string, mode?: "success" | "cancel") {
    activeCode.current = code;
    const order = await refreshBilling(code);
    if (!order) return;
    if (order.resolution === "480p" || order.resolution === "720p") setQuality(order.resolution);
    if (order.aspectRatio === "9:16" || order.aspectRatio === "16:9") setAspectRatio(order.aspectRatio);
    if (order.status === "paid") {
      setPaid(true);
      setSubmitted(true);
      setSubmittedFaces(loadSubmittedFaces(sessionStorage, code));
      if (order.generationStatus === "ready") void startGeneration(code);
      else { setStage("working"); setMessage("Payment verified. Resuming your video…"); void checkVideo(code); }
    } else if (order.status === "pending") {
      if (mode === "success") {
        // Just paid in Stripe; wait for confirmation to arrive.
        setSubmitted(true);
        setSubmittedFaces(loadSubmittedFaces(sessionStorage, code));
        setStage("working");
        setMessage("Waiting for Stripe to confirm your payment. Do not pay again.");
        setTimeout(() => { void resume(code, "success").catch(() => setMessage("Payment check failed. Refresh this page to retry.")); }, 4000);
      } else {
        // Cancelled at Stripe or a plain refresh: return to an editable state and reuse the saved order.
        setCanceledCode(code);
        setSubmitted(false);
        setSubmittedFaces(loadSubmittedFaces(sessionStorage, code));
        setStage("idle");
        setMessage(mode === "cancel" ? "Payment was cancelled. Your photos are saved — edit them or generate again." : "");
        sessionStorage.setItem("tiny-desk-code", code);
      }
    } else {
      setStage("failed");
      setMessage(`This order is ${order.status}. No video will be generated; see Refund & delivery for help.`);
    }
  }

  useEffect(() => {
    let alive = true;
    bootstrap.current = (async () => {
      try {
        await refreshBilling();
        if (!alive) return;
        const params = new URLSearchParams(window.location.search);
        const returned = params.get("code");
        if (returned && /^[A-F0-9]{32}$/.test(returned)) {
          sessionStorage.setItem("tiny-desk-code", returned);
          history.replaceState(null, "", "/#studio");
          await resume(returned, params.get("checkout") === "cancel" ? "cancel" : "success");
        } else {
          const saved = sessionStorage.getItem("tiny-desk-code");
          if (saved) await resume(saved);
        }
        await refreshJobs();
        // Previous completed orders live on the server under this browser's signed cookie.
        // No sessionStorage or saved upload is required to recover their playable history.
      } catch (error) { if (alive) setMessage(error instanceof Error ? error.message : "Could not load checkout details."); }
    })();
    return () => { alive = false; };
    // Bootstrap once; resume() reads the URL and browser storage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function chooseSlotPhoto(slot: SlotId, file?: File) {
    if (!file) return;
    if (!ALLOWED.has(file.type) || !file.size || file.size > 10 * 1024 * 1024) {
      setMessage("Choose a JPG, PNG or WebP image under 10 MB.");
      return;
    }
    setMessage("");
    if (canceledCode) { setCanceledCode(null); setSubmittedFaces({}); } // Editing starts a fresh order.
    const url = URL.createObjectURL(file);
    photoUrls.current.add(url);
    setBand(current => {
      const previous = current[slot];
      if (previous?.url) { URL.revokeObjectURL(previous.url); photoUrls.current.delete(previous.url); }
      return { ...current, [slot]: { file, url, status: "checking" } };
    });
    try {
      const optimized = await optimizePhoto(file, url);
      setBand(current => current[slot] ? { ...current, [slot]: { ...current[slot]!, file: optimized } } : current);
      await bootstrap.current;
      const form = new FormData(); form.append("photo", optimized);
      const response = await fetch("/api/video/moderate", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok || !data.approved) throw new Error(data.error || "The AI could not approve this photo.");
      setBand(current => current[slot] ? { ...current, [slot]: { ...current[slot]!, status: "approved" } } : current);
      emitStudioEvent("photo_approved", { role: slot });
    } catch (error) {
      const detail = error instanceof Error ? error.message : "This photo cannot be used.";
      emitStudioEvent("photo_rejected", { role: slot });
      setBand(current => current[slot] ? { ...current, [slot]: { ...current[slot]!, status: "rejected", error: detail } } : current);
      setMessage(detail);
    }
  }

  function removeSlot(slot: SlotId) {
    setBand(current => {
      const next = { ...current };
      if (next[slot]) { URL.revokeObjectURL(next[slot]!.url); photoUrls.current.delete(next[slot]!.url); }
      delete next[slot];
      return next;
    });
    setSubmittedFaces(current => { const next = { ...current }; delete next[slot]; return next; });
    setCanceledCode(null); // 照片不再完整，废弃可复用的订单
    setMessage("");
  }

  async function startCheckout() {
    if (busy) return;
    const filled = BAND_SLOTS.map(slot => ({ slot: slot.id, label: slot.label, photo: band[slot.id] })).filter(entry => entry.photo);
    const checking = filled.some(entry => entry.photo!.status === "checking");
    if (!enabled || !selectedPrice?.purchasable) { setMessage("Checkout is not available yet. No payment was taken."); return; }
    const reuse = !!canceledCode && filled.length === 0;
    if (!reuse && filled.length < 1) { setMessage("Upload at least one performer photo first."); return; }
    if (checking) { setMessage("Wait until the selected photos finish the AI safety check."); return; }
    if (!consent) { setMessage("Confirm you have permission to use these photos first."); return; }
    if (emailEnabled && email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) { setMessage("Enter a valid email address, or leave it empty."); return; }
    setShowConfirm(false);
    const code = reuse ? canceledCode! : newVideoCode();
    if (!reuse) { setSubmitted(false); setSubmittedFaces({}); setProgress(null); }
    setBusy(true); setStage("redirecting");
    emitStudioEvent("checkout_started", { resolution: quality, aspect_ratio: aspectRatio, photo_count: reuse ? previewCount : filled.length });
    setMessage(testMode ? "Opening Stripe test checkout. Use a test card; no real money is charged." : "Opening secure checkout…");
    try {
      const form = new FormData();
      form.append("code", code); form.append("template", TINY_TEMPLATE);
      form.append("resolution", quality);
      form.append("aspectRatio", aspectRatio); form.append("consent", "yes");
      if (!reuse) for (const entry of filled) { form.append("photos", entry.photo!.file); form.append("slots", entry.slot); }
      if (emailEnabled && email) form.append("email", email.trim());
      const response = await fetch("/api/billing/checkout", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not open secure checkout.");
      if (data.mockPayment === true) { sessionStorage.setItem("tiny-desk-code", data.code); await resume(data.code); return; }
      if (!data.checkoutUrl) throw new Error("Checkout did not return a payment link.");
      // Stripe is a full-page redirect. Keep only tiny display previews for this order's return; the server already holds the original five uploads.
      try {
        const previews = await Promise.all(filled.map(async entry => {
          const image = await loadImage(entry.photo!.url);
          const canvas = document.createElement("canvas"); canvas.width = canvas.height = 96;
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Thumbnail canvas unavailable");
          const side = Math.min(image.naturalWidth, image.naturalHeight);
          context.drawImage(image, (image.naturalWidth-side)/2, (image.naturalHeight-side)/2, side, side, 0, 0, 96, 96);
          return [entry.slot, canvas.toDataURL("image/jpeg", 0.65)] as const;
        }));
        saveSubmittedFaces(sessionStorage, code, Object.fromEntries(previews));
      } catch { /* Previews are optional; never block checkout. */ }
      sessionStorage.setItem("tiny-desk-code", code);
      emitStudioEvent("checkout_redirect", { resolution: quality, aspect_ratio: aspectRatio });
      window.location.assign(data.checkoutUrl);
    } catch (error) {
      setStage("idle");
      emitStudioEvent("checkout_error", { resolution: quality, aspect_ratio: aspectRatio });
      setMessage(error instanceof TypeError || (error instanceof DOMException && error.name === "AbortError")
        ? "Could not connect to secure checkout. Please check your connection and try again; no new checkout request will be sent automatically."
        : error instanceof Error ? error.message : "Unable to open checkout. No payment was taken.");
    } finally { setBusy(false); }
  }

  const priceLabel = (resolution: "480p" | "720p", fallback: string) => {
    const price = prices.find(item => item.resolution === resolution);
    return price ? money(price.amount_minor, price.currency) : fallback;
  };
  const buttonLabel = submitted && stage === "ready" ? "Your video is ready" : submitted && stage === "failed" ? "Check order status" : stage === "working" ? "Generating your video…" : stage === "redirecting" ? "Opening checkout…" : busy ? "Please wait…"
    : `Generate video · ${priceLabel(quality, quality === "480p" ? "$5.99" : "$8.99")}`;
  const finished = jobs.filter(job => job.status === "finished" && job.videoUrl);
  const shownProgress = stage === "ready" ? 100 : Math.min(98, Math.max(progress ?? 0, paid ? simulatedProgress : 0));
  const selectedJob = finished.find(job => job.videoUrl === videoUrl);
  const displayedCode = selectedJob?.code ?? activeCode.current;
  const filledCount = BAND_SLOTS.filter(slot => band[slot.id]).length;
  const previewCount = BAND_SLOTS.filter(slot => submittedFaces[slot.id]).length;
  const displayFilledCount = BAND_SLOTS.filter(slot => band[slot.id] || submittedFaces[slot.id]).length;
  const effectiveFilled = canceledCode ? previewCount : filledCount;
  const anyChecking = BAND_SLOTS.some(slot => band[slot.id]?.status === "checking");
  const rejectedLabels = BAND_SLOTS.filter(slot => band[slot.id]?.status === "rejected").map(slot => slot.label);

  // The visible circle is decorative; a transparent native file input sits on top of it.
  // Clicking therefore targets the input directly — no label activation or JS click needed.
  const bandSlot = (id: SlotId) => {
    const config = BAND_SLOTS.find(item => item.id === id)!;
    const photo = band[id];
    const previewUrl = photo?.url ?? submittedFaces[id];
    return <div key={id} className={`tiny-band-slot ${previewUrl ? `filled ${photo ? photo.status : "approved"}` : ""}`} style={{ left: config.x, top: config.y }}>
      <div className="tiny-band-slot-visual" aria-hidden="true">
        {previewUrl ? <img src={previewUrl} alt="" /> : submitted ? <ShieldCheck size={18} aria-hidden="true" /> : <Plus size={16} strokeWidth={2.4} />}
        <span className="tiny-band-slot-label">{config.label}</span>
      </div>
      <input type="file" className="tiny-band-slot-input" accept="image/jpeg,image/png,image/webp" aria-label={`${previewUrl ? "Change" : "Add"} ${config.label} photo`} title={`${previewUrl ? "Change" : "Add"} ${config.label} photo`} disabled={submitted} onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) void chooseSlotPhoto(id, file); }} />
      {!submitted && previewUrl && <button type="button" className="tiny-band-slot-x" aria-label={`Remove ${config.label} photo`} onClick={() => removeSlot(id)}><X size={11} /></button>}
    </div>;
  };

  return <div className="tiny-studio-grid" aria-label="Tiny Desk AI studio">
    <div className="tiny-studio-form">
      <div className="tiny-studio-heading"><h2>Make your Tiny Desk<br/>AI video</h2><span>AI CONCERT</span></div>
      <div className="tiny-field-heading"><span>1</span><strong>YOUR MAIN CHARACTER</strong><em>One photo is enough</em></div>
      <div className="tiny-lead-upload">
        <div className="tiny-band-tile"><img src={SLOT_IMAGES.lead} alt="Dog reference for the Lead singer close-up" />{bandSlot("lead")}</div>
        <div><span className="tiny-kicker">LEAD · YOUR CLOSE-UP</span><h3>Put yourself behind the mic.</h3><p>Tap the Lead circle to add your portrait. This is the singer role in the reference, not the keyboard player.</p><a href="/blog/multiple-photos-tiny-desk-concert-video">See who goes where →</a></div>
      </div>
      <details className="tiny-optional-band">
        <summary>Add up to four friends <span>Optional · same price</span></summary>
        <p>Fill any extra roles you want. The dogs identify the reference positions; upload adult portraits, not a group photo. Empty roles have no supplied identity.</p>
        <div className="tiny-band">
          <div className="tiny-band-main">
            <img src="/tiny-band/slots/band-left.webp" alt="Tiny Desk dog band reference: back left, back right, and front center" />
            {(["back-left", "back-right", "keys"] as SlotId[]).map(bandSlot)}
          </div>
          <div className="tiny-band-tile"><img src={SLOT_IMAGES.sax} alt="Dog reference for the Sax role" />{bandSlot("sax")}</div>
        </div>
      </details>
      <div className="tiny-photo-tip"><span>✧</span><p>{submitted ? <><strong>{previewCount || displayFilledCount} of 5 faces submitted with this order.</strong> These display-only previews stay in this browser tab. Do not upload or pay again.</> : canceledCode ? <><strong>Your photos are saved.</strong> Edit any spot or generate again — no need to re-upload.</> : <><strong>Start with Lead, or choose any role.</strong> Add friends only if you want to fill more of the band. One consenting adult per photo. Clear, well-lit JPG/PNG/WebP portraits up to 10 MB. Your 15-second video includes a soundtrack.</>}</p></div>
      <div className="tiny-field-heading"><span>2</span><strong>QUALITY</strong></div>
      <fieldset className="tiny-quality"><legend className="sr-only">Video quality</legend><label className={quality === "480p" ? "selected" : ""}><input type="radio" name="quality" value="480p" checked={quality === "480p"} onChange={() => setQuality("480p")} /><strong>480p</strong><small>{priceLabel("480p", "$5.99")} · Standard</small></label><label className={quality === "720p" ? "selected" : ""}><input type="radio" name="quality" value="720p" checked={quality === "720p"} onChange={() => setQuality("720p")} /><strong>720p</strong><small>{priceLabel("720p", "$8.99")} · HD</small></label></fieldset>
      <div className="tiny-field-heading"><span>3</span><strong>FORMAT</strong></div>
      <fieldset className="tiny-quality"><legend className="sr-only">Video aspect ratio</legend><label className={aspectRatio === "9:16" ? "selected" : ""}><input type="radio" name="aspect-ratio" value="9:16" checked={aspectRatio === "9:16"} disabled={submitted} onChange={() => setAspectRatio("9:16")} /><span className="tiny-format-line"><svg className="tiny-format-icon" width="20" height="26" viewBox="0 0 20 26" aria-hidden="true"><rect x="1.5" y="1.5" width="17" height="23" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg><strong>9:16</strong></span><small>Vertical · Reels / TikTok</small></label><label className={aspectRatio === "16:9" ? "selected" : ""}><input type="radio" name="aspect-ratio" value="16:9" checked={aspectRatio === "16:9"} disabled={submitted} onChange={() => setAspectRatio("16:9")} /><span className="tiny-format-line"><svg className="tiny-format-icon" width="28" height="22" viewBox="0 0 28 22" aria-hidden="true"><rect x="1.5" y="2.5" width="25" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg><strong>16:9</strong></span><small>Horizontal · YouTube</small></label></fieldset>
      <label className="tiny-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>These are my photos or I have the permission of everyone shown. Everyone is an adult.</span></label>
      <button type="button" className="tiny-generate" onClick={() => setShowConfirm(true)} disabled={busy || submitted || !billingReady || !enabled || !selectedPrice?.purchasable || effectiveFilled < 1 || !consent || anyChecking || stage === "working"}>{buttonLabel} <ArrowRight size={18} /></button>
      {!billingReady && <p className="tiny-studio-fine" role="status">Checking payment options…</p>}
      {billingError && <div className="tiny-billing-retry" role="alert"><p>{billingError}</p><button type="button" disabled={!billingReady} onClick={() => void refreshBilling()}>Retry checkout check</button></div>}
      {billingReady && !billingError && !enabled && <p className="tiny-studio-fine">Payments are currently paused. No payment has been taken. <button type="button" onClick={() => void refreshBilling()}>Check again</button></p>}
      {rejectedLabels.length > 0 && <p className="tiny-upload-error" role="alert">{rejectedLabels.join(", ")} did not pass the AI check. Replace or remove them, or let the server decide at checkout.</p>}
      {message && !submitted && <p className="tiny-upload-error" role="alert">{message}</p>}
      <p className="tiny-studio-fine"><ShieldCheck size={15} /> {submitted ? `${previewCount || displayFilledCount}/5 faces already submitted.` : `${displayFilledCount}/5 band spots filled — at least one is required.`} Photos are screened by AI before payment, stored privately and sent to the video provider only after payment is verified. Generation and downloads are available in this browser for 30 days.</p>
      {submitted && stage === "ready" && <div className="tiny-submitted-actions"><button type="button" onClick={() => { setSubmitted(false); setSubmittedFaces({}); setBand(current => { Object.values(current).forEach(photo => { if (photo) { URL.revokeObjectURL(photo.url); photoUrls.current.delete(photo.url); } }); return {}; }); setStage("idle"); setProgress(null); setVideoUrl(null); setPaid(false); sessionStorage.removeItem("tiny-desk-code"); activeCode.current = null; generationStarted.current = false; setMessage(""); }}>Make another video</button></div>}
    </div>
    <div className="tiny-studio-preview">
      <div className="tiny-preview-top">
        <div className="tiny-preview-tabs" role="tablist" aria-label="Preview source">
          <button type="button" role="tab" aria-selected={previewTab === "example"} onClick={() => setPreviewTab("example")}>Example</button>
          <button type="button" role="tab" aria-selected={previewTab === "videos"} onClick={() => setPreviewTab("videos")}>My videos</button>
        </div>
        <button type="button" className="tiny-fullsize" onClick={() => { const video = previewVideo.current; if (video?.requestFullscreen) void video.requestFullscreen().catch(() => {}); }}><Maximize2 size={13} /> Full size</button>
      </div>
      {submitted && (stage === "working" || stage === "failed") && <div className="tiny-generation-status" role="status" aria-live="polite">
        <div className="tiny-generation-heading"><strong>{stage === "failed" ? "Your order needs attention" : paid ? "Your video is in progress" : "Confirming your payment"}</strong><span>{stage === "working" && paid ? `~${shownProgress}%` : stage === "working" ? "Waiting" : ""}</span></div>
        {stage === "working" && <div className="tiny-generation-track" role="progressbar" aria-label="Estimated generation progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={paid ? shownProgress : undefined}><span style={{ width: `${paid ? shownProgress : 5}%` }} /></div>}
        <p>{message || "Your uploaded faces are saved with this order. Please do not pay again."}</p>
        <small>{paid ? "Progress is an estimate; completion is confirmed only when the video is available." : "Payment has not been confirmed yet."} Order {activeCode.current?.slice(0, 8)}… · Return in this browser at any time.</small>
      </div>}
      <div className="tiny-preview-content">
        {previewTab === "videos" ? (videoUrl
          ? <div className="tiny-sample-video" key={videoUrl}><video ref={previewVideo} controls autoPlay muted playsInline preload="metadata" src={videoUrl} aria-label="Your generated Tiny Desk AI video" /></div>
          : <div className="tiny-empty-videos"><h3>{finished.length ? "Choose a video" : "No videos yet"}</h3><p>{finished.length ? "Pick one of your generated videos below to play it here." : "Videos generated in this browser will appear below."}</p></div>)
          : <div className="tiny-sample-video"><video ref={previewVideo} controls autoPlay muted loop playsInline preload="auto" poster="/tiny-band/sample-poster.webp" src={sampleReady ? "/api/tiny-desk/sample" : undefined} aria-label="Example: five dogs performing at a desk-side concert">Your browser does not support video playback.</video></div>}
        <p className="tiny-preview-caption">{previewTab === "videos" && videoUrl && displayedCode ? <>Your video is ready. <a href={`/api/video/file?code=${displayedCode}&download=1`} download>Download MP4</a> within 30 days.</> : previewTab === "videos" ? (finished.length ? "Choose one of your generated videos below." : "No videos yet. Your results will appear here.") : finished.length ? "Your video is ready — open My videos to watch it." : testMode ? "Stripe test mode is active: use a test card. No real money is charged." : "This is an example. Pick your band to make your own."}</p>
        <div className="tiny-history"><h3>Generated videos</h3>{finished.length ? <div className="tiny-history-grid">{finished.map(job => <div className={`tiny-history-card ${videoUrl === job.videoUrl ? "active" : ""}`} key={job.code}><button type="button" onClick={() => { activeCode.current = job.code; setVideoUrl(job.videoUrl); setStage("ready"); setPreviewTab("videos"); }} aria-label={`Play generated video ${job.code.slice(0,8)}`}><video muted playsInline preload="metadata" src={job.videoUrl ?? undefined} aria-hidden="true" /><span>▶ Play · {job.resolution} · {job.aspectRatio}</span></button><a href={`/api/video/file?code=${job.code}&download=1`} onClick={() => emitStudioEvent("video_download_clicked")} download aria-label={`Download video ${job.code.slice(0,8)}`}><Download size={15} /> Download</a></div>)}</div> : <p>Generated videos from this browser will appear here when ready. Download each one within 30 days.</p>}</div>
      </div>
    </div>
    {showConfirm && <div className="tiny-modal-backdrop" onClick={() => setShowConfirm(false)}><div className="tiny-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="tiny-confirm-title" onClick={event => event.stopPropagation()}><button type="button" className="tiny-modal-close" onClick={() => setShowConfirm(false)} aria-label="Close">×</button><h3 id="tiny-confirm-title">Ready to make your video?</h3><p>{Math.max(effectiveFilled, 0)} uploaded adult portrait{effectiveFilled === 1 ? "" : "s"} · 15 seconds · {quality} · {aspectRatio}. One-time payment: {selectedPrice ? money(selectedPrice.amount_minor, selectedPrice.currency) : "Unavailable"}. A video code is created when you continue; keep this browser and its cookies to see your result after payment.</p>{emailEnabled && <><label htmlFor="tiny-delivery-email">Email your download link (optional)</label><input id="tiny-delivery-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} /><small>If you add an email, we will attempt to send your download link when the video is ready. You can also return in this browser.</small></>}<small>Your video is stored privately for up to 30 days from completion. Return in the same browser, keep its cookies, and download your MP4. {emailEnabled ? "Email is optional." : "Automatic email delivery is not currently available; save your order reference after checkout."}</small><div className="tiny-modal-actions"><button type="button" onClick={() => setShowConfirm(false)}>Cancel</button><button type="button" onClick={() => void startCheckout()}>Continue to {testMode ? "test" : "secure"} checkout</button></div></div></div>}
  </div>;
}
