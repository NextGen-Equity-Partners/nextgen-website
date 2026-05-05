"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero-scrub video as the page background. Locked to Lenis scroll
 * position via `currentTime` updates inside requestAnimationFrame.
 *
 * Why autoPlay + loop instead of pause()?
 *
 * iOS Safari and many Android browsers will not decode any video
 * frames until play() has been called and is *currently active*. After
 * pause() the decoder state drops and subsequent currentTime writes
 * may not paint a new frame — the user sees the bg-deep fallback (a
 * flat blue rectangle) instead of the sunrise scrub.
 *
 * The cure is to keep the video "playing" (muted + playsInline +
 * autoPlay + loop, so iOS allows it without a user gesture) and use
 * an rAF loop to overwrite currentTime to the scroll-relative target
 * every frame. The video tries to advance ~16ms forward each frame
 * but our rAF correction snaps it back to the scroll-driven position
 * — net effect: the user sees a frame-perfect scroll-scrub, while the
 * decoder stays warm so frames keep rendering on every device.
 */
export function HeroShader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const lenisScrollRef = useRef(0);

  useLenis(({ scroll }) => {
    lenisScrollRef.current = scroll;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // Some mobile browsers reject the very first autoplay attempt if
    // the page is still painting. A single retry covers that case.
    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Wait for any user interaction, then try again. The first
          // tap/scroll counts as a user gesture and unblocks playback.
          const onInteract = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", onInteract);
            window.removeEventListener("scroll", onInteract);
            window.removeEventListener("click", onInteract);
          };
          window.addEventListener("touchstart", onInteract, { once: true, passive: true });
          window.addEventListener("scroll", onInteract, { once: true, passive: true });
          window.addEventListener("click", onInteract, { once: true });
        });
      }
    };
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("canplay", tryPlay, { once: true });

    const isBuffered = (t: number) => {
      const ranges = video.buffered;
      for (let i = 0; i < ranges.length; i++) {
        if (t >= ranges.start(i) - 0.05 && t <= ranges.end(i) + 0.05) {
          return true;
        }
      }
      return false;
    };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!durationRef.current || video.readyState < 2) return;
      if (video.seeking) return;
      const range =
        document.documentElement.scrollHeight - window.innerHeight;
      const scroll = lenisScrollRef.current || window.scrollY;
      const progress = range > 0 ? Math.max(0, Math.min(1, scroll / range)) : 0;
      const t = progress * durationRef.current;
      // Compare against actual video.currentTime so we correct any
      // drift caused by autoplay advancing between scroll events.
      if (Math.abs(t - video.currentTime) < 0.04) return;
      if (!isBuffered(t)) return;
      video.currentTime = t;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("canplay", tryPlay);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="hero-bg-video"
        src="/assets/photos/New%20photos/hero-scrub.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-bg-tint" aria-hidden="true" />
    </>
  );
}
