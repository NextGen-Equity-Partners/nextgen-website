"use client";

import { ContactForm } from "@/components/forms/contact-form";
import { useLocale } from "@/components/providers/locale-provider";
import { tr } from "@/lib/content/i18n";

export default function Page() {
  const { locale } = useLocale();
  return (
    <>
      <section className="hero subpage">
        <div className="hero-eyebrow">{tr.kontakt.heroEyebrow[locale]}</div>
        <h1 className="display hero-title">
          <span className="hero-line">{tr.kontakt.heroTitleA[locale]}</span>
          <span className="hero-line"><span className="bold">{tr.kontakt.heroTitleBold[locale]}</span></span>
        </h1>
        <p className="hero-sub">{tr.kontakt.heroSub[locale]}</p>
      </section>

      <section className="kontakt-section">
        <div className="kontakt-inner">
          <div className="cf-wrap" style={{ marginTop: "0" }}>
            <div className="cf-side cf-side-bare rv rv-d1">
              <div className="cf-block cf-greeting">
                <img className="cf-portrait" src="/assets/team/max.jpeg" alt="" />
                <div className="cf-eyebrow">{tr.kontakt.sideEyebrow[locale]}</div>
                <p>{tr.kontakt.sideBody[locale]}</p>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="cf-bottom">
            <div className="cf-bottom-block cf-bottom-block-bare rv rv-d2">
              <div className="cf-eyebrow">{tr.kontakt.bottomEmailEyebrow[locale]}</div>
              <p>E-Mail: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
            </div>
            <div className="cf-bottom-block cf-bottom-block-bare rv rv-d3">
              <div className="cf-eyebrow">{tr.kontakt.bottomLocationEyebrow[locale]}</div>
              <p style={{ whiteSpace: "pre-line" }}>{tr.kontakt.bottomLocation[locale]}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
