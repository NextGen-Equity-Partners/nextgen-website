"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";

// Module-level handle so the floating next-section arrow can ask the
// snap controller to advance instead of computing positions manually.
let snapInstance: Snap | null = null;
export function getSnapInstance(): Snap | null {
  return snapInstance;
}

/**
 * Registers each top-level page section as a Lenis snap point. With
 * `type: "proximity"` the page only snaps when the user is already near
 * a section boundary — small wheel ticks still scroll freely. If the
 * user stops mid-section, Lenis pulls the page to the nearest section.
 */
export function ScrollSnap() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const snap = new Snap(lenis, {
      type: "mandatory",
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    snapInstance = snap;

    const targets = document.querySelectorAll<HTMLElement>(
      "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.bare-section, section.testimonial-section",
    );
    const removers: Array<() => void> = [];
    targets.forEach((el) => {
      removers.push(snap.addElement(el, { align: "start" }));
    });

    return () => {
      removers.forEach((r) => r());
      snap.destroy();
      snapInstance = null;
    };
  }, [lenis]);

  return null;
}
