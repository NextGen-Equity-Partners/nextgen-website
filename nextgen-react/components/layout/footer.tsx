"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { tr } from "@/lib/content/i18n";

export function Footer() {
  const { locale } = useLocale();
  return (
    <footer>
      <nav className="footer-nav" aria-label={tr.footerNav.label[locale]}>
        <a href="/profil">{tr.footerNav.profil[locale]}</a>
        <a href="/ansatz">{tr.footerNav.ansatz[locale]}</a>
        <a href="/ki-wertsteigerung">{tr.footerNav.kiWertsteigerung[locale]}</a>
        <a href="/team">{tr.footerNav.team[locale]}</a>
        <a href="/beteiligungen">{tr.footerNav.beteiligungen[locale]}</a>
        <a href="/kontakt">{tr.footerNav.kontakt[locale]}</a>
      </nav>
      <div className="fl">
        <span className="footer-meta">{tr.footer.company[locale]}</span>
        <Link href="/impressum">{tr.footer.impressum[locale]}</Link>
        <Link href="/datenschutz">{tr.footer.datenschutz[locale]}</Link>
      </div>
    </footer>
  );
}
