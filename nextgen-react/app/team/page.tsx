export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Die Menschen hinter NextGen</div>
        <h1 className="display hero-title">
          <span className="hero-line">Das Team hinter</span>
          <span className="hero-line"><span className="bold">NextGen.</span></span>
        </h1>
        <p className="hero-sub">Investoren, Unternehmer und Technikexperten – in einem Team, das gemeinsam kauft, aufbaut und Verantwortung trägt. Mit eigenem Kapital im Spiel.</p>
        <img className="hero-mark" src="/assets/logo-white.svg" alt="NextGen Equity" />
      </section>
      
      {/* TEAM-GRID */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Partner &amp; Team</div>
          <h2 className="display rv">Investoren, Unternehmer <span className="bold">und Technikexperten.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: "680px", marginTop: "24px" }}>Ein Team, das gemeinsam kauft, aufbaut und Wert schafft – mit voller Verantwortung und eigenem Kapital.</p>
      
          <div className="team-grid">
            {/* Partner-Reihe */}
            <div className="team-row-3">
              <div className="tm rv rv-d1">
                <div className="portrait"><img src="/assets/team/max.jpeg" alt="Maximilian Göppert" /></div>
                <div className="tm-body">
                  <div className="role">Partner</div>
                  <h4>Maximilian Göppert</h4>
                  <p>Über zwölf Jahre Erfahrung im Mittelstand – vom ersten Gespräch bis weit nach dem Closing. Denkt in Beziehungen, nicht in Transaktionen.</p>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait"><img src="/assets/team/leander.png" alt="Leander Heyken" /></div>
                <div className="tm-body">
                  <div className="role">Partner</div>
                  <h4>Leander Heyken</h4>
                  <p>Langjährige Erfahrung an der Schnittstelle von Investment und operativer Führung. Begleitet Unternehmer von der ersten Überlegung bis zur Umsetzung im Alltag.</p>
                </div>
              </div>
              <div className="tm rv rv-d3">
                <div className="portrait"><img src="/assets/team/amon.png" alt="Dr. Amon Göppert" /></div>
                <div className="tm-body">
                  <div className="role">Partner · Technologie</div>
                  <h4>Dr. Amon Göppert</h4>
                  <p>Forscher und Praktiker zugleich. Bringt akademische Tiefe aus Informatik und Engineering direkt in den Betrieb – und entwickelt technische Lösungen, die im Alltag funktionieren.</p>
                </div>
              </div>
            </div>
      
            {/* Zweite Reihe */}
            <div className="team-row-2">
              <div className="tm rv rv-d1">
                <div className="portrait"><img src="/assets/team/alex.jpeg" alt="Alexander Rien" /></div>
                <div className="tm-body">
                  <div className="role">Wertschöpfung</div>
                  <h4>Alexander Rien</h4>
                  <p>Erfahrung in operativer Führung und Prozessgestaltung. Arbeitet mit den Teams in den Unternehmen zusammen – damit Strategie im Tagesgeschäft ankommt.</p>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait"><img src="/assets/team/gerald.jpeg" alt="Gerald Weitbrecht" /></div>
                <div className="tm-body">
                  <div className="role">Origination &amp; BD</div>
                  <h4>Gerald Weitbrecht</h4>
                  <p>Jahrzehntelange Erfahrung im Vertrieb und in der Begleitung mittelständischer Unternehmen. Kennt die Menschen hinter den Unternehmen – und weiß, wann der richtige Moment für ein Gespräch ist.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* TEAM-PHILOSOPHIE */}
      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="s-tag rv">Team-Philosophie</div>
          <h2 className="display rv">Gemeinsam kaufen.<br />Gemeinsam <span className="bold">aufbauen.</span></h2>
          <div style={{ marginTop: "36px", maxWidth: "780px" }}>
            <p className="body-text rv" style={{ marginBottom: "18px" }}>Wir bringen kein Beraternetzwerk mit, das auf Abruf kommt. Unser Team kauft gemeinsam, baut gemeinsam und trägt gemeinsam Verantwortung – mit eigenem Kapital im Spiel.</p>
            <p className="body-text rv rv-d1">Investoren, Unternehmer und Technikexperten unter einem Dach – ein Team, das nicht auslagert, sondern selbst umsetzt.</p>
          </div>
          <div className="rv rv-d3" style={{ marginTop: "48px" }}>
            <a href="/kontakt" className="btn btn-light">Lassen Sie uns sprechen →</a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
