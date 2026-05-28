"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { tr } from "@/lib/content/i18n";

export function Footer() {
  const { locale } = useLocale();
  return (
    <footer>
      <div className="fl">
        <span className="footer-meta">{tr.footer.company[locale]}</span>
        <Link href="/impressum">{tr.footer.impressum[locale]}</Link>
        <Link href="/datenschutz">{tr.footer.datenschutz[locale]}</Link>
      </div>
    </footer>
  );
}
