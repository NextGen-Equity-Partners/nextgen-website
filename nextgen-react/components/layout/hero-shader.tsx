"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero-scrub video as the page background.
 *
 * Two modes, picked once after hydration:
 *
 * - Desktop / pointer:hover — scroll-scrub. The video stays "playing"
 *   (muted + playsInline + autoPlay so iOS allows it without a user
 *   gesture) but `playbackRate` is pinned to 0 so the timeline doesn't
 *   advance from playback. `currentTime` is driven by Lenis scroll
 *   inside requestAnimationFrame; the rate-0 pin avoids the per-frame
 *   drift that would otherwise need correcting and read as flicker.
 *
 * - Touch / coarse pointer (iOS, Android, tablets) — natural slow
 *   playback. The rate-0 + currentTime trick doesn't decode reliably
 *   on mobile (iOS low-power, throttled decoders) — it ends up showing
 *   the bg-deep blue instead of the sunrise. On touch we just let the
 *   video autoplay at 0.4× and loop. A `poster` of the same sunrise
 *   frame guarantees something visible even if the browser delays or
 *   refuses autoplay (low-power / data-saver).
 */
const POSTER_SRC = "/assets/photos/New%20photos/hero-still.jpg";
const VIDEO_SRC = "/assets/photos/New%20photos/hero-scrub.mp4";

export function HeroShader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const lenisScrollRef = useRef(0);
  const [isTouch, setIsTouch] = useState(false);

  useLenis(({ scroll }) => {
    lenisScrollRef.current = scroll;
  });

  useEffect(() => {
    setIsTouch(
      window.matchMedia("(hover: none), (pointer: coarse)").matches,
    );
  }, []);

  // -- Touch: slow autoplay loop -------------------------------------
  useEffect(() => {
    if (!isTouch) return;
    const video = videoRef.current;
    if (!video) return;

    const setRate = () => {
      if (video.playbackRate !== 0.4) video.playbackRate = 0.4;
      if (video.defaultPlaybackRate !== 0.4) video.defaultPlaybackRate = 0.4;
    };
    setRate();
    video.addEventListener("loadedmetadata", setRate);
    video.addEventListener("play", setRate);
    video.addEventListener("ratechange", setRate);

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay refused — retry on the first user gesture.
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

    return () => {
      video.removeEventListener("loadedmetadata", setRate);
      video.removeEventListener("play", setRate);
      video.removeEventListener("ratechange", setRate);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [isTouch]);

  // -- Desktop: scroll-scrub -----------------------------------------
  useEffect(() => {
    if (isTouch) return;
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // Pin playback rate to 0 — both `defaultPlaybackRate` (used after
    // canplay/loadeddata) and `playbackRate` (used live). Without
    // pinning both, some browsers reset to 1 on first play().
    const pin = () => {
      if (video.defaultPlaybackRate !== 0) video.defaultPlaybackRate = 0;
      if (video.playbackRate !== 0) video.playbackRate = 0;
    };
    pin();

    // Some mobile browsers reject the very first autoplay attempt if
    // the page is still painting. A single retry covers that case.
    const tryPlay = () => {
      pin();
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.then(pin).catch(() => {
          // Wait for any user interaction, then try again. The first
          // tap/scroll counts as a user gesture and unblocks playback.
          const onInteract = () => {
            video.play().then(pin).catch(() => {});
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
    // Re-pin on every relevant lifecycle event: play, loadeddata,
    // canplay, ratechange. Whichever browser quirk resets the rate,
    // one of these will catch it within the same frame.
    video.addEventListener("play", pin);
    video.addEventListener("loadeddata", pin);
    video.addEventListener("canplay", pin);
    video.addEventListener("ratechange", pin);

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
      video.removeEventListener("play", pin);
      video.removeEventListener("loadeddata", pin);
      video.removeEventListener("canplay", pin);
      video.removeEventListener("ratechange", pin);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  return (
    <>
      {/*
        autoPlay + loop are always in the SSR markup. iOS Safari only
        honours autoplay when those attributes are present in the
        original HTML — adding them after hydration via React props
        is silently ignored, which is why mobile users were seeing
        only the poster image. On desktop these don't fight the
        scroll-scrub: the desktop effect immediately pins playbackRate
        to 0 (so the timeline doesn't advance from autoplay, and loop
        is moot because currentTime is driven manually).
      */}
      <video
        ref={videoRef}
        className="hero-bg-video"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
        aria-hidden="true"
      />
      <div className="hero-bg-tint" aria-hidden="true" />
    </>
  );
}
