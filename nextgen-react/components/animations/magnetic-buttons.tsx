"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "./reduced-motion";

const SELECTORS = ".btn, .nav-cta, .cf-submit";
const STRENGTH = 0.35; // 0..1 — how much the element follows the cursor
const TRIGGER_RADIUS_PX = 90;

/**
 * #31 — Buttons subtly attract the cursor when it's in their proximity.
 * Uses gsap.quickTo for 60fps performance. Pointer-coarse devices opt out.
 */
export function MagneticButtons() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch — skip

    const cleanups: Array<() => void> = [];

    const attach = (el: HTMLElement) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      const scaleXTo = gsap.quickTo(el, "scaleX", { duration: 0.4, ease: "power3.out" });
      const scaleYTo = gsap.quickTo(el, "scaleY", { duration: 0.4, ease: "power3.out" });
      const scaleTo = (value: number) => {
        scaleXTo(value);
        scaleYTo(value);
      };

      let active = false;

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const trigger = TRIGGER_RADIUS_PX + Math.max(rect.width, rect.height) / 2;

        if (dist < trigger) {
          if (!active) {
            active = true;
            scaleTo(1.04);
          }
          xTo(dx * STRENGTH);
          yTo(dy * STRENGTH);
        } else if (active) {
          active = false;
          xTo(0);
          yTo(0);
          scaleTo(1);
        }
      };

      const onLeave = () => {
        active = false;
        xTo(0);
        yTo(0);
        scaleTo(1);
      };

      window.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };

    document.querySelectorAll<HTMLElement>(SELECTORS).forEach(attach);

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return null;
}
