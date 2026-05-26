"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./reduced-motion";
import { useLocale } from "@/components/providers/locale-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Runs for the active App Router page:
 *   #27 Hero mask-reveal — eyebrow → headline lines → sub → CTAs
 *   #30 Section divider draw-in (scaleX 0 → 1 left-to-right on enter viewport)
 *   #29 Accent-number spotlight pulse
 * Skips animations entirely when prefers-reduced-motion is set.
 *
 * Re-runs on locale changes too — the DE/EN toggle replaces the
 * hero-title children, which strips out the .hero-line-inner mask
 * wrappers added below. Without re-running, any new hero-line span
 * (e.g. the 4th DE line that doesn't exist in EN) stays at the FOUC-
 * guard `opacity: 0` and the user sees missing words in the title.
 */
export function PageAnimations() {
  const pathname = usePathname();
  const { locale } = useLocale();

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Even with reduced motion, override the FOUC-guard opacity:0
      // on .hero-line so the title is actually visible.
      document.querySelectorAll<HTMLElement>(".hero .hero-title .hero-line")
        .forEach((el) => { el.style.opacity = "1"; });
      return;
    }

    const ctx = gsap.context(() => {
      // ---------- #27 Hero reveal ----------
      const heroEyebrow = document.querySelector(".hero .hero-eyebrow");
      const heroLines = document.querySelectorAll(".hero .hero-title .hero-line");
      const heroSub = document.querySelector(".hero .hero-sub");
      const heroCtas = document.querySelector(".hero .hero-ctas");

      if (heroLines.length) {
        // Wrap each line in overflow:hidden mask for the slide-up reveal.
        // Check the actual DOM for an existing wrapper instead of just
        // the data-masked flag — when locale changes, React strips the
        // inner span on its reconciliation pass even though the flag is
        // still set, so we have to look at what's really there.
        heroLines.forEach((line) => {
          const el = line as HTMLElement;
          const existingInner = el.querySelector(":scope > .hero-line-inner");
          if (existingInner) {
            el.dataset.masked = "1";
            return;
          }
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

        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          onEnterBack: () => tl.restart(true),
        });
      }

      // ---------- #30 Section divider draw-in ----------
      gsap.utils.toArray<HTMLElement>(".sec-divider").forEach((el) => {
        gsap.fromTo(el, {
          scaleX: 0,
        }, {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "restart reset restart reset",
          },
        });
      });

      // ---------- #29 Accent-number spotlight pulse ----------
      gsap.utils.toArray<HTMLElement>(".story-break .accent, .accent").forEach((el) => {
        gsap.fromTo(el, {
          scale: 0.85,
          opacity: 0,
          y: 8,
        }, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "restart reset restart reset",
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [pathname, locale]);

  return null;
}
