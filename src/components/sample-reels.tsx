"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const REELS = [
  { src: "/fancy-cafe-ai/generated-with-caption.mp4", poster: "/fancy-cafe-ai/generated-with-caption-poster.webp", label: "AI GENERATED RESULT · 20S", alt: "Actual 20-second generated cafe example with two uploaded portraits and a POV caption" },
  { src: "/fancy-cafe-ai/demo-2.mp4", poster: "/fancy-cafe-ai/demo-2-poster.webp", label: "CAFE EXAMPLE · TWO", alt: "Cafe example: another protagonist realizes the mistake after the woman sits down" },
  { src: "/fancy-cafe-ai/demo-3.mp4", poster: "/fancy-cafe-ai/demo-3-poster.webp", label: "CAFE EXAMPLE · THREE", alt: "Cafe example: a third variation of the wrong-seat reveal" },
] as const;

export function SampleReels() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [unmuted, setUnmuted] = useState<number | null>(null);
  const [active, setActive] = useState<boolean[]>(() => REELS.map(() => false));

  useEffect(() => {
    // Reels stay as posters in the initial HTML. Start observing after the payment check begins.
    let observer: IntersectionObserver | undefined;
    const timer = setTimeout(() => {
      if (typeof IntersectionObserver === "undefined") {
        setActive(REELS.map(() => true));
        return;
      }
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = videos.current.indexOf(entry.target as HTMLVideoElement);
          if (index !== -1) setActive(current => current.map((value, position) => value || position === index));
          observer?.unobserve(entry.target);
        }
      }, { rootMargin: "200px 0px" });
      videos.current.forEach(video => { if (video) observer?.observe(video); });
    }, 1500);
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, []);

  // Only one reel plays sound at a time; the others stay muted and looping.
  function toggle(index: number) {
    const next = unmuted === index ? null : index;
    setActive(current => current.map((value, position) => value || position === index));
    setUnmuted(next);
    videos.current.forEach((video, position) => {
      if (video) video.muted = position !== next;
    });
    const video = videos.current[index];
    if (video && next !== null) void video.play().catch(() => undefined);
  }

  return <section className="tiny-reels" aria-label="One generated result and two Fancy Cafe reference videos">
    <p className="tiny-art-note">One generated example (first) and two reference examples of the cafe meme. Results vary. Videos play muted by default; tap the sound icon to listen.</p><div className="tiny-reels-grid">
      {REELS.map((reel, index) => <div className="tiny-reel" key={reel.src}>
        <video
          ref={element => { videos.current[index] = element; }}
          src={active[index] ? reel.src : undefined}
          poster={reel.poster}
          autoPlay muted loop playsInline preload="metadata"
          onClick={() => toggle(index)}
          onCanPlay={event => { if (unmuted === index) void event.currentTarget.play().catch(() => undefined); }}
          aria-label={reel.alt}
        />
        <span className="tiny-reel-label">{reel.label}</span>
        <button type="button" className="tiny-reel-sound" onClick={() => toggle(index)} aria-pressed={unmuted === index} aria-label={unmuted === index ? "Mute this reel" : "Play this reel with sound"}>
          {unmuted === index ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
      </div>)}
    </div>
  </section>;
}
