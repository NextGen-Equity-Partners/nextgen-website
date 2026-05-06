"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/**
 * Hero background.
 *
 * - Desktop / pointer:hover — scroll-scrub video. The video is "playing"
 *   (autoPlay so iOS allows it without a user gesture) but `playbackRate`
 *   is pinned to 0 so the timeline doesn't advance from playback. An
 *   `onPlay` JSX handler also sets the rate to 0 synchronously on the
 *   very first play event, so the user never sees frames advance during
 *   the brief moment between browser autoplay and the useEffect hooks
 *   attaching their own pin handlers. `currentTime` is driven by Lenis
 *   scroll inside requestAnimationFrame.
 *
 * - Touch / coarse pointer (iOS, Android, tablets) — no video at all.
 *   We render a static `<img>` of the first video frame instead. The
 *   user explicitly didn't want anything moving on page load on mobile;
 *   serving an image is also faster, decoder-friendly, and dodges every
 *   autoplay quirk WebKit + Android Chrome have around <video>.
 *
 * The same first-frame still doubles as the `<video poster>` on desktop,
 * so during the sub-second decode window before the video can render its
 * own first frame, the user sees the same image — no poster-to-video
 * flash on reload.
 */
const VIDEO_SRC = "/assets/photos/New%20photos/hero-scrub.mp4";
const FIRST_FRAME_SRC = "/assets/photos/New%20photos/hero-first.jpg";

export function HeroShader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const lenisScrollRef = useRef(0);
  // SSR default: "img" mode. Both desktop and mobile users get the
  // static first-frame image first; desktop swaps to <video> only
  // after the touch-detection useEffect runs. This guarantees that:
  //   1. Mobile users never have a <video> element in their DOM,
  //      so there is nothing the browser could autoplay.
  //   2. Desktop users see the same first-frame image during the
  //      pre-hydration window — when the swap to <video> happens,
  //      the video's `poster` is the same image so the transition
  //      is invisible.
  const [mode, setMode] = useState<"img" | "video">("img");

  useLenis(({ scroll }) => {
    lenisScrollRef.current = scroll;
  });

  useEffect(() => {
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;
    setMode(isTouch ? "img" : "video");
  }, []);

  // -- Desktop: scroll-scrub -----------------------------------------
  useEffect(() => {
    if (mode !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    // Override the SSR `loop` attribute on desktop. The scroll-scrub
    // drives currentTime manually; if `loop` is on and the user reaches
    // the bottom of a short page (e.g. /kontakt) the video auto-jumps
    // back to frame 0 and starts the sunrise over.
    video.loop = false;
    video.removeAttribute("loop");

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

    const tryPlay = () => {
      pin();
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.then(pin).catch(() => {
          // Autoplay refused — retry on the first user gesture.
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
      // Clamp the target a couple of frames short of `duration` so we
      // never set currentTime to the exact end. Hitting duration fires
      // `ended` (which loops or pauses depending on browser) and on
      // short pages like /kontakt the user reaching the bottom would
      // see the sunrise restart from frame 0.
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
  }, [mode]);

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
            // Synchronous rate pin: even though we no longer ship the
            // `autoPlay` attribute, the very first JS-initiated play()
            // call from the desktop useEffect could otherwise advance
            // a frame before pin() runs. Setting the rate inside the
            // play event handler closes that gap.
            e.currentTarget.playbackRate = 0;
            e.currentTarget.defaultPlaybackRate = 0;
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
