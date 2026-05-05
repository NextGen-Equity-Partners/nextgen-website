"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { useLocale } from "@/components/providers/locale-provider";

type Stop =
  | { kind: "anchor"; id: string }
  | { kind: "route"; id: string };

const STOPS: Stop[] = [
  { kind: "anchor", id: "" },
  { kind: "anchor", id: "team" },
  { kind: "anchor", id: "zielunternehmen" },
  { kind: "anchor", id: "ansatz" },
  { kind: "anchor", id: "technologie" },
  { kind: "anchor", id: "esg" },
  { kind: "route",  id: "/kontakt" },
];

export function SideArrows() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const lenis = useLenis();
  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(() =>
    pathname === "/kontakt" ? STOPS.length - 1 : 0,
  );

  useEffect(() => {
    if (pathname === "/kontakt") {
      setActiveIndex(STOPS.length - 1);
      return;
    }
    if (pathname !== "/") {
      setActiveIndex(0);
      return;
    }

    const onScroll = () => {
      const scrollY = window.scrollY;
      let idx = 0;
      for (let i = 1; i < STOPS.length; i++) {
        const stop = STOPS[i];
        if (stop.kind !== "anchor") continue;
        const el = document.getElementById(stop.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top - 140 <= scrollY) idx = i;
      }
      setActiveIndex(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const goToStop = (idx: number) => {
    const stop = STOPS[idx];
    if (!stop) return;

    if (stop.kind === "route") {
      router.push(stop.id);
      return;
    }

    if (pathname !== "/") {
      router.push(stop.id ? `/#${stop.id}` : "/");
      return;
    }

    if (!stop.id) {
      if (lenis) lenis.scrollTo(0, { duration: 1.0 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(stop.id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.0 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPrev = () => goToStop(Math.max(0, activeIndex - 1));
  const onNext = () => goToStop(Math.min(STOPS.length - 1, activeIndex + 1));

  const atStart = activeIndex === 0;
  const atEnd = activeIndex === STOPS.length - 1;

  if (pathname.startsWith("/animations")) return null;

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
