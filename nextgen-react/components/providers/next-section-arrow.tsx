"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { getSnapInstance } from "./scroll-snap";

const SNAP_SELECTOR =
  "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.bare-section, section.testimonial-section";

/**
 * Floating arrow at the bottom of the viewport that scrolls to the next
 * snap section when clicked. Hides on the last section. Uses Lenis's
 * scrollTo so the navigation is animated and respects smooth scroll.
 */
export function NextSectionArrow() {
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(SNAP_SELECTOR),
      );
      if (!targets.length) return;
      const last = targets[targets.length - 1];
      const lastRect = last.getBoundingClientRect();
      // Hide once the last section's start is above the upper half of
      // the viewport (i.e. the user has reached it).
      setHidden(lastRect.top <= window.innerHeight * 0.4);
      lastScrollRef.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    // Prefer Lenis Snap's own next() — it lands exactly on the registered
    // snap point, matching the behaviour of organic scrolling.
    const snap = getSnapInstance();
    if (snap) {
      snap.next();
      return;
    }

    // Fallback when snap isn't ready yet.
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(SNAP_SELECTOR),
    );
    const scrollY = window.scrollY;
    const tolerance = 24;
    const next = targets.find((el) => el.offsetTop > scrollY + tolerance);
    if (!next) return;

    if (lenis) {
      lenis.scrollTo(next, { duration: 1.0 });
    } else {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      type="button"
      className={`next-arrow${hidden ? " is-hidden" : ""}`}
      onClick={onClick}
      aria-label="Nächster Abschnitt"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
