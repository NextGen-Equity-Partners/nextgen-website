"use client";

import { GlassIcon } from "@/components/ui/glass-icon";
import { useLocale } from "@/components/providers/locale-provider";

const content = {
  de: {
    heroEyebrow: "Portfolio · DACH-Mittelstand",
    heroLineA: "Unsere",
    heroLineBold: "Beteiligungen.",
    heroSub: "Wir bauen Unternehmensgruppen im Bereich Business und Professional Services – mit eigenem Kapital, technischer Kompetenz und langfristiger Partnerschaft.",
    section1Eyebrow: "Portfolio in Entstehung",
    section1TitleA: "Aktuell",
    section1TitleBold: "noch ohne Portfolio.",
    section1ParaA: "NextGen Equity ist ein junges, eigenfinanziertes Setup. Konkrete Beteiligungen kommunizieren wir transparent, sobald sie abgeschlossen sind – mit Namen, Personen und einem ehrlichen Bild der Zusammenarbeit.",
    section1ParaB: "Bis dahin: Wenn Sie ein Unternehmen oder ein Mandat haben, das in unser Profil passen könnte, freuen wir uns über ein Gespräch.",
    section1Cta: "Lassen Sie uns sprechen →",
    section2Eyebrow: "Investitionskriterien",
    section2TitleA: "Was wir",
    section2TitleBold: "suchen.",
    profileLabel: "Profil",
    profileTitle: "Wonach wir suchen.",
    profileBullets: [
      "· Branchen: Business Services und Professional Services",
      "· Plattform-Investments: 10–100 Mio. € Umsatz",
      "· Ergänzende Zukäufe: 3–10 Mio. € Umsatz",
      "· Gesunde Unternehmen mit Wachstumsperspektive",
      "· Fragmentierte Märkte, in denen ein Zusammenwachsen Sinn ergibt",
    ],
    termsLabel: "Konditionen",
    termsTitle: "Wie wir investieren.",
    termsBullets: [
      "· Mehrheitsbeteiligungen",
      "· Nachfolgelösungen, Konzernausgliederungen, Wachstumsfinanzierungen",
      "· Region: Deutschland, Österreich, Schweiz",
      "· Partnerschaftlich, langfristig, mit eigenem Kapital",
      "· Kein Bieterwettbewerb – verbindliche Prozesse",
    ],
    section2Cta: "Ihr Unternehmen kurz beschreiben →",
  },
  en: {
    heroEyebrow: "Portfolio · DACH mid-market",
    heroLineA: "Our",
    heroLineBold: "Investments.",
    heroSub: "We build corporate groups in business and professional services — with our own capital, technical expertise and long-term partnership.",
    section1Eyebrow: "Portfolio in formation",
    section1TitleA: "Currently",
    section1TitleBold: "no portfolio yet.",
    section1ParaA: "NextGen Equity is a young, self-funded setup. We will share concrete investments transparently once they close — with names, people, and an honest picture of the partnership.",
    section1ParaB: "Until then: if you have a company or a mandate that could match our profile, we'd be glad to talk.",
    section1Cta: "Let's talk →",
    section2Eyebrow: "Investment criteria",
    section2TitleA: "What we're",
    section2TitleBold: "looking for.",
    profileLabel: "Profile",
    profileTitle: "What we look for.",
    profileBullets: [
      "· Sectors: business services and professional services",
      "· Platform investments: €10–100M revenue",
      "· Add-on acquisitions: €3–10M revenue",
      "· Healthy companies with growth potential",
      "· Fragmented markets where consolidation makes sense",
    ],
    termsLabel: "Terms",
    termsTitle: "How we invest.",
    termsBullets: [
      "· Majority investments",
      "· Succession solutions, corporate carve-outs, growth financing",
      "· Region: Germany, Austria, Switzerland",
      "· Partnership-driven, long-term, with our own capital",
      "· No bidding wars — binding processes",
    ],
    section2Cta: "Briefly describe your company →",
  },
};

export default function Page() {
  const { locale } = useLocale();
  const c = content[locale];
  return (
    <>
      <section className="hero subpage">
        <div className="hero-eyebrow">{c.heroEyebrow}</div>
        <h1 className="display hero-title">
          <span className="hero-line">{c.heroLineA}</span>
          <span className="hero-line"><span className="bold">{c.heroLineBold}</span></span>
        </h1>
        <p className="hero-sub">{c.heroSub}</p>
      </section>

      <section className="pane">
        <div className="pane-inner pane-center">
          <div className="s-tag center rv">{c.section1Eyebrow}</div>
          <h2 className="display rv center-narrow">{c.section1TitleA} <span className="bold">{c.section1TitleBold}</span></h2>
          <p className="body-text rv rv-d1 center-narrow-sm">{c.section1ParaA}</p>
          <p className="body-text rv rv-d2 center-narrow-sm">{c.section1ParaB}</p>
          <div className="rv rv-d3 kontakt-teaser-cta">
            <a href="/kontakt" className="btn btn-light">{c.section1Cta}</a>
          </div>
          <img className="media-rounded beteiligungen-photo rv rv-d4" src="/assets/photos/erika-U6GYjO-9jBM-unsplash.jpg" alt="" aria-hidden="true" />
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">{c.section2Eyebrow}</div>
          <h2 className="display rv">{c.section2TitleA} <span className="bold">{c.section2TitleBold}</span></h2>
          <div className="glass-grid cols-2">
            <div className="glass-card tall rv rv-d1">
              <div className="gc-num-row">
                <span className="gc-icon"><GlassIcon name="user" /></span>
                <div className="num">{c.profileLabel}</div>
              </div>
              <div>
                <h3 className="with-mb">{c.profileTitle}</h3>
                <ul className="list-bullets">
                  {c.profileBullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
            <div className="glass-card tall rv rv-d2">
              <div className="gc-num-row">
                <span className="gc-icon"><GlassIcon name="coin" /></span>
                <div className="num">{c.termsLabel}</div>
              </div>
              <div>
                <h3 className="with-mb">{c.termsTitle}</h3>
                <ul className="list-bullets">
                  {c.termsBullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div className="rv rv-d3 cta-row">
            <a href="/kontakt" className="btn btn-light">{c.section2Cta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
