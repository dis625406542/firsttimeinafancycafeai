"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Maximize2, Plus, ShieldCheck, X } from "lucide-react";
import { loadSubmittedFaces, saveSubmittedFaces } from "@/lib/tiny-studio-previews";
import { retryChoice } from "@/lib/checkout-retry-policy";
import { fetchCheckoutCatalog } from "@/lib/billing-catalog-client";

import { emitStudioEvent } from "@/lib/studio-analytics";

export const TINY_TEMPLATE = "fancy-cafe-ai";
type LocalPhoto = { file: File; url: string };
type SlotId = "protagonist" | "regular";
type SlotPhoto = LocalPhoto & { status: "checking" | "approved" | "rejected"; error?: string };
const BAND_SLOTS: { id: SlotId; label: string; x: string; y: string }[] = [
  { id: "protagonist", label: "Protagonist", x: "50%", y: "42%" },
  { id: "regular", label: "Cafe regular", x: "50%", y: "42%" },
];
const SLOT_IMAGES: Record<SlotId, string> = {
  protagonist: "/fancy-cafe-ai/protagonist.webp",
  regular: "/fancy-cafe-ai/regular.webp",
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
// file at 750 KB so two photos still fit under the serverless request-body limit.
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
  const [sampleReady, setSampleReady] = useState(false);
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
  const [canceledFormat, setCanceledFormat] = useState<{resolution:string;aspectRatio:string}|null>(null);
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

  async function refreshBilling(code: string): Promise<Order> {
    try {
      const response = await fetch(`/api/billing?template=${TINY_TEMPLATE}&code=${encodeURIComponent(code)}`, { cache: "no-store", signal: AbortSignal.timeout(15000) });
      const data = await response.json() as { error?: string; order?: Order };
      if (!response.ok || !data.order) throw new Error(data.error || "Payment information is temporarily unavailable.");
      return data.order;
    } catch (error) {
      emitStudioEvent("checkout_check_failed");
      // Never expose a browser transport error (e.g. "Failed to fetch") as payment status.
      if (error instanceof TypeError || error instanceof SyntaxError || error instanceof DOMException) {
        throw new Error("Could not check this order right now. Keep this browser open and retry; do not pay again.");
      }
      throw error;
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
    } catch {
      setMessage("Could not check your video's progress. Your paid order is saved; checking again shortly. Do not pay again.");
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
      setMessage(error instanceof TypeError || error instanceof SyntaxError
        ? "Could not confirm video submission. Your paid order is saved; check its status here before retrying. Do not pay again."
        : error instanceof Error ? error.message : "Your paid order is saved. Do not pay again.");
    }
  }

  async function resume(code: string, mode?: "success" | "cancel") {
    activeCode.current = code;
    const order = await refreshBilling(code);
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
        setCanceledFormat({resolution:order.resolution ?? "480p",aspectRatio:order.aspectRatio ?? "9:16"});
        setSubmitted(false);
        setSubmittedFaces(loadSubmittedFaces(sessionStorage, code));
        setStage("idle");
        setMessage(mode === "cancel" ? "Payment was cancelled. Your photos are saved — edit them or generate again." : "");
        sessionStorage.setItem("fancy-cafe-code", code);
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
        // Check the catalog only when the visitor chooses to order; recover paid orders separately.
        if (!alive) return;
        const params = new URLSearchParams(window.location.search);
        const returned = params.get("code");
        if (returned && /^[A-F0-9]{32}$/.test(returned)) {
          sessionStorage.setItem("fancy-cafe-code", returned);
          history.replaceState(null, "", "/#studio");
          await resume(returned, params.get("checkout") === "cancel" ? "cancel" : "success");
        } else {
          const saved = sessionStorage.getItem("fancy-cafe-code");
          if (saved) await resume(saved);
        }
        await refreshJobs();
        // Previous completed orders live on the server under this browser's signed cookie.
        // No sessionStorage or saved upload is required to recover their playable history.
      } catch { if (alive) setMessage("Could not check your saved orders right now. Refresh this page to retry. If you already paid, do not pay again."); }
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
    if (canceledCode) { setCanceledCode(null); setCanceledFormat(null); setSubmittedFaces({}); } // Editing starts a fresh order.
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

  async function checkCurrentOrder() {
    const code = activeCode.current;
    if (!code || busy) return;
    setBusy(true);
    setMessage("Checking your existing order…");
    try {
      await resume(code);
    } catch {
      setMessage("Could not check your saved order right now. Please retry here; do not pay again.");
    } finally { setBusy(false); }
  }

  async function prepareCheckout() {
    if (busy) return;
    setMessage("");
    setBusy(true);
    try {
      // A fresh server catalog is authoritative; a stale first-load response never starts an order.
      const data = await fetchCheckoutCatalog<{ error?: string; prices?: Price[]; enabled?: boolean; testMode?: boolean }>(`/api/billing?template=${TINY_TEMPLATE}`);
      const price = data.prices?.find(item => item.resolution === quality);
      setPrices(data.prices ?? []);
      setEnabled(data.enabled === true);
      setTestMode(data.testMode === true);
      if (!data.enabled || !price?.purchasable) {
        setMessage("We couldn't start this video order right now. No payment was taken. Tap Generate video to check again shortly.");
        return;
      }
      setShowConfirm(true);
    } catch {
      setMessage("We couldn't check the live price right now. No payment was taken. Check your connection, then tap Generate video to retry.");
    } finally { setBusy(false); }
  }

  async function startCheckout() {
    if (!band.protagonist && !submittedFaces.protagonist) { setMessage("Add the protagonist photo first."); return; }
    if (busy) return;
    const filled = BAND_SLOTS.map(slot => ({ slot: slot.id, label: slot.label, photo: band[slot.id] })).filter(entry => entry.photo);
    const checking = filled.some(entry => entry.photo!.status === "checking");
    if (!enabled || !selectedPrice?.purchasable) { setMessage("We could not start a video order right now. No payment was taken. Please try again later."); return; }
    const choice = canceledCode && filled.length === 0 ? retryChoice(canceledFormat, quality, aspectRatio) : "fresh";
    const reuse = choice === "reuse";
    const copySaved = choice === "copy";
    if (!reuse && !copySaved && filled.length < 1) { setMessage("Upload the protagonist photo first."); return; }
    if (checking) { setMessage("Wait until the selected photos finish the AI safety check."); return; }
    if (!consent) { setMessage("Confirm you have permission to use these photos first."); return; }
    if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) { setMessage("Enter a valid email address, or leave it empty."); return; }
    setShowConfirm(false);
    const code = reuse ? canceledCode! : newVideoCode();
    if (!reuse) { setSubmitted(false); if (!copySaved) setSubmittedFaces({}); setProgress(null); }
    setBusy(true); setStage("redirecting");
    emitStudioEvent("checkout_started", { resolution: quality, aspect_ratio: aspectRatio, photo_count: reuse || copySaved ? previewCount : filled.length });
    setMessage(testMode ? "Opening Stripe test checkout. Use a test card; no real money is charged." : "Opening secure checkout…");
    try {
      const form = new FormData();
      form.append("code", code); form.append("template", TINY_TEMPLATE);
      form.append("resolution", quality);
      form.append("aspectRatio", aspectRatio); form.append("consent", "yes");
      if (copySaved) form.append("sourceCode", canceledCode!);
      if (!reuse && !copySaved) for (const entry of filled) { form.append("photos", entry.photo!.file); form.append("slots", entry.slot); }
      if (email) form.append("email", email.trim());
      const response = await fetch("/api/billing/checkout", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status >= 500
        ? "We could not start a video order right now. No payment was taken. Please try again later."
        : data.error || "Could not open secure checkout.");
      if (data.mockPayment === true) { sessionStorage.setItem("fancy-cafe-code", data.code); await resume(data.code); return; }
      if (!data.checkoutUrl) throw new Error("Checkout did not return a payment link.");
      // Stripe is a full-page redirect. Keep only tiny display previews for this order's return; the server already holds the original uploads.
      try {
        if (copySaved) saveSubmittedFaces(sessionStorage, code, loadSubmittedFaces(sessionStorage, canceledCode!));
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
      sessionStorage.setItem("fancy-cafe-code", code);
      emitStudioEvent("checkout_redirect", { resolution: quality, aspect_ratio: aspectRatio });
      window.location.assign(data.checkoutUrl);
    } catch (error) {
      setStage("idle");
      emitStudioEvent("checkout_error", { resolution: quality, aspect_ratio: aspectRatio });
      setMessage(error instanceof TypeError || (error instanceof DOMException && error.name === "AbortError")
        ? "Could not confirm checkout due to a connection error. Check your orders in this browser before trying again; no payment was taken here."
        : error instanceof Error ? error.message : "Unable to open checkout. No payment was taken.");
    } finally { setBusy(false); }
  }

  const priceLabel = (resolution: "480p" | "720p", fallback: string) => {
    const price = prices.find(item => item.resolution === resolution);
    return price ? money(price.amount_minor, price.currency) : fallback;
  };
  const buttonLabel = submitted && stage === "failed" ? "Check order status" : stage === "working" ? "Generating your video…" : stage === "redirecting" ? "Opening checkout…" : busy ? "Please wait…"
    : `Generate video · ${priceLabel(quality, quality === "480p" ? "$6.99" : "$9.99")}`;
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

  // The visible circle is decorative; the native file input covers the whole portrait.
  // Clicking therefore targets the input directly — no label activation or JS click needed.
  const bandSlot = (id: SlotId) => {
    const config = BAND_SLOTS.find(item => item.id === id)!;
    const photo = band[id];
    const previewUrl = photo?.url ?? submittedFaces[id];
    return <><div key={id} className={`tiny-band-slot ${previewUrl ? `filled ${photo ? photo.status : "approved"}` : ""}`} aria-hidden="true">
      <span className="tiny-band-slot-label">{config.label}</span>
    </div>
    {!submitted && previewUrl && <button type="button" className="tiny-band-slot-x" aria-label={`Remove ${config.label} photo`} onClick={() => removeSlot(id)}><X size={11} /></button>}
    <input type="file" className="tiny-band-slot-input" accept="image/jpeg,image/png,image/webp" aria-label={`${previewUrl ? "Change" : "Add"} ${config.label} photo`} title={`${previewUrl ? "Change" : "Add"} ${config.label} photo`} disabled={submitted} onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) void chooseSlotPhoto(id, file); }} />
    </>;
  };

  return <div className="tiny-studio-grid" aria-label="Fancy Cafe AI studio">
    <div className="tiny-studio-form">
      <div className="tiny-studio-heading"><h2>Make your Fancy Cafe<br/>AI video</h2><span>CAFE COMEDY</span></div>
      <p className="tiny-photo-tip">Choose a clear adult portrait for the protagonist. Add a second person if you like. The sample portraits show the two roles; tap either portrait to choose your own.</p>
      <div className="tiny-field-heading"><span>1</span><strong>YOUR MAIN CHARACTER</strong><em>Required</em></div>
      <div className="tiny-lead-upload">
        <div className="tiny-band-tile"><img src={band.protagonist?.url ?? submittedFaces.protagonist ?? SLOT_IMAGES.protagonist} alt="Sample portrait of the cafe protagonist; tap to upload your photo" />{bandSlot("protagonist")}</div>
        <div><span className="tiny-kicker">PROTAGONIST · THE WRONG SEAT</span><h3>Make the awkward moment yours.</h3><p>This person mistakes the small round table for a seat. Add one clear portrait of yourself or a consenting adult.</p><a href="/blog/fancy-cafe-ai-two-people">See how the two roles work →</a></div>
      </div>
      <details className="tiny-optional-band" open>
        <summary>Optional female customer <span>Not required · upload to replace the woman in the meme</span></summary>
        <p>The woman in the meme sits on the bench and reveals the mistake. You do not need to upload a second photo: the reference woman or a similar-style AI-generated woman can appear instead. AI may vary her appearance.</p>
        <div className="tiny-lead-upload"><div className="tiny-band-tile"><img src={band.regular?.url ?? submittedFaces.regular ?? SLOT_IMAGES.regular} alt="Sample portrait of the woman in the cafe; tap to replace her" />{bandSlot("regular")}</div><div><span className="tiny-kicker">THE WOMAN · THE REVEAL</span><p>Optional: tap the portrait to replace her with a consenting adult. Without an upload, let the reference guide the woman in this role; an exact face is not guaranteed.</p></div></div>
      </details>
      <div className="tiny-photo-tip"><span>✧</span><p>{submitted ? <><strong>{previewCount || displayFilledCount} of 2 portraits submitted.</strong> Keep this browser and do not pay again.</> : canceledCode ? <><strong>Your portraits are saved.</strong> Keep the same options to retry checkout, or change quality/format to start a new order at the selected price without re-uploading.</> : <><strong>Start with the protagonist.</strong> One adult per photo. Clear JPG/PNG/WebP up to 10 MB. The second photo is optional and replaces the woman in the meme.</>}</p></div>
      <div className="tiny-field-heading"><span>2</span><strong>QUALITY</strong></div>
      <fieldset className="tiny-quality"><legend className="sr-only">Video quality</legend><label className={quality === "480p" ? "selected" : ""}><input type="radio" name="quality" value="480p" checked={quality === "480p"} onChange={() => setQuality("480p")} /><strong>480p</strong><small>{priceLabel("480p", "$6.99")} · Standard</small></label><label className={quality === "720p" ? "selected" : ""}><input type="radio" name="quality" value="720p" checked={quality === "720p"} onChange={() => setQuality("720p")} /><strong>720p</strong><small>{priceLabel("720p", "$9.99")} · HD</small></label></fieldset>
      <div className="tiny-field-heading"><span>3</span><strong>FORMAT</strong></div>
      <fieldset className="tiny-quality"><legend className="sr-only">Video aspect ratio</legend><label className={aspectRatio === "9:16" ? "selected" : ""}><input type="radio" name="aspect-ratio" value="9:16" checked={aspectRatio === "9:16"} disabled={submitted} onChange={() => setAspectRatio("9:16")} /><span className="tiny-format-line"><svg className="tiny-format-icon" width="20" height="26" viewBox="0 0 20 26" aria-hidden="true"><rect x="1.5" y="1.5" width="17" height="23" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg><strong>9:16</strong></span><small>Vertical · Reels / TikTok</small></label><label className={aspectRatio === "16:9" ? "selected" : ""}><input type="radio" name="aspect-ratio" value="16:9" checked={aspectRatio === "16:9"} disabled={submitted} onChange={() => setAspectRatio("16:9")} /><span className="tiny-format-line"><svg className="tiny-format-icon" width="28" height="22" viewBox="0 0 28 22" aria-hidden="true"><rect x="1.5" y="2.5" width="25" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg><strong>16:9</strong></span><small>Horizontal · YouTube</small></label></fieldset>
      <label className="tiny-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>These are my photos or I have the permission of everyone shown. Everyone is an adult.</span></label>
      {submitted && stage === "ready"
        ? <button type="button" className="tiny-generate tiny-repeat-generate" onClick={() => { setSubmitted(false); setSubmittedFaces({}); setBand(current => { Object.values(current).forEach(photo => { if (photo) { URL.revokeObjectURL(photo.url); photoUrls.current.delete(photo.url); } }); return {}; }); setStage("idle"); setProgress(null); setVideoUrl(null); setPaid(false); sessionStorage.removeItem("fancy-cafe-code"); activeCode.current = null; generationStarted.current = false; setMessage(""); }}>Make another video <ArrowRight size={20} /></button>
        : <button type="button" className="tiny-generate" onClick={() => void (submitted && stage === "failed" ? checkCurrentOrder() : prepareCheckout())} disabled={busy || (submitted && stage !== "failed") || (!submitted && (effectiveFilled < 1 || !consent || anyChecking)) || stage === "working"}>{buttonLabel} <ArrowRight size={18} /></button>}
      {submitted && stage === "ready" && <p className="tiny-repeat-note">Your video is ready. Start a new order with new photos; your completed videos remain below.</p>}
      {rejectedLabels.length > 0 && <p className="tiny-upload-error" role="alert">{rejectedLabels.join(", ")} did not pass the AI check. Replace or remove them, or let the server decide at checkout.</p>}
      {message && !submitted && <p className="tiny-upload-error" role="alert">{message}</p>}
      <p className="tiny-studio-fine"><ShieldCheck size={15} /> {submitted ? `${previewCount || displayFilledCount}/2 faces already submitted.` : `${displayFilledCount}/2 roles filled — protagonist required.`} Personal and non-commercial use only. Photos are screened by AI and sent to the video provider only after payment. <a href="/terms">Terms</a> · <a href="/refund-policy">Refund &amp; delivery</a> · <a href="/privacy">Privacy</a></p>
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
          ? <div className="tiny-sample-video" key={videoUrl}><video ref={previewVideo} controls autoPlay muted playsInline preload="metadata" src={videoUrl} aria-label="Your generated Fancy Cafe AI video" /></div>
          : <div className="tiny-empty-videos"><h3>{finished.length ? "Choose a video" : "No videos yet"}</h3><p>{finished.length ? "Pick one of your generated videos below to play it here." : "Videos generated in this browser will appear below."}</p></div>)
          : <div className="tiny-sample-video"><video ref={previewVideo} controls autoPlay muted loop playsInline preload="auto" poster="/fancy-cafe-ai/example-poster.webp" src={sampleReady ? "/fancy-cafe-ai/example.mp4" : undefined} aria-label="Fancy Cafe reference clip, not an AI-generated result">Your browser does not support video playback.</video></div>}
        <p className="tiny-preview-caption">{previewTab === "videos" && videoUrl && displayedCode ? <>Your video is ready. <a href={`/api/video/file?code=${displayedCode}&download=1`} download>Download MP4</a> within 30 days.</> : previewTab === "videos" ? (finished.length ? "Choose one of your generated videos below." : "No videos yet. Your results will appear here.") : finished.length ? "Your video is ready — open your generated videos below to watch it." : "Fancy Cafe example footage. Your generated video will use the portraits you upload and may differ from this example."}</p>
        <details className="tiny-preview-notes">
          <summary>What's included, delivery, support, refunds &amp; privacy</summary>
          <p>Your completed 20-second MP4 includes the original music from the Fancy Cafe reference video, with no separate audio editing needed. Made for personal entertainment and non-commercial social sharing. No commercial-use license is included; follow platform rules and applicable music and portrait rights. <a href="/terms">Personal-use terms</a>.</p>
          <p>Your video is stored privately for up to 30 days from completion. Keep this browser's cookies and download your MP4 promptly. Paid but your video wasn't delivered? Email hello@firsttimeinafancycafeai.org with your video code. We review technical or delivery problems and may offer redelivery or a discretionary refund. AI generation is random, so your result may differ from the sample. After successful generation and delivery, subjective dissatisfaction alone does not guarantee a refund. <a href="/refund-policy">Refund &amp; delivery policy</a>.</p>
          <p>Uploaded portraits become eligible for cleanup after generation finishes or input expiry, normally 3 days after order creation. Deletion depends on the cleanup worker; third-party retention is separate. <a href="/privacy">Privacy policy</a>.</p>
        </details>
        <div className="tiny-history"><h3>Generated videos</h3>{finished.length ? <div className="tiny-history-grid">{finished.map(job => <div className={`tiny-history-card ${videoUrl === job.videoUrl ? "active" : ""}`} key={job.code}><button type="button" onClick={() => { activeCode.current = job.code; setVideoUrl(job.videoUrl); setStage("ready"); setPreviewTab("videos"); }} aria-label={`Play generated video ${job.code.slice(0,8)}`}><video muted playsInline preload="metadata" src={job.videoUrl ?? undefined} aria-hidden="true" /><span>▶ Play · {job.resolution} · {job.aspectRatio}</span></button><a href={`/api/video/file?code=${job.code}&download=1`} onClick={() => emitStudioEvent("video_download_clicked")} download aria-label={`Download video ${job.code.slice(0,8)}`}><Download size={15} /> Download</a></div>)}</div> : <p>Generated videos from this browser will appear here when ready. Download each one within 30 days.</p>}</div>
      </div>
    </div>
    {showConfirm && <div className="tiny-modal-backdrop" onClick={() => setShowConfirm(false)}>
      <div className="tiny-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="tiny-confirm-title" onClick={event => event.stopPropagation()}>
        <button type="button" className="tiny-modal-close" onClick={() => setShowConfirm(false)} aria-label="Close">×</button>
        <div className="tiny-confirm-body">
          <h3 id="tiny-confirm-title">Ready to make your video?</h3>
          <ul className="tiny-confirm-summary">
            <li><span>Photos</span><strong>{Math.max(effectiveFilled, 0)} adult portrait{effectiveFilled === 1 ? "" : "s"}</strong></li>
            <li><span>Video</span><strong>20 seconds · {quality} · {aspectRatio}</strong></li>
            <li><span>Price</span><strong>{selectedPrice ? money(selectedPrice.amount_minor, selectedPrice.currency) : priceLabel(quality, quality === "480p" ? "$6.99" : "$9.99")} · one-time</strong></li>
          </ul>
          <p className="tiny-confirm-note">A video code is created when you continue. Keep this browser and its cookies to see your result after payment.</p>
          <label htmlFor="tiny-delivery-email">Email your video (optional)</label>
          <input id="tiny-delivery-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} />
          <small>If you add an email, we will send your finished video there after it is generated; delivery may take a little longer. Your video is also linked to this browser by cookies for 30 days, so you can return and download it — it will not be lost. Please download promptly.</small>
        </div>
        <div className="tiny-modal-actions">
          <button type="button" className="tiny-modal-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
          <button type="button" className="tiny-modal-primary" onClick={() => void startCheckout()}>Generate Fancy Cafe AI Video <span className="tiny-modal-arrow"><ArrowRight size={15} /></span></button>
        </div>
      </div>
    </div>}
  </div>;
}
