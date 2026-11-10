"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { guideCtaEvent } from "@/lib/guide-analytics";
import { studioEvent } from "@/lib/studio-analytics";
import { gaMeasurementId } from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_KEY = "tiny-desk-analytics-consent";
type Consent = "granted" | "denied";

export function GoogleAnalytics() {
  // The tag itself is rendered in the root layout head; this component only manages consent.
  const valid = Boolean(gaMeasurementId());
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();

  // The choice lives in localStorage, so it never leaves this browser.
  useEffect(() => {
    if (!valid) { setReady(true); return; }
    let stored: string | null = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch { /* storage may be blocked */ }
    if (stored === "granted" || stored === "denied") setConsent(stored);
    else setShowBanner(true);
    setReady(true);
  }, [valid]);

  // Footer "Cookie settings" reopens the choice without clearing other storage.
  useEffect(() => {
    const reopen = () => { if (valid) setShowBanner(true); };
    window.addEventListener("tiny-desk-cookie-settings", reopen);
    return () => window.removeEventListener("tiny-desk-cookie-settings", reopen);
  }, [valid]);

  // Google Consent Mode: storage stays denied until the visitor accepts.
  useEffect(() => {
    if (!valid || !ready) return;
    window.gtag?.("consent", "update", { analytics_storage: consent === "granted" ? "granted" : "denied" });
  }, [valid, ready, consent]);

  // Send a page_view after consent is granted (including the first page) and on client-side route changes.
  useEffect(() => {
    if (!valid || consent !== "granted") return;
    window.gtag?.("event", "page_view", { page_path: pathname, page_location: window.location.origin + pathname, page_title: document.title });
  }, [valid, consent, pathname]);

  // Guide conversion intent only: never send email, order codes, query strings or video URLs.
  useEffect(() => {
    if (!valid || consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      const params = anchor ? guideCtaEvent(pathname, anchor.getAttribute("href") ?? "") : null;
      if (params) window.gtag?.("event", "guide_studio_click", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [valid, consent, pathname]);

  useEffect(() => {
    if (!valid || consent !== "granted") return;
    const onStudioEvent = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (!detail || typeof detail.name !== "string") return;
      const safe = studioEvent(detail.name, detail.params ?? {});
      if (safe) window.gtag?.("event", safe.name, safe.params);
    };
    window.addEventListener("tiny-studio-event", onStudioEvent);
    return () => window.removeEventListener("tiny-studio-event", onStudioEvent);
  }, [valid, consent]);

  function decide(choice: Consent) {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch { /* keep the in-memory choice */ }
    setConsent(choice);
    setShowBanner(false);
  }

  if (!valid) return null;

  return <>
    {ready && showBanner && <div className="tiny-cookie" role="dialog" aria-label="Cookie choices" aria-live="polite">
      <p><strong>Cookies keep your I Love The Smiths AI videos in this browser.</strong> An essential cookie links your orders and finished videos to this browser; clearing cookies or switching devices removes that history. Optional Google Analytics cookies help us understand aggregate traffic; analytics storage stays disabled until you accept. Declining analytics does not affect your videos.</p>
      <div className="tiny-cookie-actions">
        <button type="button" className="tiny-cookie-accept" onClick={() => decide("granted")}>Accept analytics</button>
        <button type="button" className="tiny-cookie-decline" onClick={() => decide("denied")}>Decline</button>
        <a href="/privacy">Privacy policy</a>
      </div>
    </div>}
  </>;
}
