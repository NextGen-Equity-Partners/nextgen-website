"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero-scrub video as the page background. Driven directly by Lenis's
 * scroll progress so it scrubs frame-perfect with the smooth scroll.
 * Past ~2 viewport heights of scroll, the video locks at its last frame.
 *
 * On touch / narrow viewports (≤760px) Lenis-driven scrubbing is unreliable
 * (touch scroll, momentum), so we fall back to a normal autoplay loop.
 */
export function HeroShader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const rafRef = useRef(0);
  const targetRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cache duration once metadata loads, and flip videoReady once we have
  // enough buffered to scrub without showing the native loading state.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    const onCanPlay = () => setVideoReady(true);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("canplaythrough", onCanPlay);
    video.addEventListener("canplay", onCanPlay);
    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 3) setVideoReady(true);
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("canplaythrough", onCanPlay);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

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

  // Drive video.currentTime from Lenis's scroll position. RAF coalesces
  // bursts of scroll events into a single seek per frame.
  useLenis(({ scroll }) => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video || !durationRef.current) return;
    // Reversed mapping across the entire page scroll: top = video end
    // (post-sunset), bottom = video start. Scrolling runs the timeline
    // backwards so the sun rises as the user moves down the page.
    const range =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.max(0, Math.min(1, scroll / range)) : 0;
    targetRef.current = (1 - progress) * durationRef.current;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (videoRef.current) videoRef.current.currentTime = targetRef.current;
      });
    }
  });

  return (
    <>
      <img
        className="hero-bg-poster"
        src="/assets/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        data-faded={videoReady ? "true" : undefined}
      />
      <video
        ref={videoRef}
        className="hero-bg-video"
        src="/assets/photos/New%20photos/hero-scrub.mp4"
        poster="/assets/hero-poster.jpg"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        data-ready={videoReady ? "true" : undefined}
      />
      <div className="hero-bg-tint" aria-hidden="true" />
    </>
  );
}
