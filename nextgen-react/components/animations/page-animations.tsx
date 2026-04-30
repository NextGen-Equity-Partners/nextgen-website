"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Mounts on every page (in root layout). Runs:
 *   #27 Hero mask-reveal — eyebrow → headline lines → sub → CTAs
 *   #30 Section divider draw-in (scaleX 0 → 1 left-to-right on enter viewport)
 * Skips animations entirely when prefers-reduced-motion is set.
 */
export function PageAnimations() {
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    // Header glass: toggle .nav-scrolled when user has scrolled > 30px.
    // Watermark dodge: hide .hero-mark when a glass-card / pane visibly
    // collides with its bottom-right corner, restore when the area is clear.
    const nav = document.getElementById("nav");
    const heroMark = document.querySelector<HTMLElement>(".hero-mark");
    let detachNavScroll: (() => void) | undefined;

    const onScroll = () => {
      if (nav) {
        if (window.scrollY > 30) nav.classList.add("nav-scrolled");
        else nav.classList.remove("nav-scrolled");
      }

      if (heroMark) {
        const mr = heroMark.getBoundingClientRect();
        // Probe the rect that the watermark "owns" + a small safety pad.
        const pad = 12;
        const probeL = mr.left - pad;
        const probeR = mr.right + pad;
        const probeT = mr.top - pad;
        const probeB = mr.bottom + pad;

        // Does anything visually solid overlap that rect?
        const colliders = document.querySelectorAll<HTMLElement>(
          ".pane, .glass-card, .story-break, .slogan-break, footer"
        );
        let collide = false;
        for (const c of colliders) {
          const cr = c.getBoundingClientRect();
          if (cr.right < probeL || cr.left > probeR) continue;
          if (cr.bottom < probeT || cr.top > probeB) continue;
          collide = true;
          break;
        }
        heroMark.classList.toggle("dodged", collide);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    detachNavScroll = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    if (prefersReducedMotion()) {
      return () => {
        detachNavScroll?.();
      };
    }

    const ctx = gsap.context(() => {
      // ---------- #27 Hero reveal ----------
      const heroEyebrow = document.querySelector(".hero .hero-eyebrow");
      const heroLines = document.querySelectorAll(".hero .hero-title .hero-line");
      const heroSub = document.querySelector(".hero .hero-sub");
      const heroCtas = document.querySelector(".hero .hero-ctas");
      const heroMark = document.querySelector(".hero .hero-mark");

      if (heroLines.length) {
        // Wrap each line in an overflow:hidden mask if not already wrapped.
        heroLines.forEach((line) => {
          const el = line as HTMLElement;
          if (el.dataset.masked === "1") return;
          el.dataset.masked = "1";
          el.style.display = "inline-block";
          el.style.overflow = "hidden";
          // Inner wrapper for the actual translateY
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
      // The headline numbers like "10–100 Mio. €" are ranges, so a true counter
      // doesn't fit. Instead: scale/fade entrance to draw the eye to them.
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

    return () => {
      ctx.revert();
      detachNavScroll?.();
    };
  }, []);

  return null;
}
