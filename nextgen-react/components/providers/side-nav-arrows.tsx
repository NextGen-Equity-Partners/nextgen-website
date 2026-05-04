"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const SNAP_SELECTOR =
  "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.bare-section, section.testimonial-section";

/**
 * Two floating "scroll" affordances pinned to the left and right edges
 * of the viewport. They jump Lenis to the previous / next snap section.
 * The previous-arrow is hidden on the first section, the next-arrow on
 * the last. Hidden entirely on touch / coarse pointers (where snap is
 * also disabled).
 */
export function SideNavArrows() {
  const lenis = useLenis();
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(true);
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
    const onScroll = () => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(SNAP_SELECTOR),
      );
      if (!targets.length) return;
      const first = targets[0];
      const last = targets[targets.length - 1];
      const firstTop = first.getBoundingClientRect().top;
      const lastTop = last.getBoundingClientRect().top;
      setHasPrev(firstTop < -window.innerHeight * 0.2);
      setHasNext(lastTop > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  if (!enabled) return null;

  const jump = (dir: "prev" | "next") => {
    // Lenis's Snap exposes `next()` but not `prev()`, so we resolve the
    // target manually for both directions and Lenis-scroll into it.
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(SNAP_SELECTOR),
    );
    if (!targets.length) return;
    const scrollY = window.scrollY;
    const tolerance = 24;
    let target: HTMLElement | undefined;
    if (dir === "next") {
      target = targets.find((el) => el.offsetTop > scrollY + tolerance);
    } else {
      target = [...targets].reverse().find((el) => el.offsetTop < scrollY - tolerance);
    }
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.0 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <button
        type="button"
        className={`side-arrow side-arrow-prev${hasPrev ? "" : " is-hidden"}`}
        onClick={() => jump("prev")}
        aria-label="Vorheriger Abschnitt"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        className={`side-arrow side-arrow-next${hasNext ? "" : " is-hidden"}`}
        onClick={() => jump("next")}
        aria-label="Nächster Abschnitt"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </>
  );
}
