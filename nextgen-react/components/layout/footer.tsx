"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { tr } from "@/lib/content/i18n";

function openLegal(kind: "impressum" | "datenschutz") {
  document.dispatchEvent(
    new CustomEvent("legal-modal-open", { detail: kind }),
  );
}

export function Footer() {
  const { locale } = useLocale();
  return (
    <footer>
      <div className="fl">
        <span className="footer-meta">{tr.footer.company[locale]}</span>
        <button type="button" onClick={() => openLegal("impressum")}>
          {tr.footer.impressum[locale]}
        </button>
        <button type="button" onClick={() => openLegal("datenschutz")}>
          {tr.footer.datenschutz[locale]}
        </button>
      </div>
    </footer>
  );
}
