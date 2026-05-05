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
 * autoPlay + loop, so iOS allows it without a user gesture) but pin
 * playbackRate to 0 so the timeline doesn't actually advance between
 * scroll events. Without that pin the video drifts forward ~16ms per
 * real frame; the rAF correction then snaps it back to the scroll
 * target every few frames, which the eye reads as flickering when the
 * page is stationary. With rate 0 the decoder still owns a current
 * frame and renders new frames on every currentTime write — but it
 * stays exactly where we put it.
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
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="hero-bg-video"
        src="/assets/photos/New%20photos/hero-scrub.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-bg-tint" aria-hidden="true" />
    </>
  );
}
