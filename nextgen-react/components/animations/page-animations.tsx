"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Runs for the active App Router page:
 *   #27 Hero mask-reveal — eyebrow → headline lines → sub → CTAs
 *   #30 Section divider draw-in (scaleX 0 → 1 left-to-right on enter viewport)
 *   #29 Accent-number spotlight pulse
 *   Watermark-dodge — hero-mark SVG dodges cursor via rAF
 * Skips animations entirely when prefers-reduced-motion is set.
 */
export function PageAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // ---------- #27 Hero reveal ----------
      const heroEyebrow = document.querySelector(".hero .hero-eyebrow");
      const heroLines = document.querySelectorAll(".hero .hero-title .hero-line");
      const heroSub = document.querySelector(".hero .hero-sub");
      const heroCtas = document.querySelector(".hero .hero-ctas");
      const heroMark = document.querySelector(".hero .hero-mark");

      if (heroLines.length) {
        // Wrap each line in overflow:hidden mask for the slide-up reveal.
        // display:block preserves the block layout (inline-block would collapse two lines onto one).
        heroLines.forEach((line) => {
          const el = line as HTMLElement;
          if (el.dataset.masked === "1") return;
          el.dataset.masked = "1";
          el.style.display = "block";
          el.style.overflow = "hidden";
          const inner = document.createElement("span");
          inner.className = "hero-line-inner";
          inner.style.display = "inline-block";
          inner.style.willChange = "transform";
          while (el.firstChild) inner.appendChild(el.firstChild);
          el.appendChild(inner);
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (heroEyebrow) {
          tl.from(heroEyebrow, { opacity: 0, y: 8, duration: 0.5 }, 0);
        }

        // Reveal parent opacity (CSS starts at 0 as FOUC guard) then slide inner up.
        tl.fromTo(
          ".hero .hero-title .hero-line",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.08 },
          0.1
        );
        tl.from(
          ".hero .hero-title .hero-line .hero-line-inner",
          { yPercent: 110, duration: 0.95, stagger: 0.08 },
          0.1
        );

        if (heroSub) {
          tl.from(heroSub, { opacity: 0, y: 16, duration: 0.7 }, 0.55);
        }
        if (heroCtas) {
          tl.from(heroCtas, { opacity: 0, y: 12, duration: 0.6 }, 0.7);
        }
        if (heroMark) {
          tl.from(heroMark, { opacity: 0, duration: 1.2 }, 0.6);
        }
      }

      // ---------- #30 Section divider draw-in ----------
      gsap.utils.toArray<HTMLElement>(".sec-divider").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // ---------- #29 Accent-number spotlight pulse ----------
      gsap.utils.toArray<HTMLElement>(".story-break .accent, .accent").forEach((el) => {
        gsap.from(el, {
          scale: 0.85,
          opacity: 0,
          y: 8,
          duration: 0.85,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    // ---------- Watermark-dodge ----------
    const heroMarkEl = document.querySelector(".hero-mark") as HTMLElement | null;
    let raf = 0;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;

    if (heroMarkEl) {
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let cx = 0;
      let cy = 0;
      const RADIUS = 200;
      const STRENGTH = 80;
      const EASE = 0.08;

      onMouseMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      const tick = () => {
        const rect = heroMarkEl.getBoundingClientRect();
        const ex = rect.left + rect.width / 2;
        const ey = rect.top + rect.height / 2;
        const dx = mx - ex;
        const dy = my - ey;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tx = 0;
        let ty = 0;
        if (dist < RADIUS && dist > 0) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          tx = -(dx / dist) * force;
          ty = -(dy / dist) * force;
        }
        cx += (tx - cx) * EASE;
        cy += (ty - cy) * EASE;
        gsap.set(heroMarkEl, { x: cx, y: cy });
        raf = requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
