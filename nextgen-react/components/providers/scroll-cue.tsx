"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const SNAP_SELECTOR =
  "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.bare-section, section.testimonial-section";

/**
 * Fixed mouse-wheel scroll cue at the bottom-center of every viewport.
 * Same visual as the original hero-scroll icon, just lifted out of the
 * hero so it's available across the whole page. Click jumps Lenis to
 * the next snap section. Hides once the last section is in view (so the
 * footer isn't covered) and on touch / coarse pointers.
 */
export function ScrollCue() {
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px), (hover: none), (pointer: coarse)");
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
      const last = targets[targets.length - 1];
      const lastTop = last.getBoundingClientRect().top;
      // Hide once the last section's top is above the upper 40% mark.
      setHidden(lastTop <= window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  if (!enabled) return null;

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(SNAP_SELECTOR),
    );
    const scrollY = window.scrollY;
    const tolerance = 24;
    const next = targets.find((el) => el.offsetTop > scrollY + tolerance);
    if (!next) return;
    if (lenis) lenis.scrollTo(next, { duration: 1.0 });
    else next.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a
      href="#"
      className={`scroll-cue${hidden ? " is-hidden" : ""}`}
      aria-label="Nächster Abschnitt"
      onClick={onClick}
    >
      <div className="mouse">
        <div className="wheel" />
      </div>
    </a>
  );
}
