"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero background.
 *
 * SSR: a static <img> of the first video frame. Hydration then swaps
 * to a <video> for both desktop and mobile, but with different
 * playback recipes:
 *
 * - Desktop / pointer:hover — scroll-scrub. The video stays "playing"
 *   but `playbackRate` is pinned to 0 so the timeline doesn't advance
 *   from playback. `currentTime` is driven by Lenis scroll inside
 *   requestAnimationFrame.
 *
 * - Touch / coarse pointer (iOS, Android, tablets) — slow autoplay
 *   (0.25× → ~20s for the 5s clip), then freeze on the final frame.
 *   No loop, no jump back to start.
 *
 * The `<video poster>` is the same image the SSR <img> shows, so the
 * img → video swap on hydration is visually invisible.
 */
const VIDEO_SRC = "/assets/photos/New%20photos/hero-scrub.mp4";
const FIRST_FRAME_SRC = "/assets/photos/New%20photos/hero-first.jpg";

export function HeroShader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const lenisScrollRef = useRef(0);
  // SSR default: "img" mode — so nothing video-shaped exists in the
  // first paint and there is nothing the browser could autoplay before
  // we have a chance to set up our own playback rules. Hydration
  // switches to "video" mode and decides desktop vs mobile via isTouch.
  const [mode, setMode] = useState<"img" | "video">("img");
  const [isTouch, setIsTouch] = useState(false);

  useLenis(({ scroll }) => {
    lenisScrollRef.current = scroll;
  });

  useEffect(() => {
    setIsTouch(
      window.matchMedia("(hover: none), (pointer: coarse)").matches,
    );
    setMode("video");
  }, []);

  // -- Touch: slow autoplay, freeze on last frame --------------------
  useEffect(() => {
    if (mode !== "video" || !isTouch) return;
    const video = videoRef.current;
    if (!video) return;

    // No looping — play through once, freeze.
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
  }, [mode, isTouch]);

  // -- Desktop: scroll-scrub -----------------------------------------
  useEffect(() => {
    if (mode !== "video" || isTouch) return;
    const video = videoRef.current;
    if (!video) return;

    // Override the SSR `loop` attribute on desktop. Scroll-scrub drives
    // currentTime manually; if `loop` is on and the user reaches the
    // bottom of a short page (e.g. /kontakt) the video auto-jumps back
    // to frame 0 and starts the sunrise over.
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
  }, [mode, isTouch]);

  return (
    <>
      {mode === "video" ? (
        <video
          ref={videoRef}
          className="hero-bg-video"
          src={VIDEO_SRC}
          poster={FIRST_FRAME_SRC}
          muted
          playsInline
          preload="auto"
          loop
          aria-hidden="true"
          onPlay={(e) => {
            // Desktop only: pin rate=0 the moment play() resolves so
            // the timeline never advances from playback. The mobile
            // useEffect intentionally lets play continue at its own
            // 0.25× rate, which it sets again right after via
            // ratechange.
            if (!isTouch) {
              e.currentTarget.playbackRate = 0;
              e.currentTarget.defaultPlaybackRate = 0;
            }
          }}
        />
      ) : (
        <img
          className="hero-bg-video"
          src={FIRST_FRAME_SRC}
          alt=""
          aria-hidden="true"
        />
      )}
      <div className="hero-bg-tint" aria-hidden="true" />
    </>
  );
}
