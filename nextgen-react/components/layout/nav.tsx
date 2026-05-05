"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useLocale } from "@/components/providers/locale-provider";
import { tr } from "@/lib/content/i18n";

const LINK_HREFS = [
  { href: "/#team",            key: "team" },
  { href: "/#zielunternehmen", key: "zielunternehmen" },
  { href: "/#ansatz",          key: "ansatz" },
  { href: "/#technologie",     key: "technologie" },
  { href: "/#esg",             key: "esg" },
] as const;

export function Nav() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const lenis = useLenis();
  const { locale, setLocale } = useLocale();
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
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const match = href.match(/#(.+)$/);
    if (!match) return;
    const id = match[1];

    if (pathname === "/") {
      e.preventDefault();
      scrollToAnchor(id);
    } else {
      e.preventDefault();
      router.push(`/#${id}`);
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
          {LINK_HREFS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleAnchor(e, l.href)}>
              {tr.nav[l.key as keyof typeof tr.nav][locale]}
            </a>
          ))}
          <a href="/kontakt" className={`nav-cta${isActive("/kontakt") ? " active" : ""}`}>
            {tr.nav.kontakt[locale]}
          </a>
          <div
            className="nav-locale"
            role="group"
            aria-label="Sprache / Language"
            data-locale={locale}
          >
            <span className="nav-locale-thumb" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setLocale("de")}
              aria-pressed={locale === "de"}
              className={locale === "de" ? "is-active" : ""}
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={locale === "en" ? "is-active" : ""}
            >
              EN
            </button>
          </div>
        </div>
        <button
          className={`nav-burger${mobileOpen ? " open" : ""}`}
          id="nav-burger"
          aria-label={tr.nav.burgerOpen[locale]}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`} id="nav-mobile">
        {LINK_HREFS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              setMobileOpen(false);
              handleAnchor(e, l.href);
            }}
          >
            {tr.nav[l.key as keyof typeof tr.nav][locale]}
          </a>
        ))}
        <a href="/kontakt" className="cta" onClick={() => setMobileOpen(false)}>
          {tr.nav.kontakt[locale]}
        </a>
        <div className="nav-locale nav-locale-mobile" data-locale={locale}>
          <span className="nav-locale-thumb" aria-hidden="true" />
          <button type="button" onClick={() => setLocale("de")} aria-pressed={locale === "de"} className={locale === "de" ? "is-active" : ""}>DE</button>
          <button type="button" onClick={() => setLocale("en")} aria-pressed={locale === "en"} className={locale === "en" ? "is-active" : ""}>EN</button>
        </div>
      </div>
    </>
  );
}
