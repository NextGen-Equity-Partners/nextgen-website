"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero-scrub video as the page background. Driven directly by Lenis's
 * scroll progress so it scrubs frame-perfect with the smooth scroll.
 *
 * On touch / narrow viewports (≤760px) Lenis-driven scrubbing is unreliable
 * (touch scroll, momentum), so we fall back to a normal autoplay loop.
 *
 * Stall protection: a fresh page load streams the video in progressively,
 * so any scroll-scrub during that window can land on an unbuffered frame
 * and the browser pauses to fetch data — that's what "hanging" looks
 * like. We skip seeks while the video is already seeking, while it
 * doesn't have enough data, or when the target falls outside the
 * currently-buffered ranges. The video then catches up the moment its
 * buffer reaches the desired position, with no main-thread stall.
 */
export function HeroShader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const rafRef = useRef(0);
  const targetRef = useRef(0);
  const lastAppliedRef = useRef(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cache duration once metadata loads, and immediately compute the
  // scroll-mapped target so the video lands on the correct frame
  // (e.g. sun-already-up at scroll = 0) before the first scroll event
  // fires. Without this the video would show its natural first frame
  // (pre-dawn) until the user scrolled.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => {
      durationRef.current = video.duration || 0;
      if (isMobile || !durationRef.current) return;
      const range =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
      const usable = Math.max(0, durationRef.current - 2.5);
      targetRef.current = (1 - progress) * usable;
      // Seek to the target — also nudges the browser to start
      // buffering around that timestamp instead of from currentTime=0.
      try {
        video.currentTime = targetRef.current;
        lastAppliedRef.current = targetRef.current;
      } catch {
        /* ignore — applyPendingSeek will retry once buffer arrives */
      }
      applyPendingSeek(video);
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, [isMobile]);

  // Mobile: loop autoplay. Desktop: paused, currentTime driven by Lenis.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = isMobile;
    if (isMobile) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isMobile]);

  // Whenever buffer extends, try to apply any pending target that just
  // came into range. Without this, after we skip a seek for being out
  // of buffer the video stays frozen until the next scroll event.
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
  useLenis(({ scroll }) => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video || !durationRef.current) return;
    // Reversed mapping across the entire page scroll: top = video end
    // (post-sunset), bottom = video start. Scrolling runs the timeline
    // backwards so the sun rises as the user moves down the page.
    //
    // TAIL_TRIM_SECONDS chops N seconds off the end of the video so
    // scroll=0 lands on a brighter frame (the dark post-sunset tail
    // felt like dead air at the top of the page).
    const TAIL_TRIM_SECONDS = 2.5;
    const range =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.max(0, Math.min(1, scroll / range)) : 0;
    const usableDuration = Math.max(
      0,
      durationRef.current - TAIL_TRIM_SECONDS,
    );
    targetRef.current = (1 - progress) * usableDuration;
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
