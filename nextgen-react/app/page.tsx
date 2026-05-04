import { Hero } from "@/components/ui/hero";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="DACH-Mittelstand · Business Services"
        title={
          <>
            <span className="hero-line">Wachstumskapital für Unternehmensgruppen</span>
            <span className="hero-line">im <span className="bold">Mittelstand.</span></span>
          </>
        }
        scrollTo="mission"
        ctas={
          <>
            <a href="/kontakt" className="btn btn-light">Lassen Sie uns sprechen →</a>
          </>
        }
      />

      <section id="mission" className="mission-section">
        <div className="mission-inner">
          <p className="rv rv-d1 mission-body">
            Unsere Mission bei NextGen Equity Partners ist der Aufbau von kleinen und mittleren{" "}
            <span className="bold">B2B-Dienstleistungsunternehmen im DACH-Raum</span> zu{" "}
            <span className="bold">skalierbaren Unternehmensgruppen als Marktführer</span>. Wir setzen{" "}
            <span className="bold">Wachstumskapital</span> ein, um damit die{" "}
            <span className="bold">Substanz des Mittelstands</span> zu stärken und durch{" "}
            <span className="bold">KI befähigte Wissensträger</span> in den Mittelpunkt zu stellen.
          </p>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="team"
        title={
          <>
            Wir sind: Beteiligungsprofis,
            <br />
            Technologieexperten, <span className="bold">Unternehmer.</span>
          </>
        }
        intro="Wir als Team verstehen sowohl den Aufbau von Unternehmensgruppen als Beteiligungsmanager, die Integration von Technologien im Mittelstand, als auch die operative Führung von Unternehmen."
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <article className="glass-card image-card rv rv-d1">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/max-bender-3rNvnnO7avY-unsplash.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>Zugang zu langfristigem Wachstumskapital</h3>
                <p>25+ Jahre kombinierte Erfahrung im Aufbau und der Betreuung von 20+ Unternehmensgruppen.</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d2">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/Wertsteigerung%20durch%20KI%20%26%20Digitalisierung.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>Wertsteigerung durch KI &amp; Digitalisierung</h3>
                <p>30+ Projekte zur Technologie-Integration im Mittelstand.</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d3">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/charlesdeluvio-rRWiVQzLm7k-unsplash.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>Operativer Einsatz als Führungskräfte</h3>
                <p>Erfahrung als Software- und KI-Unternehmer.</p>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="bare-section">
        <div className="bare-inner">
          <h2 className="display rv" style={{ maxWidth: 1100 }}>
            Das Team hinter <span className="bold">NextGen Equity.</span>
          </h2>
          <div className="team-grid">
            <div className="team-row-3">
              <div className="tm rv rv-d1">
                <div className="portrait">
                  <img src="/assets/team/max.jpeg" alt="Maximilian Göppert" />
                </div>
                <div className="tm-body">
                  <div className="role">Partner</div>
                  <h4>Maximilian Göppert</h4>
                  <p>15 Jahre Erfahrung in Beteiligungsmanagement und Buy &amp; Build.</p>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait">
                  <img src="/assets/team/leander.png" alt="Leander Heyken" />
                </div>
                <div className="tm-body">
                  <div className="role">Partner</div>
                  <h4>Leander Heyken</h4>
                  <p>20 Jahre Berufserfahrung, davon 12 Jahre in Beteiligungsmanagement.</p>
                </div>
              </div>
              <div className="tm rv rv-d3">
                <div className="portrait">
                  <img
                    src="/assets/team/ChatGPT%20Image%204.%20Mai%202026%2C%2014_25_22.png"
                    alt="Dr. Amon Göppert"
                  />
                </div>
                <div className="tm-body">
                  <div className="role">Partner</div>
                  <h4>Dr. Amon Göppert</h4>
                  <p>10 Jahre Erfahrung in der KI-Implementierung, davon 2 Jahre in Private Equity.</p>
                </div>
              </div>
            </div>
            <div className="team-row-2">
              <div className="tm rv rv-d1">
                <div className="portrait">
                  <img src="/assets/team/alex.jpeg" alt="Alexander Rien" />
                </div>
                <div className="tm-body">
                  <div className="role">Value Creation &amp; KI</div>
                  <h4>Alexander Rien</h4>
                  <p>8 Jahre Berufserfahrung in Consulting und Strategie.</p>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait">
                  <img src="/assets/team/gerald.jpeg" alt="Gerald Weitbrecht" />
                </div>
                <div className="tm-body">
                  <div className="role">Origination &amp; BD</div>
                  <h4>Gerald Weitbrecht</h4>
                  <p>8 Jahre Erfahrung in Start-ups &amp; Software.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        title={
          <>
            Wir suchen Unternehmen mit
            <br />
            <span className="bold">Wachstumspotential.</span>
          </>
        }
        intro="Für unsere Buy & Build Strategie suchen wir profitable Unternehmen im wissensintensiven B2B-Dienstleistungsbereich im DACH-Raum."
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <article className="glass-card image-card rv rv-d1">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/wachstumspotential_1.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>Wachstumsfähige Strukturen</h3>
                <p>Klare Strukturen und Prozesse in der Organisation der Unternehmen, die für KI-Integration und anorganisches Wachstum ausgelegt sind.</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d2">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/Ambitionierte%20Unternehmer.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>Ambitionierte Unternehmer</h3>
                <p>Unternehmer, die Fähigkeiten und Ambitionen für den Aufbau einer Gruppe mitbringen.</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d3">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/Unternehmen%20als%20Plattform.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>Unternehmen als Plattform</h3>
                <p>Wir suchen vorrangig Unternehmen als Plattform mit einem Umsatz von 10–100 Mio. €, sowie ergänzende Zukäufe als Add-ons ab 3 Mio. € Umsatz.</p>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="testimonial-section">
        <div className="testimonial-inner">
          <div className="testimonial-portrait rv">
            <img src="/assets/team/max.jpeg" alt="Maximilian Göppert" />
          </div>
          <p className="testimonial-quote rv rv-d1">
            „Ein Unternehmen zu übergeben ist eine der größten Entscheidungen im Leben eines Unternehmers. Wir wissen, was dabei auf dem Spiel steht.&#8220;
          </p>
          <div className="testimonial-attribution rv rv-d2">
            <div className="testimonial-name">Maximilian Göppert</div>
            <div className="testimonial-role">Partner</div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="ansatz"
        title={
          <>
            Wie wir unsere <span className="bold">Gruppen aufbauen.</span>
          </>
        }
        intro="Unsere Buy & Build Plattformstrategie fokussiert den Aufbau integrierter Gruppen: vom Nukleus bis zum Mittelstandsführer innerhalb von 5 Jahren."
        contentMaxWidth={1100}
      >
        <ol className="phase-list">
          <li className="phase-item rv rv-d1">
            <div className="phase-anim phase-anim-1" aria-hidden="true">
              <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
                <circle className="pa1-ring pa1-r3" cx="100" cy="60" r="20" />
                <circle className="pa1-ring pa1-r2" cx="100" cy="60" r="20" />
                <circle className="pa1-ring pa1-r1" cx="100" cy="60" r="20" />
                <circle className="pa1-orbit" cx="100" cy="60" r="34" />
                <circle className="pa1-core" cx="100" cy="60" r="14" />
                <circle className="pa1-orbiter" cx="134" cy="60" r="3.5" />
              </svg>
            </div>
            <div className="phase-index">01</div>
            <div className="phase-content">
              <div className="phase-when">Jahr 1</div>
              <h3 className="phase-title">Plattform</h3>
              <p className="phase-body">
                Akquisition eines etablierten Nukleus-Unternehmens mit ca. 300–500 FTE, das mit skalierbaren Strukturen als Fundament für anorganisches Wachstum dient.
              </p>
            </div>
          </li>
          <li className="phase-item rv rv-d2">
            <div className="phase-anim phase-anim-2" aria-hidden="true">
              <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
                <line className="pa2-link pa2-l1" x1="100" y1="60" x2="50"  y2="30" />
                <line className="pa2-link pa2-l2" x1="100" y1="60" x2="150" y2="30" />
                <line className="pa2-link pa2-l3" x1="100" y1="60" x2="50"  y2="90" />
                <line className="pa2-link pa2-l4" x1="100" y1="60" x2="150" y2="90" />
                <circle className="pa2-core" cx="100" cy="60" r="12" />
                <circle className="pa2-sat pa2-s1" r="6" />
                <circle className="pa2-sat pa2-s2" r="6" />
                <circle className="pa2-sat pa2-s3" r="6" />
                <circle className="pa2-sat pa2-s4" r="6" />
              </svg>
            </div>
            <div className="phase-index">02</div>
            <div className="phase-content">
              <div className="phase-when">Jahr 2–3</div>
              <h3 className="phase-title">Add-ons</h3>
              <p className="phase-body">
                Zukauf und Integration von 5 bis 10 Unternehmen, die strategisch zur Plattform passen — Wertschöpfungskette, Geographie, Ergänzung der Endmärkte. Zusätzliches Wachstum durch Gewinnung von Fachkräften, incentiviert über Unternehmensbeteiligungen.
              </p>
            </div>
          </li>
          <li className="phase-item rv rv-d3">
            <div className="phase-anim phase-anim-3" aria-hidden="true">
              <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
                <g className="pa3-net">
                  <line x1="100" y1="60" x2="40"  y2="30" />
                  <line x1="100" y1="60" x2="160" y2="30" />
                  <line x1="100" y1="60" x2="40"  y2="90" />
                  <line x1="100" y1="60" x2="160" y2="90" />
                  <line x1="100" y1="60" x2="100" y2="20" />
                  <line x1="100" y1="60" x2="100" y2="100" />
                  <line x1="40"  y1="30" x2="100" y2="20" />
                  <line x1="160" y1="30" x2="100" y2="20" />
                  <line x1="40"  y1="90" x2="100" y2="100" />
                  <line x1="160" y1="90" x2="100" y2="100" />
                  <line x1="40"  y1="30" x2="40"  y2="90" />
                  <line x1="160" y1="30" x2="160" y2="90" />
                </g>
                <circle className="pa3-core" cx="100" cy="60" r="10" />
                <circle className="pa3-sat" cx="40"  cy="30" r="5" />
                <circle className="pa3-sat" cx="160" cy="30" r="5" />
                <circle className="pa3-sat" cx="40"  cy="90" r="5" />
                <circle className="pa3-sat" cx="160" cy="90" r="5" />
                <circle className="pa3-sat" cx="100" cy="20" r="5" />
                <circle className="pa3-sat" cx="100" cy="100" r="5" />
                <circle className="pa3-pulse pa3-p1" r="3" />
                <circle className="pa3-pulse pa3-p2" r="3" />
                <circle className="pa3-pulse pa3-p3" r="3" />
                <circle className="pa3-pulse pa3-p4" r="3" />
                <circle className="pa3-pulse pa3-p5" r="3" />
              </svg>
            </div>
            <div className="phase-index">03</div>
            <div className="phase-content">
              <div className="phase-when">Jahr 3–5</div>
              <h3 className="phase-title">Integrierter Marktführer</h3>
              <p className="phase-body">
                Eine vollständig integrierte Gruppe mit rund 1.000 Mitarbeitenden. Add-ons sind operativ und kulturell eingegliedert, AI Use Cases umgesetzt und wertschöpfend im Einsatz.
              </p>
            </div>
          </li>
        </ol>
      </Section>

      <div className="sec-divider" />

      <Section
        title={
          <>
            Was eine starke Gruppe <span className="bold">möglich macht.</span>
          </>
        }
        contentMaxWidth={1100}
      >
        <div className="mehrwerte-layout">
          <div className="mehrwerte-img rv">
            <img
              src="/assets/photos/New%20photos/Was%20eine%20starke%20Gruppe%20m%C3%B6glich%20macht..jpg"
              alt="Starke Unternehmensgruppe"
            />
          </div>
          <div className="mehrwerte-cards">
            <GlassCard
              title="Attraktiver Arbeitgeber"
              body="Stärkere Arbeitgebermarke, neue Leitungsrollen und Zugang zu modernen Technologien — ein Umfeld, in dem Talente bleiben und sich entwickeln."
              delay={1}
            />
            <GlassCard
              title="Resiliente Strukturen"
              body="Mehr Marktdiversifikation, Balance zwischen Endmärkten und Kapazitäten. Eine zweite Führungsebene gibt der Gruppe organisatorische Tiefe."
              delay={2}
            />
            <GlassCard
              title="Neue Technologien"
              body="Zentrale Teams und gezielte Investitionen in Innovation und Digitalisierung — als gemeinsame Plattform für alle Standorte der Gruppe."
              delay={3}
            />
            <GlassCard
              title="Marktzugänge"
              body="Zugang zu Großprojekten und Ausschreibungen, die bestimmte Kapazitäten und Referenzen voraussetzen — als Gruppe erreichbar, einzeln oft nicht."
              delay={4}
            />
          </div>
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="testimonial-section">
        <div className="testimonial-inner">
          <div className="testimonial-portrait rv">
            <img
              src="/assets/team/ChatGPT%20Image%204.%20Mai%202026%2C%2014_25_22.png"
              alt="Dr. Amon Göppert"
            />
          </div>
          <p className="testimonial-quote rv rv-d1">
            „Digitalisierung ist bei uns kein Schlagwort, sondern handwerkliche Arbeit. Wir verankern sie dort, wo sie Marge, Geschwindigkeit und Kundennutzen messbar verändert — ohne den Charakter eines mittelständischen Unternehmens zu beschädigen."
          </p>
          <div className="testimonial-attribution rv rv-d2">
            <div className="testimonial-name">Dr. Amon Göppert</div>
            <div className="testimonial-role">Partner · KI &amp; Technologie</div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="technologie"
        title={
          <>
            Neue Technologien für
            <br />
            <span className="bold">Dienstleistungsunternehmen.</span>
          </>
        }
        intro="Wissensträger im Mittelstand sind das Rückgrat unserer Wirtschaft. KI verändert wissensintensive Dienstleistungen aktuell grundlegend — eine Chance, den Mittelstand durch neue Technologien zukunftsfähig zu machen. Wissensträger können sich auf das fokussieren, was wirklich Wert schafft: Kreativität, fachliche Analyse und Kundenverständnis."
        contentMaxWidth={1100}
      >
        <div className="tech-layout">
          <div className="tech-image rv">
            <img
              src="/assets/photos/New%20photos/Wertsteigerung%20durch%20KI%20%26%20Digitalisierung.jpg"
              alt=""
            />
          </div>
          <div className="tech-cards">
            <GlassCard
              title="Management"
              body="Mehr Transparenz für die Geschäftsführung: datenbasierte Entscheidungsgrundlagen, entlastete Engpass-Prozesse, ein klares Bild davon, was im Unternehmen wirklich passiert."
              delay={1}
            />
            <GlassCard
              title="Operatives Kerngeschäft"
              body="Tief im Tagesgeschäft, zugeschnitten auf die Branche und den Prozess: höhere Qualität, verfügbares Wissen, schnellere Planungs- und Umsetzungszyklen."
              delay={2}
            />
            <GlassCard
              title="Supportfunktionen"
              body="Backoffice entlastet, Risiko reduziert, mehr Zeit für das, was wirklich zählt."
              delay={3}
            />
          </div>
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        title={
          <>
            Umsetzung von <span className="bold">Nachhaltigkeit &amp; ESG.</span>
          </>
        }
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <GlassCard
            num="Environment"
            title="Operative Effizienz"
            body="Energiesparmaßnahmen und Dekarbonisierungs-Roadmaps werden in den Unternehmenszielen verankert."
            delay={1}
          />
          <GlassCard
            num="Social"
            title="Mitarbeiterorientierte Unternehmenskultur"
            body="Fachliche Weiterbildungen, Führungskräftetrainings und Programme für Mental Health und Arbeitssicherheit dienen einer mitarbeiterorientierten Unternehmenskultur."
            delay={2}
          />
          <GlassCard
            num="Governance"
            title="Verantwortung im Management"
            body="Die Vergütung des Managements wird unmittelbar an die ESG-Ziele gekoppelt, wodurch diese in der Unternehmensgovernance institutionalisiert werden."
            delay={3}
          />
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="kontakt-teaser-section">
        <div className="kontakt-teaser-inner">
          <h2 className="display rv rv-d1 kontakt-teaser-title">
            Lassen Sie uns über Ihr
            <br />
            <span className="bold">Unternehmen sprechen.</span>
          </h2>
          <p className="body-text rv rv-d2 kontakt-teaser-body">
            Ob Unternehmer, Geschäftsführer, Manager oder M&amp;A-Berater: wir freuen uns über ein erstes Gespräch mit Ihnen.
          </p>
          <div className="rv rv-d3 kontakt-teaser-cta">
            <a href="/kontakt" className="btn btn-light kontakt-teaser-btn">Gespräch vereinbaren →</a>
          </div>
        </div>
      </section>
    </>
  );
}
