import { NeuralNet } from "@/components/three/neural-net";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <NeuralNet />
        <div className="hero-eyebrow">DACH-Mittelstand · Business Services</div>
        <h1 className="display hero-title">
          <span className="hero-line">Ihr Partner für Mehrheitsbeteiligungen</span>
          <span className="hero-line">im <span className="bold">Mittelstand.</span></span>
        </h1>
        <p className="hero-sub">
          Wir erwerben Mehrheitsbeteiligungen an gesunden Unternehmen im Bereich Business Services und entwickeln sie gemeinsam mit dem bestehenden Team weiter – mit eigenem Kapital, langfristigem Horizont und einem Team, das kauft, führt und umsetzt.
        </p>
        <div className="hero-ctas">
          <a href="/kontakt" className="btn btn-light">Lassen Sie uns sprechen →</a>
          <a href="/profil" className="btn btn-ghost">Über uns</a>
        </div>
        <img className="hero-mark" src="/assets/logo-n.svg" alt="NextGen Equity" />
        <a href="#wer-wir-sind" className="hero-scroll" aria-label="Scrollen">
          <div className="mouse"><div className="wheel"></div></div>
        </a>
      </section>

      {/* WER WIR SIND */}
      <section className="pane" id="wer-wir-sind">
        <div className="pane-inner">
          <div className="s-tag rv">Wer wir sind</div>
          <h2 className="display rv" style={{ maxWidth: 1100 }}>Was Sie aufgebaut haben,<br /><span className="bold">soll bleiben.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: 980, marginTop: 32, fontSize: 17, lineHeight: 1.75 }}>
            NextGen Equity ist ein kleines Team aus München – Investoren, Unternehmer und Technikexperten. Wir übernehmen mittelständische Unternehmen in Business Services und arbeiten gemeinsam mit dem bestehenden Team daran weiter. Nicht auf Zeit, nicht auf Exit. Das Unternehmen soll nach uns stärker dastehen.
          </p>

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

      {/* WHITE SLOGAN BREAK */}
      <section className="slogan-break">
        <div className="slogan-inner">
          <p className="rv">Wir bleiben –<br /><span className="bold">auch nach dem Closing.</span></p>
        </div>
      </section>

      <div className="sec-divider"></div>

      {/* WAS WIR SUCHEN */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Was wir suchen</div>
          <h2 className="display rv" style={{ maxWidth: 1100 }}>Unternehmen mit Substanz –<br /><span className="bold">und Wachstum vor sich.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: 980, marginTop: 32, fontSize: 17, lineHeight: 1.75 }}>
            Wir suchen profitable Unternehmen im Bereich Business und Professional Services – mit stabilem Geschäftsmodell, verlässlichen Umsätzen und einem Markt, der noch Spielraum lässt. Die Branche ist zweitrangig; die Substanz zählt.
          </p>

          <div className="glass-grid cols-3">
            <div className="glass-card rv rv-d1">
              <div className="num">Profil</div>
              <div>
                <h3>Beziehung und Vertrauen</h3>
                <p>Branchen, in denen die Kundenbeziehung zählt, in denen Erfahrung und Verlässlichkeit den Ausschlag geben – und in denen ein Zusammenwachsen mehrerer Unternehmen echten Sinn ergibt.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d2">
              <div className="num">Umsatz</div>
              <div>
                <h3>10–100 Mio. € Umsatz</h3>
                <p>Etablierte Unternehmen mit stabilem Geschäft als Kern. Ergänzende Zukäufe ab 3 Mio. € Umsatz.</p>
              </div>
            </div>
            <div className="glass-card rv rv-d3">
              <div className="num">Region</div>
              <div>
                <h3>Deutschland, Österreich, Schweiz</h3>
                <p>Unternehmen, die etwas aufgebaut haben – und mit dem richtigen Partner die nächste Phase angehen wollen.</p>
              </div>
            </div>
          </div>

          <p className="rv" style={{ marginTop: 32, fontSize: 11.5, color: "var(--mute)", letterSpacing: ".16em", textAlign: "center", textTransform: "uppercase" }}>
            Partnerschaftlich · Langfristig · Mit eigenem Kapital
          </p>
        </div>
      </section>

      {/* STORY BREAK */}
      <section className="story-break">
        <div className="story-break-inner">
          <div className="eyebrow rv">Unser Suchprofil</div>
          <q className="rv rv-d1"><span className="accent">10–100 Mio. €</span> Plattform-Umsatz.<br />Add-ons ab <span className="accent">3 Mio. €.</span> DACH-weit.</q>
          <div className="signature rv rv-d2">Buy-and-Build in Business Services</div>
        </div>
      </section>

      {/* UNSER ANSATZ */}
      <section className="pane">
        <div className="pane-inner">
          <div className="twocol" style={{ alignItems: "start" }}>
            <div>
              <div className="s-tag rv">Unser Ansatz</div>
              <h2 className="display rv">Wie wir<br /><span className="bold">zusammenarbeiten.</span></h2>
              <p className="body-text rv rv-d1" style={{ marginTop: 24, maxWidth: "44ch" }}>
                Wir nehmen uns Zeit, bevor wir Einschätzungen abgeben – und sind verbindlich, sobald beide Seiten weitermachen wollen. Kein Bieterwettbewerb, keine Überraschungen.
              </p>
              <div className="rv rv-d2" style={{ marginTop: 32 }}>
                <a href="/ansatz" className="btn btn-ghost">So arbeiten wir →</a>
              </div>
            </div>
            <div className="glass-grid cols-2" style={{ marginTop: 42 }}>
              <div className="glass-card rv rv-d1">
                <div className="num">01</div>
                <div>
                  <h3>Kennenlernen</h3>
                  <p>Erstgespräch und erste Einschätzung. Wir verstehen Geschäftsmodell, Zahlen und Perspektive – und sagen früh, wenn wir nicht der richtige Partner sind.</p>
                </div>
              </div>
              <div className="glass-card rv rv-d2">
                <div className="num">02</div>
                <div>
                  <h3>Kooperieren</h3>
                  <p>Strukturierte Prüfung, klare Bewertung, verbindliche Konditionen. Kein Bieterwettbewerb, keine Überraschungen kurz vor dem Abschluss.</p>
                </div>
              </div>
              <div className="glass-card rv rv-d3">
                <div className="num">03</div>
                <div>
                  <h3>Aufbauen</h3>
                  <p>Gemeinsamer Plan für die ersten Monate: organisches Wachstum, gezielte Zukäufe, Digitalisierung im Tagesgeschäft – umgesetzt mit dem bestehenden Team.</p>
                </div>
              </div>
              <div className="glass-card rv rv-d4">
                <div className="num">04</div>
                <div>
                  <h3>Begleiten</h3>
                  <p>Langfristige Partnerschaft mit klarem Reporting, operativer Unterstützung und einem Netzwerk, das mit der Gruppe wächst.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      {/* KONTAKT TEASER */}
      <section className="pane kontakt-teaser-pane" style={{ textAlign: "center", padding: "clamp(40px,6vw,76px) 48px" }}>
        <div className="pane-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img className="kontakt-portrait rv" src="/assets/team/max.jpeg" alt="Maximilian Göppert" />
          <div className="s-tag rv rv-d1">Nächster Schritt</div>
          <h2 className="display rv rv-d1" style={{ maxWidth: 880, margin: "0 auto" }}>
            Lassen Sie uns über Ihr<br /><span className="bold">Unternehmen sprechen.</span>
          </h2>
          <p className="body-text rv rv-d2" style={{ marginTop: 24, maxWidth: "58ch", marginLeft: "auto", marginRight: "auto" }}>
            Ob Unternehmer, Geschäftsführer oder M&amp;A-Berater – wir sind offen für ein vertrauliches Gespräch. Diskretion und Verbindlichkeit sind selbstverständlich.
          </p>
          <div className="rv rv-d3" style={{ marginTop: 36 }}>
            <a href="/kontakt" className="btn btn-light" style={{ fontSize: 14, padding: "16px 36px" }}>Unverbindliches Gespräch vereinbaren →</a>
          </div>
        </div>
      </section>
    </>
  );
}
