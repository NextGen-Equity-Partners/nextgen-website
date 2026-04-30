export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Differenzierung · Technologie · Wertschöpfung</div>
        <h1 className="display hero-title">
          <span className="hero-line">Digitalisierung,</span>
          <span className="hero-line">die im <span className="bold">Betrieb ankommt.</span></span>
        </h1>
        <p className="hero-sub">Ob und wie ein Mittelständler digitale Werkzeuge in sein Geschäft integriert, wird in den nächsten Jahren einen spürbaren Unterschied machen – in der Marge, in der Geschwindigkeit, in der Attraktivität als Arbeitgeber. Wir beschäftigen uns seit Jahren ernsthaft damit, wie das in der Praxis gelingt.</p>
        <img className="hero-mark" src="/assets/logo-n.svg" alt="NextGen Equity" />
      </section>
      
      {/* DIFFERENZIERUNG + TABELLE */}
      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">Unser Ansatz</div>
              <h2 className="display rv">Ein eigenes Team. <span className="bold">Direkt im Betrieb.</span></h2>
              <p className="body-text rv rv-d1" style={{ marginTop: "24px", marginBottom: "18px" }}>Wir haben ein eigenes Team aus Technikern und Entwicklern, das direkt in den Unternehmen unserer Gruppe arbeitet. Keine externen Berater, die einen Bericht liefern und gehen. Die gleichen Menschen, die eine Lösung entwickeln, setzen sie auch um – und bleiben, bis sie im Alltag funktioniert.</p>
              <p className="body-text rv rv-d2">Unsere technische Expertise bauen wir intern auf und setzen sie in den Unternehmen ein. Eine Kombination, die im DACH-Mittelstand selten ist.</p>
            </div>
            <div className="cmp-grid" style={{ gridTemplateColumns: "1fr", gap: "14px", marginTop: "0" }}>
              <article className="cmp-card rv rv-d1">
                <div className="cmp-num">01</div>
                <h3 className="cmp-headline">Technische Prüfung<br />mit eigenen Werkzeugen.</h3>
                <p className="cmp-counter"><span className="cmp-vs">Wir verstehen ein Unternehmen auch von innen</span> – wie die Prozesse laufen, wo Digitalisierung wirklich greift und wo sie keinen Sinn ergibt.</p>
              </article>
              <article className="cmp-card rv rv-d2">
                <div className="cmp-num">02</div>
                <h3 className="cmp-headline">Im Tagesgeschäft verankert.<br />Messbar.</h3>
                <p className="cmp-counter"><span className="cmp-vs">Kein Buzzword</span>, keine Präsentation, die im Regal steht. Konkrete Umsetzung, direkt in den Abläufen des Unternehmens.</p>
              </article>
              <article className="cmp-card rv rv-d3">
                <div className="cmp-num">03</div>
                <h3 className="cmp-headline">Tiefe statt<br />Breite.</h3>
                <p className="cmp-counter"><span className="cmp-vs">Wir konzentrieren uns auf wenige Branchen</span>, die wir wirklich kennen – statt als Generalist in vielen Bereichen oberflächlich zu bleiben.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* 3 KERNBEREICHE */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Wo Digitalisierung wirkt</div>
          <h2 className="display rv">Drei Bereiche, in denen wir <span className="bold">konkret ansetzen.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: "700px", marginTop: "24px" }}>Statt Digitalisierung als Schlagwort über ein Unternehmen zu legen, arbeiten wir auf drei klar getrennten Ebenen – jede mit eigenem Fokus und messbaren Ergebnissen.</p>
      
          <div className="aaa-diagram">
      
            {/* Management Level */}
            <div className="aaa-row management rv rv-d1">
              <div className="aaa-label">
                <div className="num">01 · Management</div>
                <h3>Steuerung und Überblick</h3>
                <p>Datenbasierte Entscheidungen statt Bauchgefühl – ein klares Bild davon, was im Unternehmen wirklich passiert.</p>
              </div>
              <div className="aaa-tools">
                <div className="aaa-tool">
                  <div className="tool-name">Reporting</div>
                  <div className="tool-desc">Integrierte, automatisierte BI über Finance, HR &amp; CRM hinweg.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">AI Finance Forecasting</div>
                  <div className="tool-desc">Prognosen für Cashflow, Auftragseingang und Kapazitäten.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">CPQ Terminal</div>
                  <div className="tool-desc">KI-gestützte, schnelle Angebotserstellung.</div>
                </div>
              </div>
              <div className="aaa-outcomes">
                <div className="aaa-outcomes-label">Ergebnis</div>
                <ul>
                  <li>Mehr Transparenz</li>
                  <li>Datenbasierte Entscheidungen</li>
                  <li>Engpass-Prozesse entlastet</li>
                </ul>
              </div>
            </div>
      
            {/* Core Operations Level */}
            <div className="aaa-row core rv rv-d2">
              <div className="aaa-label">
                <div className="num">02 · Core Operations</div>
                <h3>Im Kerngeschäft</h3>
                <p>Tief im Tagesgeschäft – zugeschnitten auf Branche und Prozess. Höhere Qualität, schnellere Zyklen.</p>
              </div>
              <div className="aaa-tools">
                <div className="aaa-tool">
                  <div className="tool-name">Generative Routing</div>
                  <div className="tool-desc">GenAI-Routing technischer Infrastruktur (Beispiel: Bauplanung).</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">NormCheck</div>
                  <div className="tool-desc">Abgleich mit Normen und Standards in Planungsdokumenten.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">Audit Copilot</div>
                  <div className="tool-desc">KI-gestützte Audit-Planung und Reporting-Engine.</div>
                </div>
              </div>
              <div className="aaa-outcomes">
                <div className="aaa-outcomes-label">Ergebnis</div>
                <ul>
                  <li>Höhere Output-Qualität</li>
                  <li>Wissen verfügbar gemacht</li>
                  <li>Schnellere Planungs- und Ausführungszyklen</li>
                </ul>
              </div>
            </div>
      
            {/* Support Functions Level */}
            <div className="aaa-row support rv rv-d3">
              <div className="aaa-label">
                <div className="num">03 · Support Functions</div>
                <h3>Querschnittsfunktionen</h3>
                <p>Backoffice entlastet, Risiko reduziert, mehr Zeit für das, was wirklich zählt.</p>
              </div>
              <div className="aaa-tools">
                <div className="aaa-tool">
                  <div className="tool-name">Procurement &amp; Tendering</div>
                  <div className="tool-desc">Automatisches Screening und Bewertung durch KI-Agenten.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">Contract Management</div>
                  <div className="tool-desc">KI-gestütztes Drafting, Review und Tracking von Verträgen.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">Website &amp; Marketing</div>
                  <div className="tool-desc">Automatisierte Erstellung von SEO-Content und Outreach.</div>
                </div>
              </div>
              <div className="aaa-outcomes">
                <div className="aaa-outcomes-label">Ergebnis</div>
                <ul>
                  <li>Backoffice entlastet</li>
                  <li>Risiko reduziert</li>
                  <li>Mehr Zeit für Kernaufgaben</li>
                </ul>
              </div>
            </div>
      
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* ZITAT + CTA */}
      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner amon-quote-grid">
          <div className="amon-portrait-block rv">
            <img className="kontakt-portrait" src="/assets/team/amon.png" alt="Dr. Amon Göppert" />
            <div className="amon-name">Dr. Amon Göppert</div>
            <div className="amon-role">Partner Technologie · NextGen Equity</div>
          </div>
          <div className="quote bare rv rv-d1">
            <p>Digitalisierung ist bei uns kein Schlagwort, sondern <strong>handwerkliche Arbeit</strong>. Wir verankern sie dort, wo sie <strong>Marge, Geschwindigkeit und Kundennutzen</strong> messbar verändert – ohne den Charakter eines <strong>mittelständischen Unternehmens</strong> zu beschädigen.</p>
          </div>
        </div>
        <div className="rv rv-d2" style={{ marginTop: "48px", textAlign: "center" }}>
          <a href="/kontakt" className="btn btn-light">Lassen Sie uns sprechen →</a>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
