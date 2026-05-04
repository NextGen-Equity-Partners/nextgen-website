"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const SECTION_SELECTOR =
  "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.bare-section, section.testimonial-section";

/**
 * iOS-style page indicator: a glass pill at the bottom of the viewport
 * with one dot per snap section. The dot for the section currently in
 * view is highlighted. Tapping a dot scrolls to that section via Lenis.
 *
 * Hidden on touch viewports (≤760px / coarse pointer) where snap is
 * disabled and the indicator would just fight with native scroll.
 */
export function PageIndicator() {
  const lenis = useLenis();
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [count, setCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 760px), (hover: none), (pointer: coarse)",
    );
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // Defer one frame so all sections are mounted before we collect them.
    const raf = requestAnimationFrame(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(SECTION_SELECTOR),
      );
      sectionsRef.current = els;
      setCount(els.length);
    });
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  // Pick the active section as the one whose top is closest to a line
  // 30% down the viewport. Robust against snap holding mid-transition.
  useEffect(() => {
    if (!enabled || count === 0) return;
    const compute = () => {
      const els = sectionsRef.current;
      if (!els.length) return;
      const target = window.innerHeight * 0.3;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < els.length; i++) {
        const top = els[i].getBoundingClientRect().top;
        const dist = Math.abs(top - target);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setActiveIndex(bestIdx);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [enabled, count]);

  if (!enabled || count === 0) return null;

  const onDotClick = (i: number) => {
    const el = sectionsRef.current[i];
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, lock: true, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="page-indicator" aria-hidden="true">
      <div className="page-indicator-pill">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`page-indicator-dot${i === activeIndex ? " is-active" : ""}`}
            onClick={() => onDotClick(i)}
            tabIndex={-1}
          />
        ))}
      </div>
    </div>
  );
}
