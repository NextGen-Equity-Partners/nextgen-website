"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Page-wide DOM effects that need to bind after hydration:
 *   - Reveal-on-scroll for elements with .rv (adds .on when in viewport)
 *   - 3D tilt on cards (.glass-card, .j-item, .tm, .aaa-tool, .cmp-card)
 *   - Auto-injected line icons inside .glass-card .num (legacy auto-detection;
 *     will be replaced by explicit <GlassCard icon="..."> prop in section refactor).
 *
 * Mounted in the root layout and rebound on App Router navigation.
 */
export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    cleanups.push(bindRevealOnScroll());
    document.querySelectorAll<HTMLElement>(
      ".glass-card, .j-item, .tm, .aaa-tool, .cmp-card",
    ).forEach((el) => {
      const cleanup = bindTilt(el, 3);
      if (cleanup) cleanups.push(cleanup);
    });
    injectGlassCardIcons();
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}

// -- reveal -----------------------------------------------------------------

function bindRevealOnScroll() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  return () => io.disconnect();
}

// -- 3D tilt ----------------------------------------------------------------

function bindTilt(el: HTMLElement, max = 15) {
  type TiltElement = HTMLElement & { __tiltCleanup?: () => void };
  const tiltEl = el as TiltElement;
  if (tiltEl.__tiltCleanup) return undefined;

  let rect: DOMRect | null = null;
  let raf = 0;
  let pendingX = 0,
    pendingY = 0,
    pendingGx = 50,
    pendingGy = 50;

  const apply = () => {
    el.style.transform = `perspective(1000px) rotateX(${pendingX.toFixed(2)}deg) rotateY(${pendingY.toFixed(2)}deg)`;
    el.style.setProperty("--gx", pendingGx.toFixed(1) + "%");
    el.style.setProperty("--gy", pendingGy.toFixed(1) + "%");
    raf = 0;
  };

  const onMouseEnter = () => {
    rect = el.getBoundingClientRect();
    el.style.transition =
      "box-shadow 0.4s ease, background 0.35s ease, border-color 0.35s ease";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!rect) rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    pendingX = (py - 0.5) * 2 * max;
    pendingY = (px - 0.5) * -2 * max;
    pendingGx = px * 100;
    pendingGy = py * 100;
    if (!raf) raf = requestAnimationFrame(apply);
  };

  const onMouseLeave = () => {
    rect = null;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    el.style.transition =
      "transform 0.4s ease, box-shadow 0.4s ease, background 0.35s ease, border-color 0.35s ease";
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "50%");
  };

  const onScroll = () => {
    if (rect) rect = el.getBoundingClientRect();
  };

  el.addEventListener("mouseenter", onMouseEnter);
  el.addEventListener("mousemove", onMouseMove);
  el.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("scroll", onScroll, { passive: true });

  tiltEl.__tiltCleanup = () => {
    if (raf) cancelAnimationFrame(raf);
    el.removeEventListener("mouseenter", onMouseEnter);
    el.removeEventListener("mousemove", onMouseMove);
    el.removeEventListener("mouseleave", onMouseLeave);
    window.removeEventListener("scroll", onScroll);
    delete tiltEl.__tiltCleanup;
  };

  return tiltEl.__tiltCleanup;
}

// -- glass card auto icons (temporary; to be replaced by explicit prop) -----

const ICON_PATHS: Record<string, string> = {
  coin: '<circle cx="12" cy="12" r="9"/><path d="M9 9.5h4.5a2 2 0 010 4H10a2 2 0 000 4h5M12 6.5v11"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="0.5"/><path d="M9 6V3M12 6V3M15 6V3M9 21v-3M12 21v-3M15 21v-3M6 9H3M6 12H3M6 15H3M21 9h-3M21 12h-3M21 15h-3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>',
  users: '<circle cx="9" cy="9" r="3.5"/><path d="M3 19a6 6 0 0112 0M16.5 11.5a3 3 0 100-6 3 3 0 000 6zM21 19a5 5 0 00-7-4.6"/>',
  user: '<circle cx="12" cy="9" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>',
  chart: '<path d="M3 20h18M6 16l3-3 3 2 4-5 5 4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18"/>',
  handshake: '<path d="M5 13l4-4 3 3 4-4 3 3M5 13l3 3 4-4M16 11l4 4-3 3-3-3"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  leaf: '<path d="M5 19c0-9 7-15 15-15-1 8-6 15-15 15z"/><path d="M5 19l8-8"/>',
  layers: '<path d="M12 4l9 5-9 5-9-5 9-5z"/><path d="M3 14l9 5 9-5M3 19l9 5 9-5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2z"/>',
  plus: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>',
  arrowOut: '<path d="M5 19l14-14M14 5h5v5"/>',
  flag: '<path d="M5 4v17M5 4h12l-3 4 3 4H5"/>',
  horizon: '<path d="M3 17h18"/><circle cx="12" cy="13" r="4"/><path d="M3 12l3-3M21 12l-3-3"/>',
  spark: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
};

const ICON_RULES: [RegExp, string][] = [
  [/kapital|unternehmer/i, "coin"],
  [/technologie|^tech|atlas|powerhouse|implementierung/i, "cpu"],
  [/strategie/i, "target"],
  [/kultur|familie|arbeitgeber|menschen/i, "users"],
  [/profil|dienstleistung|wissensintensiv/i, "user"],
  [/umsatz|skalierung/i, "chart"],
  [/region|dach|münchen/i, "globe"],
  [/vertrauen|nachfolge/i, "handshake"],
  [/verlässlich/i, "shield"],
  [/verantwortung|nachhaltig/i, "leaf"],
  [/plattform|konzern/i, "layers"],
  [/governance|sourcing|origination|deal/i, "compass"],
  [/buy[-\s]?in|partnerschaft/i, "handshake"],
  [/add[-\s]?on|akquisition/i, "plus"],
  [/exit/i, "arrowOut"],
  [/wettbewerb/i, "flag"],
  [/mittelfristig|kurzfristig/i, "compass"],
  [/langfristig|horizon|vision/i, "horizon"],
  [/value\s?creation|wachstum|operativ/i, "spark"],
  [/portfolio|monitoring|tracking/i, "eye"],
  [/^pe$/i, "shield"],
  [/^ki$/i, "cpu"],
  [/professional/i, "spark"],
];

function injectGlassCardIcons() {
  document.querySelectorAll<HTMLElement>(".glass-card").forEach((card) => {
    if (card.querySelector(".gc-icon")) return;
    const numEl = card.querySelector<HTMLElement>(".num, .label");
    if (!numEl) return;
    const text = numEl.textContent || "";
    const match = ICON_RULES.find(([rx]) => rx.test(text));
    if (!match) return;
    const key = match[1];
    const row = document.createElement("div");
    row.className = "gc-num-row";
    const iconWrap = document.createElement("span");
    iconWrap.className = "gc-icon";
    iconWrap.innerHTML = `<svg viewBox="0 0 24 24">${ICON_PATHS[key]}</svg>`;
    numEl.parentElement?.insertBefore(row, numEl);
    row.appendChild(iconWrap);
    row.appendChild(numEl);
  });
}
