"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

const VIDEO = "/fancy-cafe-ai/generated-with-caption.mp4";
const POSTER = "/fancy-cafe-ai/generated-with-caption-poster.webp";

/** A real example output: video bytes load only when the comparison nears the viewport. */
export function CafeResultComparison() {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "240px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function toggleSound() {
    const next = !soundOn;
    if (video.current) {
      video.current.muted = !next;
      void video.current.play().catch(() => {
        if (video.current) video.current.muted = true;
        setSoundOn(false);
      });
    }
    setSoundOn(next);
  }

  return <div className="tiny-cafe-comparison" aria-labelledby="tiny-cafe-comparison-title">
    <div className="tiny-cafe-comparison-heading">
      <span className="tiny-kicker">SEE THE TRANSFORMATION</span>
      <h3 id="tiny-cafe-comparison-title">From portraits to <em>your cafe moment.</em></h3>
      <p>Here is a generated example made with the portraits shown at left. Your result may differ in faces, movement and scene details.</p>
    </div>
    <div className="tiny-cafe-comparison-grid">
      <figure className="tiny-cafe-comparison-card">
        <figcaption><span className="tiny-cafe-comparison-step">01</span><div><strong>Before: choose the faces</strong><small>One protagonist and one optional cafe regular.</small></div></figcaption>
        <div className="tiny-cafe-comparison-media tiny-cafe-comparison-upload">
          <img src="/fancy-cafe-ai/before-upload.webp" width="561" height="796" loading="lazy" decoding="async" alt="Screenshot of the uploaded protagonist and cafe regular portraits before generation" />
        </div>
      </figure>
      <span className="tiny-cafe-comparison-arrow" aria-hidden="true"><ArrowRight size={20} /></span>
      <figure className="tiny-cafe-comparison-card">
        <figcaption><span className="tiny-cafe-comparison-step">02</span><div><strong>After: watch the video</strong><small>A 20-second AI-generated example with a POV caption.</small></div></figcaption>
        <div className="tiny-cafe-comparison-media tiny-cafe-comparison-video">
          <video ref={video} src={visible ? VIDEO : undefined} poster={POSTER} autoPlay muted loop playsInline preload="none" width="480" height="854" aria-label="Generated Fancy Cafe AI video from the pictured portraits, initially muted" />
          <button type="button" className="tiny-cafe-comparison-sound" onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? "Mute generated example" : "Play generated example with sound"}>
            <span className="tiny-cafe-comparison-sound-pill">{soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}{soundOn ? "Sound on · tap to mute" : "Tap to hear the video"}</span>
          </button>
        </div>
      </figure>
    </div>
  </div>;
}
