export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Portfolio · DACH-Mittelstand</div>
        <h1 className="display hero-title">
          <span className="hero-line">Unsere</span>
          <span className="hero-line"><span className="bold">Beteiligungen.</span></span>
        </h1>
        <p className="hero-sub">Wir bauen Unternehmensgruppen im Bereich Business und Professional Services – mit eigenem Kapital, technischer Kompetenz und langfristiger Partnerschaft.</p>
      </section>
      
      {/* COMING SOON */}
      <section className="pane">
        <div className="pane-inner" style={{ textAlign: "center" }}>
          <div className="s-tag rv" style={{ justifyContent: "center" }}>Portfolio in Entstehung</div>
          <h2 className="display rv" style={{ maxWidth: "760px", margin: "0 auto" }}>Aktuell <span className="bold">noch ohne Portfolio.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: "620px", margin: "24px auto 0" }}>
            NextGen Equity ist ein junges, eigenfinanziertes Setup. Konkrete Beteiligungen kommunizieren wir transparent, sobald sie abgeschlossen sind – mit Namen, Personen und einem ehrlichen Bild der Zusammenarbeit.
          </p>
          <p className="body-text rv rv-d2" style={{ maxWidth: "620px", margin: "14px auto 0" }}>
            Bis dahin: Wenn Sie ein Unternehmen oder ein Mandat haben, das in unser Profil passen könnte, freuen wir uns über ein Gespräch.
          </p>
          <div className="rv rv-d3" style={{ marginTop: "36px" }}>
            <a href="/kontakt" className="btn btn-light">Lassen Sie uns sprechen →</a>
          </div>
          <img className="media-rounded rv rv-d4" src="/assets/photos/erika-U6GYjO-9jBM-unsplash.jpg" alt="" aria-hidden="true" style={{ margin: "48px auto 0", maxWidth: "680px", height: "280px" }} />
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* INVESTMENT-KRITERIEN */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Investitionskriterien</div>
          <h2 className="display rv">Was wir <span className="bold">suchen.</span></h2>
          <div className="glass-grid cols-2">
            <div className="glass-card rv rv-d1" style={{ minHeight: "340px" }}>
              <div className="num">Profil</div>
              <div>
                <h3 style={{ marginBottom: "18px" }}>Wonach wir suchen.</h3>
                <ul style={{ listStyle: "none", fontSize: "14px", lineHeight: "2", color: "rgba(249,247,244,.78)", fontWeight: "300" }}>
                  <li>· Branchen: Business Services und Professional Services</li>
                  <li>· Plattform-Investments: 10–100 Mio. € Umsatz</li>
                  <li>· Ergänzende Zukäufe: 3–10 Mio. € Umsatz</li>
                  <li>· Gesunde Unternehmen mit Wachstumsperspektive</li>
                  <li>· Fragmentierte Märkte, in denen ein Zusammenwachsen Sinn ergibt</li>
                </ul>
              </div>
            </div>
            <div className="glass-card rv rv-d2" style={{ minHeight: "340px" }}>
              <div className="num">Konditionen</div>
              <div>
                <h3 style={{ marginBottom: "18px" }}>Wie wir investieren.</h3>
                <ul style={{ listStyle: "none", fontSize: "14px", lineHeight: "2", color: "rgba(249,247,244,.78)", fontWeight: "300" }}>
                  <li>· Mehrheitsbeteiligungen</li>
                  <li>· Nachfolgelösungen, Konzernausgliederungen, Wachstumsfinanzierungen</li>
                  <li>· Region: Deutschland, Österreich, Schweiz</li>
                  <li>· Partnerschaftlich, langfristig, mit eigenem Kapital</li>
                  <li>· Kein Bieterwettbewerb – verbindliche Prozesse</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rv rv-d3" style={{ marginTop: "48px" }}>
            <a href="/kontakt" className="btn btn-light">Ihr Unternehmen kurz beschreiben →</a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
