export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Wer wir sind</div>
        <h1 className="display hero-title">
          <span className="hero-line">Investoren, die selbst</span>
          <span className="hero-line"><span className="bold">Verantwortung tragen.</span></span>
        </h1>
        <p className="hero-sub">Wir kommen aus Investment, operativer Führung und Technologieentwicklung. Wir wissen aus eigener Erfahrung, womit ein Mittelständler seinen Tag verbringt – und wo die meisten externen Partner an der Realität vorbeigehen. Unser Kapital steckt mit drin.</p>
        <div className="hero-ctas">
          <a href="/team" className="btn btn-light">Das Team treffen →</a>
          <a href="/kontakt" className="btn btn-ghost">Lassen Sie uns sprechen</a>
        </div>
      </section>
      
      {/* 4 SÄULEN */}
      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">Wofür wir stehen</div>
              <h2 className="display rv">Worauf wir aufbauen<br />– und woran man uns<br /><span className="bold">messen darf.</span></h2>
            </div>
            <div>
              <p className="body-text rv">NextGen Equity wurde von Menschen gegründet, die selbst in Unternehmen Verantwortung getragen haben. Das prägt, wie wir mit Unternehmern und Teams umgehen: direkt, verlässlich, mit eigenem Kapital – und ohne die Distanz, die viele externe Partner mitbringen.</p>
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
                <p>Wir investieren in Standorte, Teams und Strukturen – nicht, weil es gut klingt, sondern weil es die Grundlage für alles andere ist.</p>
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
              <div className="s-tag rv">Warum wir das tun</div>
              <h2 className="display rv">Die Überzeugung <span className="bold">dahinter.</span></h2>
            </div>
            <div>
              <p className="body-text rv" style={{ marginBottom: "18px" }}>Wir haben den Mittelstand aus drei Perspektiven kennengelernt: als Investor, als Führungskraft und aus der Technologieentwicklung. Was uns dabei immer wieder begegnet ist: Unternehmen mit starkem Kern – und Unternehmer, denen ein Partner fehlt, der wirklich versteht, wie es im Betrieb aussieht.</p>
              <p className="body-text rv rv-d1" style={{ marginBottom: "18px" }}>Klassische Beratung bleibt zu oft an der Oberfläche. Kapitalpartner liefern Geld, aber selten die operative Unterstützung, wenn es darauf ankommt. Und Digitalisierung wird versprochen, landet aber selten dort, wo sie Marge oder Geschwindigkeit tatsächlich verändert.</p>
              <p className="body-text rv rv-d2" style={{ marginBottom: "18px" }}>Aus diesem Bild heraus ist NextGen Equity entstanden: ein Partner, der mit eigenem Kapital, eigener Erfahrung aus der Unternehmensführung und einem internen Team für Digitalisierung direkt an der Seite des Unternehmens arbeitet – nicht über ihm.</p>
              <p className="body-text rv rv-d3">Wir wollen nicht der nächste Käufer in einer Reihe sein, sondern die Adresse, an die Unternehmer und Manager denken, wenn sie ernsthaft darüber nachdenken, wie es mit ihrer Firma weitergeht.</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* WERTE */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Unsere Werte</div>
          <h2 className="display rv">Was Sie von einem Partner<br /><span className="bold">erwarten dürfen.</span></h2>
          <div className="glass-grid cols-3">
            <div className="glass-card rv rv-d1">
              <div className="num">01 · Vertrauen</div>
              <div>
                <h3>Auf Augenhöhe.</h3>
                <p>Wir reden Klartext, hören zu und legen früh offen, was geht und was nicht. Vertrauen entsteht durch Transparenz, nicht durch große Worte.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d2">
              <div className="num">02 · Verlässlichkeit</div>
              <div>
                <h3>Was wir sagen, gilt.</h3>
                <p>Klare Bewertung, klare Strukturen, klarer Fahrplan – und wir bleiben dabei, auch wenn es im Prozess schwierig wird. Keine Überraschungen kurz vor dem Abschluss.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d3">
              <div className="num">03 · Verantwortung</div>
              <div>
                <h3>Für Menschen und Substanz.</h3>
                <p>Verantwortung für das Team, für die Standorte, für die Kunden – und für die langfristige Wettbewerbsfähigkeit des Unternehmens, nicht nur für die nächste Kennzahl.</p>
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
              <div className="s-tag rv">Verantwortung</div>
              <h2 className="display rv">Verantwortungsvolles <span className="bold">Investieren.</span></h2>
              <div className="tag-list rv rv-d2">
                <span className="tag">Langfristige Partnerschaften</span>
                <span className="tag">Mitarbeiter im Mittelpunkt</span>
                <span className="tag">Verantwortungsvolle Unternehmensführung</span>
              </div>
            </div>
            <div>
              <p className="body-text rv rv-d1">Nachhaltigkeit ist für uns keine Pflichtübung, sondern Teil dessen, wie wir Unternehmen führen wollen. Wir investieren langfristig in Menschen, Standorte und Strukturen – und berücksichtigen soziale und ökologische Gesichtspunkte als selbstverständlichen Teil unserer Arbeit. Starke Arbeitgeber sind verlässliche Arbeitgeber.</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* VISION */}
      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="s-tag rv">Wo wir hinwollen</div>
          <h2 className="display rv">Unternehmen, die <span className="bold">man kennt.</span></h2>
          <div className="glass-grid cols-2">
            <div className="glass-card rv rv-d1">
              <div className="num">Mittelfristig · 5 Jahre</div>
              <div>
                <h3>Sichtbare Arbeit im DACH-Mittelstand.</h3>
                <p>Eine Handvoll Unternehmen in Business Services, die unter unserem Dach gewachsen sind, sich verändert haben und im Markt einen klaren Schritt nach vorne gemacht haben.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d2">
              <div className="num">Langfristig · 10+ Jahre</div>
              <div>
                <h3>Eine Adresse, der man vertraut.</h3>
                <p>Ein Partner, an den Unternehmer und Manager im Mittelstand denken, wenn sie über Wachstum, Nachfolge oder den nächsten Schritt nachdenken.</p>
              </div>
            </div>
          </div>
          <div className="rv rv-d3" style={{ marginTop: "48px" }}>
            <a href="/team" className="btn btn-light">Das Team treffen →</a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
