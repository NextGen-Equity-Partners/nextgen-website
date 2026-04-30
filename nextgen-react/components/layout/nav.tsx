"use client";

import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname() || "/";
  const isEN = pathname.startsWith("/en");
  const base = isEN ? "/en" : "";
  const home = isEN ? "/en" : "/";

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
      <nav className="nav" id="nav">
        <a href={home} className="brand" aria-label="NextGen Equity">
          <img src="/assets/logo-white.svg" alt="NextGen Equity" height={24} />
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
        </div>
        <button className="nav-burger" id="nav-burger" aria-label={isEN ? "Open menu" : "Menü öffnen"}>
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className="nav-mobile" id="nav-mobile">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
        <a href={ctaHref} className="cta">{ctaLabel}</a>
      </div>
    </>
  );
}
