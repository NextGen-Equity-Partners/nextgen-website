export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Who we are</div>
        <h1 className="display hero-title">
          <span className="hero-line">Investoren, die selbst</span>
          <span className="hero-line"><span className="bold">Responsibility tragen.</span></span>
        </h1>
        <p className="hero-sub">We come from investment, operational leadership, and technology development. From our own experience, we know what a Mittelstand owner spends their day on — and where most external partners miss the mark. Our capital is in it too.</p>
        <div className="hero-ctas">
          <a href="/en/team" className="btn btn-light">Meet the team →</a>
          <a href="/en/kontakt" className="btn btn-ghost">Let's talk</a>
        </div>
        <img className="hero-mark" src="/assets/logo-n.svg" alt="NextGen Equity" />
      </section>
      
      {/* 4 SÄULEN */}
      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">What we stand for</div>
              <h2 className="display rv">What we build on —<br />and how you can <span className="bold">measure us.</span></h2>
            </div>
            <div>
              <p className="body-text rv">NextGen Equity wurde von Menschen gegründet, die selbst in Unternehmen Responsibility getragen haben. Das prägt, wie wir mit Unternehmern und Teams umgehen: direkt, verlässlich, mit eigenem Kapital – und ohne die Distanz, die viele externe Partner mitbringen.</p>
            </div>
          </div>
          <div className="glass-grid cols-2">
            <div className="glass-card rv rv-d1">
              <div className="num">Kapital</div>
              <div>
                <h3>Eigenes Kapital</h3>
                <p>Wir investieren mit eigenem Geld – nicht mit dem Geld anderer. Das verändert, wie man Entscheidungen trifft.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d2">
              <div className="num">Technologie</div>
              <div>
                <h3>Digitale Kompetenz im eigenen Haus</h3>
                <p>Wir haben ein eigenes Team für Digitalisierung und Automatisierung – keine externen Berater, die einmalig vorbeikommen. Die Expertise bleibt im Unternehmen.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d1">
              <div className="num">Strategie</div>
              <div>
                <h3>Gruppen mit Substanz</h3>
                <p>Wir bauen Unternehmensgruppen, die in ihrer Branche wachsen – durch organisches Wachstum und gezielte Zukäufe, die strategisch Sinn ergeben.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d2">
              <div className="num">Kultur</div>
              <div>
                <h3>Wer ein Lebenswerk übergibt, verdient einen Partner, der das versteht.</h3>
                <p>Wir investieren in Locatione, Teams und Strukturen – nicht, weil es gut klingt, sondern weil es die Grundlage für alles andere ist.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* GRÜNDUNGSSTORY */}
      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">Why we do this</div>
              <h2 className="display rv">The conviction <span className="bold">behind it.</span></h2>
            </div>
            <div>
              <p className="body-text rv" style={{ marginBottom: "18px" }}>We have learned the Mittelstand from three perspectives: as investor, as executive, and from technology development. What we keep encountering: companies with a strong core — and entrepreneurs who lack a partner that truly understands what it looks like inside.</p>
              <p className="body-text rv rv-d1" style={{ marginBottom: "18px" }}>Classic consulting too often stays on the surface. Capital partners deliver money, but rarely the operational support when it counts. And digitalization is promised, but seldom lands where it actually changes margin or speed.</p>
              <p className="body-text rv rv-d2" style={{ marginBottom: "18px" }}>NextGen Equity emerged from this picture: a partner that works alongside the company — with its own capital, its own experience from running businesses, and an in-house team for digitalization. Not above it.</p>
              <p className="body-text rv rv-d3">We don't want to be the next buyer in a sequence — we want to be the place entrepreneurs and managers think of when they seriously consider what comes next for their company.</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* WERTE */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Our values</div>
          <h2 className="display rv">What you can <span className="bold">expect from a partner.</span></h2>
          <div className="glass-grid cols-3">
            <div className="glass-card rv rv-d1">
              <div className="num">01 · Trust</div>
              <div>
                <h3>On equal terms.</h3>
                <p>We talk straight, listen, and lay out early what works and what doesn't. Trust comes from transparency, not from grand statements.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d2">
              <div className="num">02 · Reliability</div>
              <div>
                <h3>What we say, holds.</h3>
                <p>Clear valuation, clear structures, clear roadmap — and we stay with it, even when the process gets difficult. No surprises just before closing.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d3">
              <div className="num">03 · Responsibility</div>
              <div>
                <h3>Für Menschen und Substanz.</h3>
                <p>Responsibility für das Team, für die Locatione, für die Kunden – und für die langfristige Wettbewerbsfähigkeit des Unternehmens, nicht nur für die nächste Kennzahl.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* ESG */}
      <section className="pane">
        <div className="pane-inner">
          <div className="twocol" style={{ alignItems: "center" }}>
            <div>
              <div className="s-tag rv">Responsibility</div>
              <h2 className="display rv">Responsibilitysvolles <span className="bold">Investieren.</span></h2>
              <div className="tag-list rv rv-d2">
                <span className="tag">Long-term partnerships</span>
                <span className="tag">People at the center</span>
                <span className="tag">Responsibilitysvolle Unternehmensführung</span>
              </div>
            </div>
            <div>
              <p className="body-text rv rv-d1">Nachhaltigkeit ist für uns keine Pflichtübung, sondern Teil dessen, wie wir Unternehmen führen wollen. Wir investieren langfristig in Menschen, Locatione und Strukturen – und berücksichtigen soziale und ökologische Gesichtspunkte als selbstverständlichen Teil unserer Arbeit. Starke Arbeitgeber sind verlässliche Arbeitgeber.</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* VISION */}
      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="s-tag rv">Where we are going</div>
          <h2 className="display rv">Companies <span className="bold">people know.</span></h2>
          <div className="glass-grid cols-2">
            <div className="glass-card rv rv-d1">
              <div className="num">Mid-term · 5 years</div>
              <div>
                <h3>Visible work in the DACH Mittelstand.</h3>
                <p>A handful of companies in Business Services that have grown under our roof, transformed, and made a clear step forward in their market.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d2">
              <div className="num">Long-term · 10+ years</div>
              <div>
                <h3>A trusted address.</h3>
                <p>A partner that entrepreneurs and managers in the Mittelstand think of when they consider growth, succession, or the next step.</p>
              </div>
            </div>
          </div>
          <div className="rv rv-d3" style={{ marginTop: "48px" }}>
            <a href="/en/team" className="btn btn-light">Meet the team →</a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
