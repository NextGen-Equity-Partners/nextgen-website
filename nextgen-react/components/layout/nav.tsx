"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
        <a href="/kontakt" className="cta" onClick={() => setMobileOpen(false)}>Kontakt</a>
      </div>
    </>
  );
}
