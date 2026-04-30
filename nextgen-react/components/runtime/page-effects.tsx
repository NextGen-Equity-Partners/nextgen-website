"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Page-wide DOM effects that need to bind after hydration:
 *   - Reveal-on-scroll for elements with .rv (toggles .on in viewport)
 *   - 3D tilt on cards (.glass-card, .j-item, .tm, .aaa-tool, .cmp-card)
 *
 * Mounted in the root layout and rebound on App Router navigation.
 */
export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    cleanups.push(bindRevealOnScroll());
    document.querySelectorAll<HTMLElement>(
      ".glass-card, .j-item, .tm, .aaa-tool, .cmp-card",
    ).forEach((el) => {
      const cleanup = bindTilt(el, 3);
      if (cleanup) cleanups.push(cleanup);
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}

// -- reveal -----------------------------------------------------------------

function bindRevealOnScroll() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        e.target.classList.toggle("on", e.isIntersecting);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  return () => io.disconnect();
}

// -- 3D tilt ----------------------------------------------------------------

function bindTilt(el: HTMLElement, max = 15) {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    return undefined;
  }

  type TiltElement = HTMLElement & { __tiltCleanup?: () => void };
  const tiltEl = el as TiltElement;
  if (tiltEl.__tiltCleanup) return undefined;

  let rect: DOMRect | null = null;
  let raf = 0;
  let pendingX = 0,
    pendingY = 0,
    pendingGx = 50,
    pendingGy = 50;

  const apply = () => {
    el.style.transform = `perspective(1000px) rotateX(${pendingX.toFixed(2)}deg) rotateY(${pendingY.toFixed(2)}deg)`;
    el.style.setProperty("--gx", pendingGx.toFixed(1) + "%");
    el.style.setProperty("--gy", pendingGy.toFixed(1) + "%");
    raf = 0;
  };

  const onMouseEnter = () => {
    rect = el.getBoundingClientRect();
    el.style.transition =
      "box-shadow 0.4s ease, background 0.35s ease, border-color 0.35s ease";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!rect) rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    pendingX = (py - 0.5) * 2 * max;
    pendingY = (px - 0.5) * -2 * max;
    pendingGx = px * 100;
    pendingGy = py * 100;
    if (!raf) raf = requestAnimationFrame(apply);
  };

  const onMouseLeave = () => {
    rect = null;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    el.style.transition =
      "transform 0.4s ease, box-shadow 0.4s ease, background 0.35s ease, border-color 0.35s ease";
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "50%");
  };

  el.addEventListener("mouseenter", onMouseEnter);
  el.addEventListener("mousemove", onMouseMove);
  el.addEventListener("mouseleave", onMouseLeave);

  tiltEl.__tiltCleanup = () => {
    if (raf) cancelAnimationFrame(raf);
    el.removeEventListener("mouseenter", onMouseEnter);
    el.removeEventListener("mousemove", onMouseMove);
    el.removeEventListener("mouseleave", onMouseLeave);
    delete tiltEl.__tiltCleanup;
  };

  return tiltEl.__tiltCleanup;
}
