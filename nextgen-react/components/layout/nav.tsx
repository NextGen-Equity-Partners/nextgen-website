"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Nav() {
  const pathname = usePathname() || "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEN = pathname.startsWith("/en");
  const base = isEN ? "/en" : "";
  const home = isEN ? "/en" : "/";

  useEffect(() => {
    const updateScrollState = () => {
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(top > 8);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const links = isEN
    ? [
        { href: `${base}/profil`, label: "Profile" },
        { href: `${base}/ansatz`, label: "Approach" },
        { href: `${base}/ki-wertsteigerung`, label: "AI & Value" },
        { href: `${base}/team`, label: "Team" },
      ]
    : [
        { href: `${base}/profil`, label: "Profil" },
        { href: `${base}/ansatz`, label: "Ansatz" },
        { href: `${base}/ki-wertsteigerung`, label: "KI & Wertsteigerung" },
        { href: `${base}/team`, label: "Team" },
      ];

  const ctaHref = `${base}/kontakt`;
  const ctaLabel = isEN ? "Contact" : "Kontakt";

  const isActive = (href: string) => {
    if (href === "/" || href === "/en") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const dePath = isEN ? pathname.replace(/^\/en/, "") || "/" : "/";
  const enPath = isEN ? "/en" : `/en${pathname === "/" ? "" : pathname}`;

  return (
    <>
      <nav className={`nav${isScrolled ? " is-scrolled" : ""}`} id="nav">
        <a href={home} className="brand" aria-label="NextGen Equity">
          <img src="/assets/logo-white.svg" alt="NextGen Equity" height={24} />
          <span className="brand-mark" aria-hidden="true">N</span>
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined}>
              {l.label}
            </a>
          ))}
          <a href={ctaHref} className={`nav-cta${isActive(ctaHref) ? " active" : ""}`}>
            {ctaLabel}
          </a>
          <div className="lang-switch">
            <a href={dePath} className={!isEN ? "active" : undefined}>DE</a>
            <a href={enPath} className={isEN ? "active" : undefined}>EN</a>
          </div>
          <a href="/animations" className="nav-alab" aria-label="Animations Lab" title="Animations Lab">A</a>
        </div>
        <button
          className={`nav-burger${mobileOpen ? " open" : ""}`}
          id="nav-burger"
          aria-label={isEN ? "Open menu" : "Menü öffnen"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`} id="nav-mobile">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href={ctaHref} className="cta" onClick={() => setMobileOpen(false)}>{ctaLabel}</a>
      </div>
    </>
  );
}
