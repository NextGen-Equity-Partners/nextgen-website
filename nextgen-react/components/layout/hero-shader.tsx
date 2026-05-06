"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero background video.
 *
 * - Desktop / pointer:hover — scroll-scrub. The video plays (so the
 *   decoder stays warm and renders frames) but `playbackRate` is
 *   pinned to 0 so the timeline never advances from playback. The
 *   `onPlay` JSX handler sets the rate synchronously on the very
 *   first play event so the user never sees a frame advance before
 *   pin takes hold. `currentTime` is driven by Lenis scroll inside
 *   requestAnimationFrame.
 *
 * - Touch / coarse pointer (iOS, Android, tablets) — slow autoplay
 *   (0.25× → ~20s for the 5s clip), then freeze on the final frame.
 *   No loop, no jump back to start.
 *
 * The `<video autoPlay>` is in the SSR markup so iOS Safari honours
 * autoplay (Safari ignores autoplay when the element is added to the
 * DOM after hydration). The `<video poster>` is the first frame so
 * the decode window before the video shows its own first frame is
 * filled with the same image — no visible flash on reload.
 */
const VIDEO_SRC = "/assets/photos/New%20photos/hero-scrub.mp4";
const FIRST_FRAME_SRC = "/assets/photos/New%20photos/hero-first.jpg";

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

  // -- Touch: slow autoplay, freeze on last frame --------------------
  useEffect(() => {
    if (!isTouch) return;
    const video = videoRef.current;
    if (!video) return;

    // No looping — play through once at slow rate, then freeze.
    video.loop = false;
    video.removeAttribute("loop");

    // 0.25× turns the 5s clip into ~20s gentle build-up. iOS Safari
    // accepts sub-1 rates on muted videos but quantises some values;
    // 0.25 / 0.5 are the safest below-normal rates in practice.
    const RATE = 0.25;
    const setRate = () => {
      if (video.playbackRate !== RATE) video.playbackRate = RATE;
      if (video.defaultPlaybackRate !== RATE) video.defaultPlaybackRate = RATE;
    };
    setRate();
    video.addEventListener("loadedmetadata", setRate);
    video.addEventListener("play", setRate);
    video.addEventListener("ratechange", setRate);

    const onEnded = () => {
      try {
        if (video.duration > 0) {
          video.currentTime = Math.max(0, video.duration - 0.05);
        }
        video.pause();
      } catch { /* non-fatal */ }
    };
    video.addEventListener("ended", onEnded);

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
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [isTouch]);

  // -- Desktop: scroll-scrub -----------------------------------------
  useEffect(() => {
    if (isTouch) return;
    const video = videoRef.current;
    if (!video) return;

    // Scroll-scrub drives currentTime manually; if `loop` is on the
    // video would auto-jump back to frame 0 when scroll reaches the
    // bottom of a short page (e.g. /kontakt).
    video.loop = false;
    video.removeAttribute("loop");

    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // Pin playback rate to 0 — both `defaultPlaybackRate` (used after
    // canplay/loadeddata) and `playbackRate` (used live).
    const pin = () => {
      if (video.defaultPlaybackRate !== 0) video.defaultPlaybackRate = 0;
      if (video.playbackRate !== 0) video.playbackRate = 0;
    };
    pin();

    const tryPlay = () => {
      pin();
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.then(pin).catch(() => {
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
      const maxT = Math.max(0, durationRef.current - 0.08);
      const t = progress * maxT;
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
        SSR markup includes autoPlay so iOS Safari honours autoplay
        (Safari refuses to autoplay videos that React inserts into
        the DOM after hydration). On desktop the onPlay handler
        immediately pins playbackRate to 0; on mobile the touch
        useEffect resets it to 0.25× via ratechange.
      */}
      <video
        ref={videoRef}
        className="hero-bg-video"
        src={VIDEO_SRC}
        poster={FIRST_FRAME_SRC}
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
        aria-hidden="true"
        onPlay={(e) => {
          // Synchronous rate pin only on desktop. On touch devices we
          // want the slow 0.25× playback the touch useEffect sets up,
          // so we leave the rate alone here.
          if (!isTouch) {
            e.currentTarget.playbackRate = 0;
            e.currentTarget.defaultPlaybackRate = 0;
          }
        }}
      />
      <div className="hero-bg-tint" aria-hidden="true" />
    </>
  );
}
