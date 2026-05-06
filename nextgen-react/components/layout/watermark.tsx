"use client";

import { useEffect, useState } from "react";

/**
 * Bottom-right brand watermark.
 *
 * Desktop: always visible (sits behind content with z-index: -1).
 * Mobile: visible only while the hero is the active section, then
 * fades out as the user scrolls past it. The mobile-hide is keyed
 * off scroll position rather than a media query so the desktop
 * version is unaffected.
 */
export function Watermark() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("section.hero");
      if (!hero) {
        setPastHero(true);
        return;
      }
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      setPastHero(window.scrollY > heroBottom - window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      className={`site-watermark${pastHero ? " is-past-hero" : ""}`}
      aria-hidden="true"
    >
      <img src="/assets/logo-white.svg" alt="" />
    </span>
  );
}
