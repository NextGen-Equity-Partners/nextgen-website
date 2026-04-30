"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "./reduced-motion";

const HOVER_TARGETS = ".btn, .nav-cta, .glass-card, .nav-links a, .cf-submit, [data-modal], button";

/**
 * #32 — Custom cursor: a small ring that follows the cursor with subtle delay.
 * On hover targets it grows + becomes outline. Hidden on touch devices.
 */
export function CursorProxy() {
  const pathname = usePathname();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Show after first mouse move (avoid flash on initial render)
    gsap.set([ring, dot], { autoAlpha: 0, xPercent: -50, yPercent: -50 });

    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([ring, dot], { autoAlpha: 1, duration: 0.4 });
      }
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const onEnterTarget = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(249,247,244,0.9)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeaveTarget = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(249,247,244,0.45)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    const hoverTargets = Array.from(document.querySelectorAll(HOVER_TARGETS));
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnterTarget);
      el.addEventListener("mouseleave", onLeaveTarget);
    });

    const onLeaveWindow = () => {
      gsap.to([ring, dot], { autoAlpha: 0, duration: 0.2 });
      visible = false;
    };
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterTarget);
        el.removeEventListener("mouseleave", onLeaveTarget);
      });
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1.5px solid rgba(249,247,244,0.45)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform, opacity",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "rgba(249,247,244,0.95)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
