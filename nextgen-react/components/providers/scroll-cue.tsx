"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const SNAP_SELECTOR =
  "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.kontakt-section, section.bare-section, section.testimonial-section";

/**
 * Fixed mouse-wheel scroll cue at the bottom-center of every viewport.
 * Same visual as the original hero-scroll icon, just lifted out of the
 * hero so it's available across the whole page. Click jumps Lenis to
 * the next snap section, or — if no further section exists — falls
 * back to a one-viewport scroll-down so the cue still feels useful on
 * pages with only one content stop.
 */
export function ScrollCue() {
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hide once the user is within ~one viewport of the document end
      // so the cue doesn't sit on top of the footer.
      const remaining =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setHidden(remaining <= window.innerHeight * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(SNAP_SELECTOR),
    );
    const scrollY = window.scrollY;
    const tolerance = 24;
    const next = targets.find((el) => el.offsetTop > scrollY + tolerance);
    const targetY = next
      ? undefined
      : window.scrollY + window.innerHeight;
    if (lenis) {
      if (next) lenis.scrollTo(next, { duration: 1.0 });
      else if (typeof targetY === "number") lenis.scrollTo(targetY, { duration: 1.0 });
    } else if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (typeof targetY === "number") {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
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
