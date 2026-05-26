"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { useLocale } from "@/components/providers/locale-provider";

// Same selector used by ScrollSnap / ScrollCue so the arrows step
// through every editorial stop, including the unnamed testimonial /
// bare / mehrwerte sections that the previous id-only list skipped.
const HOME_SECTION_SELECTOR =
  "section.hero, #mission, section.pane, section.story-break, section.kontakt-teaser-section, section.bare-section, section.testimonial-section";

export function SideArrows() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const lenis = useLenis();
  const { locale } = useLocale();

  const sectionsRef = useRef<HTMLElement[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (pathname === "/kontakt" || pathname !== "/") {
      sectionsRef.current = [];
      offsetsRef.current = [];
      setActiveIndex(0);
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(HOME_SECTION_SELECTOR),
    );
    sectionsRef.current = sections;

    const computeOffsets = () => {
      offsetsRef.current = sections.map(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
    };
    computeOffsets();

    let raf = 0;
    const updateActive = () => {
      raf = 0;
      const scrollY = window.scrollY;
      const offsets = offsetsRef.current;
      let idx = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] - 140 <= scrollY) idx = i;
      }
      setActiveIndex(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateActive);
    };
    const onResize = () => {
      computeOffsets();
      onScroll();
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Late layout (web fonts, hero shader hydration) can shift section
    // positions after first paint — recompute once shortly after mount.
    const settle = window.setTimeout(() => {
      computeOffsets();
      onScroll();
    }, 600);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  const scrollToSection = (el: HTMLElement) => {
    if (lenis) lenis.scrollTo(el, { duration: 1.0 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isHome = pathname === "/";
  const isKontakt = pathname === "/kontakt";

  const onPrev = () => {
    if (isKontakt) {
      router.push("/");
      return;
    }
    if (!isHome) return;
    if (activeIndex <= 0) return;
    const target = sectionsRef.current[activeIndex - 1];
    if (target) scrollToSection(target);
  };

  const onNext = () => {
    if (isKontakt) return;
    if (!isHome) return;
    const sections = sectionsRef.current;
    const next = activeIndex + 1;
    if (next >= sections.length) {
      router.push("/kontakt");
      return;
    }
    const target = sections[next];
    if (target) scrollToSection(target);
  };

  // On /: prev disabled at hero; next always enabled (last section pushes to /kontakt).
  // On /kontakt: prev always enabled (back to /); next disabled (end of flow).
  const atStart = isHome ? activeIndex === 0 : false;
  const atEnd = isKontakt;

  // Only render on the editorial flow routes (home + kontakt). Other
  // routes (profil, team, ansatz, etc.) and the animations lab don't
  // share an editorial step-through, so the arrows have no meaningful
  // role there.
  if (!isHome && !isKontakt) return null;

  return (
    <div
      className="side-arrows"
      role="group"
      aria-label={locale === "de" ? "Seitennavigation" : "Page navigation"}
    >
      <button
        type="button"
        className="side-arrows-btn"
        onClick={onPrev}
        disabled={atStart}
        aria-label={locale === "de" ? "Vorheriger Abschnitt" : "Previous section"}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            d="M10 3 L5 8 L10 13"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        className="side-arrows-btn"
        onClick={onNext}
        disabled={atEnd}
        aria-label={locale === "de" ? "Nächster Abschnitt" : "Next section"}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            d="M6 3 L11 8 L6 13"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
