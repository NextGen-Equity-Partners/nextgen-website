"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const LINKS = [
  { href: "/#team", label: "Team" },
  { href: "/#zielunternehmen", label: "Zielunternehmen" },
  { href: "/#ansatz", label: "Ansatz" },
  { href: "/#technologie", label: "Technologie" },
  { href: "/#esg", label: "ESG" },
];

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

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const scrollToAnchor = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Land with the section's top flush with the viewport top — same
    // position the snap controller picks. The section's 124px top
    // padding then leaves the box content cleanly below the nav.
    const targetY = target.getBoundingClientRect().top + window.scrollY;
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
