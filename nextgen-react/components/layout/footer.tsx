"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname() || "/";
  const isEN = pathname.startsWith("/en");
  const kontaktHref = isEN ? "/en/kontakt" : "/kontakt";
  const labels = isEN
    ? { impressum: "Imprint", datenschutz: "Privacy", kontakt: "Contact", rights: "© 2026 · All rights reserved" }
    : { impressum: "Impressum", datenschutz: "Datenschutz", kontakt: "Kontakt", rights: "© 2026 · Alle Rechte vorbehalten" };

  return (
    <footer>
      <div className="fl">NextGen Equity Partners GmbH · München</div>
      <div className="fm">{labels.rights}</div>
      <div className="fr">
        <button data-modal="impressum">{labels.impressum}</button>
        <button data-modal="datenschutz">{labels.datenschutz}</button>
        <a href={kontaktHref}>{labels.kontakt}</a>
      </div>
    </footer>
  );
}
