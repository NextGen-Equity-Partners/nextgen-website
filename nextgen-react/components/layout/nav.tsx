"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/profil", label: "Profil" },
  { href: "/ansatz", label: "Ansatz" },
  { href: "/ki-wertsteigerung", label: "KI & Wertsteigerung" },
  { href: "/team", label: "Team" },
];

export function Nav() {
  const pathname = usePathname() || "/";
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

  return (
    <>
      <nav className={`nav${isScrolled ? " is-scrolled" : ""}`} id="nav">
        <a href="/" className="brand" aria-label="NextGen Equity">
          <img src="/assets/logo-white.svg" alt="NextGen Equity" height={24} />
        </a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined}>
              {l.label}
            </a>
          ))}
          <a href="/kontakt" className={`nav-cta${isActive("/kontakt") ? " active" : ""}`}>
            Kontakt
          </a>
          <a href="/animations" className="nav-alab" aria-label="Animations Lab" title="Animations Lab">A</a>
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
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href="/kontakt" className="cta" onClick={() => setMobileOpen(false)}>Kontakt</a>
      </div>
    </>
  );
}
