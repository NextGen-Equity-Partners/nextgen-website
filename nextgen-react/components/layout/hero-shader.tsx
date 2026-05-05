"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero-scrub video as the page background. Driven directly by Lenis's
 * scroll progress so it scrubs frame-perfect with the smooth scroll —
 * on every viewport, including touch.
 *
 * The mp4 ships in already-reversed order (the natural forward
 * playback shows the sunrise as we want it to read). Frame 0 of the
 * file is therefore exactly the frame the user should see at scroll
 * position 0 — no seek hack needed at load time, the browser
 * downloads from the start and the start is what we want visible.
 */
export function HeroShader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const rafRef = useRef(0);
  const targetRef = useRef(0);
  const lastAppliedRef = useRef(-1);

  // Cache duration once metadata loads.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();
    video.loop = false;
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // Kick-start: iOS Safari and many Android browsers won't decode any
  // video frames until play() is called at least once. Without that
  // call, setting video.currentTime renders nothing — the user sees the
  // hero-bg-video's `background: var(--bg-deep)` fallback (a flat blue)
  // instead of the sunrise scrub. Briefly play() the muted, playsInline
  // video to force decode, then pause() and let scroll drive
  // currentTime as before. The play burst is one frame long so it's
  // not visible.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const kick = async () => {
      if (cancelled) return;
      try {
        const p = video.play();
        if (p) await p;
      } catch {
        // Autoplay can still be rejected on some browsers without a
        // user gesture; harmless — desktop scrubbing keeps working
        // and the first user-driven scroll will retry.
        return;
      }
      requestAnimationFrame(() => {
        if (cancelled) return;
        video.pause();
        // Force the next applyPendingSeek to actually re-write
        // currentTime so we land back on the scroll-relative frame
        // (instead of the random frame we briefly played to).
        lastAppliedRef.current = -1;
        applyPendingSeek(video);
      });
    };

    if (video.readyState >= 2) {
      kick();
      return () => {
        cancelled = true;
      };
    }
    const onReady = () => kick();
    video.addEventListener("canplay", onReady, { once: true });
    return () => {
      cancelled = true;
      video.removeEventListener("canplay", onReady);
    };
  }, []);

  // Buffer-aware seek: only set currentTime when the target falls
  // within an already-buffered range, so we never stall on a seek
  // request the browser can't fulfil yet. Re-applies on `progress` so
  // the video catches up automatically as more data arrives.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onProgress = () => applyPendingSeek(video);
    video.addEventListener("progress", onProgress);
    video.addEventListener("canplay", onProgress);
    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplay", onProgress);
    };
  }, []);

  function isBuffered(video: HTMLVideoElement, t: number): boolean {
    const ranges = video.buffered;
    for (let i = 0; i < ranges.length; i++) {
      if (t >= ranges.start(i) - 0.05 && t <= ranges.end(i) + 0.05) {
        return true;
      }
    }
    return false;
  }

  function applyPendingSeek(video: HTMLVideoElement) {
    if (video.readyState < 2) return;
    if (video.seeking) return;
    const t = targetRef.current;
    if (Math.abs(t - lastAppliedRef.current) < 0.02) return;
    if (!isBuffered(video, t)) return;
    lastAppliedRef.current = t;
    video.currentTime = t;
  }

  // Drive video.currentTime from Lenis's scroll position. RAF coalesces
  // bursts of scroll events into a single seek per frame.
  // Forward mapping: progress 0 → currentTime 0 (sunrise start),
  // progress 1 → currentTime duration (sun high). The mp4 file is
  // already reversed at build time so this is the desired direction.
  useLenis(({ scroll }) => {
    const video = videoRef.current;
    if (!video || !durationRef.current) return;
    const range =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.max(0, Math.min(1, scroll / range)) : 0;
    targetRef.current = progress * durationRef.current;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const v = videoRef.current;
        if (v) applyPendingSeek(v);
      });
    }
  });

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
