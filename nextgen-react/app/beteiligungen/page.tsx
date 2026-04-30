import { GlassIcon } from "@/components/ui/glass-icon";

export default function Page() {
  return (
    <>
      <section className="hero subpage">
        <div className="hero-eyebrow">Portfolio · DACH-Mittelstand</div>
        <h1 className="display hero-title">
          <span className="hero-line">Unsere</span>
          <span className="hero-line"><span className="bold">Beteiligungen.</span></span>
        </h1>
        <p className="hero-sub">Wir bauen Unternehmensgruppen im Bereich Business und Professional Services – mit eigenem Kapital, technischer Kompetenz und langfristiger Partnerschaft.</p>
      </section>
      
      <section className="pane">
        <div className="pane-inner pane-center">
          <div className="s-tag center rv">Portfolio in Entstehung</div>
          <h2 className="display rv center-narrow">Aktuell <span className="bold">noch ohne Portfolio.</span></h2>
          <p className="body-text rv rv-d1 center-narrow-sm">
            NextGen Equity ist ein junges, eigenfinanziertes Setup. Konkrete Beteiligungen kommunizieren wir transparent, sobald sie abgeschlossen sind – mit Namen, Personen und einem ehrlichen Bild der Zusammenarbeit.
          </p>
          <p className="body-text rv rv-d2 center-narrow-sm">
            Bis dahin: Wenn Sie ein Unternehmen oder ein Mandat haben, das in unser Profil passen könnte, freuen wir uns über ein Gespräch.
          </p>
          <div className="rv rv-d3 kontakt-teaser-cta">
            <a href="/kontakt" className="btn btn-light">Lassen Sie uns sprechen →</a>
          </div>
          <img className="media-rounded beteiligungen-photo rv rv-d4" src="/assets/photos/erika-U6GYjO-9jBM-unsplash.jpg" alt="" aria-hidden="true" />
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Investitionskriterien</div>
          <h2 className="display rv">Was wir <span className="bold">suchen.</span></h2>
          <div className="glass-grid cols-2">
            <div className="glass-card tall rv rv-d1">
              <div className="gc-num-row">
                <span className="gc-icon"><GlassIcon name="user" /></span>
                <div className="num">Profil</div>
              </div>
              <div>
                <h3 className="with-mb">Wonach wir suchen.</h3>
                <ul className="list-bullets">
                  <li>· Branchen: Business Services und Professional Services</li>
                  <li>· Plattform-Investments: 10–100 Mio. € Umsatz</li>
                  <li>· Ergänzende Zukäufe: 3–10 Mio. € Umsatz</li>
                  <li>· Gesunde Unternehmen mit Wachstumsperspektive</li>
                  <li>· Fragmentierte Märkte, in denen ein Zusammenwachsen Sinn ergibt</li>
                </ul>
              </div>
            </div>
            <div className="glass-card tall rv rv-d2">
              <div className="gc-num-row">
                <span className="gc-icon"><GlassIcon name="coin" /></span>
                <div className="num">Konditionen</div>
              </div>
              <div>
                <h3 className="with-mb">Wie wir investieren.</h3>
                <ul className="list-bullets">
                  <li>· Mehrheitsbeteiligungen</li>
                  <li>· Nachfolgelösungen, Konzernausgliederungen, Wachstumsfinanzierungen</li>
                  <li>· Region: Deutschland, Österreich, Schweiz</li>
                  <li>· Partnerschaftlich, langfristig, mit eigenem Kapital</li>
                  <li>· Kein Bieterwettbewerb – verbindliche Prozesse</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rv rv-d3 cta-row">
            <a href="/kontakt" className="btn btn-light">Ihr Unternehmen kurz beschreiben →</a>
          </div>
        </div>
      </section>
    </>
  );
}
