"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { LEGAL_CONTENT, LEGAL_UI, type LegalKey } from "@/lib/content/legal";

export function LegalPage({ pageKey }: { pageKey: LegalKey }) {
  const { locale } = useLocale();
  const data = LEGAL_CONTENT[locale][pageKey];
  const ui = LEGAL_UI[locale];

  return (
    <>
      <section className="hero subpage">
        <div className="hero-eyebrow">{ui.eyebrow}</div>
        <h1 className="display hero-title">
          <span className="hero-line">{data.title}</span>
        </h1>
      </section>

      <section className="legal-section">
        <div className="legal-inner imp-body" dangerouslySetInnerHTML={{ __html: data.html }} />
      </section>
    </>
  );
}
