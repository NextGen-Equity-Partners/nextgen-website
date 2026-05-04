"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const LINKS = [
  { href: "/#team", label: "Team" },
  { href: "/#ansatz", label: "Ansatz" },
  { href: "/#technologie", label: "Technologie" },
];

// No extra offset — sections already include 124px top padding so the
// box content lands cleanly below the nav when their top is aligned to
// the viewport top. Offset 0 matches the position the snap effect lands
// at when the user scrolls naturally.
const NAV_OFFSET = 0;

export function Nav() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const scrollToAnchor = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Section has 124px top padding; nav is 92px tall. Skip 32px so the
    // box content lands flush with the bottom of the nav, no extra gap.
    const targetY = target.getBoundingClientRect().top + window.scrollY + 32;
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // href is "/#team" — extract the anchor.
    const match = href.match(/#(.+)$/);
    if (!match) return;
    const id = match[1];

    if (pathname === "/") {
      e.preventDefault();
      scrollToAnchor(id);
    } else {
      // Cross-page navigation: let Next.js handle it, then scroll on mount.
      e.preventDefault();
      router.push(`/#${id}`);
      // Wait a tick for the new page to render, then scroll.
      setTimeout(() => scrollToAnchor(id), 100);
    }
  };

  return (
    <>
      <nav className={`nav${isScrolled ? " is-scrolled" : ""}`} id="nav">
        <a href="/" className="brand" aria-label="NextGen Equity">
          <img src="/assets/logo-white.svg" alt="NextGen Equity" height={24} />
        </a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleAnchor(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="/kontakt" className={`nav-cta${isActive("/kontakt") ? " active" : ""}`}>
            Kontakt
          </a>
        </div>
        <button
          className={`nav-burger${mobileOpen ? " open" : ""}`}
          id="nav-burger"
          aria-label="Menü öffnen"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`} id="nav-mobile">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              setMobileOpen(false);
              handleAnchor(e, l.href);
            }}
          >
            {l.label}
          </a>
        ))}
        <a href="/kontakt" className="cta" onClick={() => setMobileOpen(false)}>Kontakt</a>
      </div>
    </>
  );
}
