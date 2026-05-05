"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";

// Module-level handle so the floating next-section arrow can ask the
// snap controller to advance instead of computing positions manually.
let snapInstance: Snap | null = null;
export function getSnapInstance(): Snap | null {
  return snapInstance;
}

const SNAP_SELECTOR =
  "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.kontakt-section, section.bare-section, section.testimonial-section";

/**
 * Registers each top-level page section as a Lenis snap point so the
 * page reads as a sequence of editorial "stops". Only enabled on routes
 * that have at least 2 snap targets — single-snap pages (kontakt,
 * impressum-style content) otherwise pull the user back to the hero
 * whenever they try to reach the content below.
 *
 * Also disabled on touch / narrow viewports because mandatory snap
 * fights touch-scroll momentum.
 */
export function ScrollSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    // Disable section-snap on touch / narrow viewports — it interferes
    // with natural touch-scroll momentum and feels like the page is
    // "sticking" to each section.
    const mq = window.matchMedia("(max-width: 760px), (hover: none), (pointer: coarse)");
    if (mq.matches) return;

    const targets = document.querySelectorAll<HTMLElement>(SNAP_SELECTOR);
    // With <2 targets, mandatory snap just locks the user at the single
    // anchor (e.g. /kontakt has only the hero as a snap target — the
    // form below is .kontakt-section, not a registered snap class — so
    // any scroll attempt gets yanked back up).
    if (targets.length < 2) return;

    const snap = new Snap(lenis, {
      type: "mandatory",
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    snapInstance = snap;

    const removers: Array<() => void> = [];
    targets.forEach((el) => {
      removers.push(snap.addElement(el, { align: "start" }));
    });

    return () => {
      removers.forEach((r) => r());
      snap.destroy();
      snapInstance = null;
    };
  }, [lenis, pathname]);

  return null;
}
