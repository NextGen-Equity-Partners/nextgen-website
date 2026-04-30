"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Bottom-right brand watermark that morphs between full "NextGen" wordmark
 * (when the .hero section is in view) and just the "N" glyph (when scrolled
 * past it). No pill, no glass — typographic mark only. The N glyph is the
 * exact same SVG path as the wordmark, viewBox-cropped to the leading
 * letter, so the morph stays visually consistent with the brand mark.
 *
 * Uses IntersectionObserver on the page's `.hero` element so the morph fires
 * exactly when you leave / re-enter the hero. Falls back to a scrollY rule
 * with hysteresis on pages that don't have a `.hero`.
 */
export function HeroMark() {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    // Defer to next tick so the page's .hero is mounted
    const id = window.setTimeout(() => {
      const hero = document.querySelector<HTMLElement>(".hero");

      if (hero && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          ([entry]) => setIsCompact(!entry.isIntersecting),
          { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
        );
        io.observe(hero);
        // Initial state in case observer hasn't fired yet
        const r = hero.getBoundingClientRect();
        setIsCompact(r.bottom <= 0 || r.top >= window.innerHeight);
        return () => io.disconnect();
      }

      // Fallback: scrollY with hysteresis (compact > 200, expand < 4)
      const onScroll = () => {
        const y = window.scrollY || 0;
        setIsCompact((prev) => (y > 200 ? true : y < 4 ? false : prev));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, 0);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div
      className={`hero-mark${isCompact ? " is-compact" : ""}`}
      aria-hidden="true"
    >
      <img
        src="/assets/logo-white.svg"
        alt=""
        className="hero-mark-full"
        draggable={false}
      />
      <img
        src="/assets/logo-n.svg"
        alt=""
        className="hero-mark-letter"
        draggable={false}
      />
    </div>
  );
}
