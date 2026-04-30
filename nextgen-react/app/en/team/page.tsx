export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">The people behind NextGen</div>
        <h1 className="display hero-title">
          <span className="hero-line">The team behind</span>
          <span className="hero-line"><span className="bold">NextGen.</span></span>
        </h1>
        <p className="hero-sub">Investoren, Unternehmer und Technikexperten – in einem Team, das gemeinsam kauft, aufbaut und Responsibility trägt. Mit eigenem Kapital im Spiel.</p>
      </section>
      
      {/* TEAM-GRID */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Partners & team</div>
          <h2 className="display rv">Investors, entrepreneurs, <span className="bold">and tech experts.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: "680px", marginTop: "24px" }}>Ein Team, das gemeinsam kauft, aufbaut und Wert schafft – mit voller Responsibility und eigenem Kapital.</p>
      
          <div className="team-grid">
            {/* Partner-Reihe */}
            <div className="team-row-3">
              <div className="tm rv rv-d1">
                <div className="portrait"><img src="/assets/team/max.jpeg" alt="Maximilian Göppert" /></div>
                <div className="tm-body">
                  <div className="role">Partner</div>
                  <h4>Maximilian Göppert</h4>
                  <p>Over twelve years of experience in the Mittelstand — from the first conversation well past closing. Thinks in relationships, not transactions.</p>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait"><img src="/assets/team/leander.png" alt="Leander Heyken" /></div>
                <div className="tm-body">
                  <div className="role">Partner</div>
                  <h4>Leander Heyken</h4>
                  <p>Long experience at the intersection of investment and operational leadership. Accompanies entrepreneurs from the first thought through execution in daily operations.</p>
                </div>
              </div>
              <div className="tm rv rv-d3">
                <div className="portrait"><img src="/assets/team/amon.png" alt="Dr. Amon Göppert" /></div>
                <div className="tm-body">
                  <div className="role">Partner · Technology</div>
                  <h4>Dr. Amon Göppert</h4>
                  <p>Researcher and practitioner at once. Brings academic depth from computer science and engineering directly into operations — and develops technical solutions that work in daily life.</p>
                </div>
              </div>
            </div>
      
            {/* Zweite Reihe */}
            <div className="team-row-2">
              <div className="tm rv rv-d1">
                <div className="portrait"><img src="/assets/team/alex.jpeg" alt="Alexander Rien" /></div>
                <div className="tm-body">
                  <div className="role">Value creation</div>
                  <h4>Alexander Rien</h4>
                  <p>Experience in operational leadership and process design. Works directly with the teams inside companies — so strategy actually lands in daily operations.</p>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait"><img src="/assets/team/gerald.jpeg" alt="Gerald Weitbrecht" /></div>
                <div className="tm-body">
                  <div className="role">Origination & BD</div>
                  <h4>Gerald Weitbrecht</h4>
                  <p>Decades of experience in sales and supporting Mittelstand companies. Knows the people behind the businesses — and knows when the right moment for a conversation is.</p>
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
          <div className="s-tag rv">Team philosophy</div>
          <h2 className="display rv">Buy together.<br />Build <span className="bold">together.</span></h2>
          <div style={{ marginTop: "36px", maxWidth: "780px" }}>
            <p className="body-text rv" style={{ marginBottom: "18px" }}>Wir bringen kein Beraternetzwerk mit, das auf Abruf kommt. Unser Team kauft gemeinsam, baut gemeinsam und trägt gemeinsam Responsibility – mit eigenem Kapital im Spiel.</p>
            <p className="body-text rv rv-d1">Investors, entrepreneurs, and tech experts under one roof — a team that doesn't outsource but executes itself.</p>
          </div>
          <div className="rv rv-d3" style={{ marginTop: "48px" }}>
            <a href="/en/kontakt" className="btn btn-light">Let's talk →</a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
