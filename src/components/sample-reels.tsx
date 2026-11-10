"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const REELS = [
  {
    src: "/love-the-smiths/demo-1.mp4?gallery=1",
    poster: "/love-the-smiths/demo-1-poster.webp",
    label: "DEMO VIDEO · 01",
    alt: "I Love The Smiths AI demo video: a blonde couple in an elevator meet-cute",
  },
  {
    src: "/love-the-smiths/demo-2.mp4?gallery=1",
    poster: "/love-the-smiths/demo-2-poster.webp",
    label: "DEMO VIDEO · 02",
    alt: "I Love The Smiths AI demo video: a curly-haired man and red-haired woman in an elevator meet-cute",
  },
] as const;

export function SampleReels() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [unmuted, setUnmuted] = useState<number | null>(null);
  const [active, setActive] = useState<boolean[]>(() => REELS.map(() => false));

  useEffect(() => {
    // Posters stay in the initial HTML; load the demo files only as the gallery approaches.
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
      }, { rootMargin: "240px 0px" });
      videos.current.forEach(video => { if (video) observer?.observe(video); });
    }, 900);
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, []);

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

  return <section className="tiny-reels" aria-label="Two I Love The Smiths AI demo videos">
    <p className="tiny-art-note">Two demo videos showing the intended I Love The Smiths effect. They play muted by default; tap the sound icon to listen. Individual AI results vary.</p>
    <div className="tiny-reels-grid tiny-reels-two">
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
        <button type="button" className="tiny-reel-sound" onClick={() => toggle(index)} aria-pressed={unmuted === index} aria-label={unmuted === index ? "Mute this demo" : "Play this demo with sound"}>
          {unmuted === index ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
      </div>)}
    </div>
  </section>;
}
