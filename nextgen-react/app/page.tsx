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
          <div className="s-tag rv">Mission</div>
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
        eyebrow="Team"
        title={
          <>
            Wir sind: Beteiligungsprofis, Technologieexperten,
            <br />
            <span className="bold">Unternehmer.</span>
          </>
        }
        intro="Wir als Team verstehen sowohl den Aufbau von Unternehmensgruppen als Beteiligungsmanager, die Integration von Technologien im Mittelstand, als auch die operative Führung von Unternehmen."
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <GlassCard
            num="Beteiligungsmanagement"
            icon="handshake"
            title="Zugang zu langfristigem Wachstumskapital"
            body="25+ Jahre kombinierte Erfahrung im Aufbau und der Betreuung von 20+ Unternehmensgruppen."
            delay={1}
          />
          <GlassCard
            num="Technologieintegration"
            icon="cpu"
            title="Wertsteigerung durch KI & Digitalisierung"
            body="30+ Projekte zur Technologie-Integration im Mittelstand."
            delay={2}
          />
          <GlassCard
            num="Unternehmensführung"
            icon="users"
            title="Operativer Einsatz als Führungskräfte"
            body="Erfahrung als Software- und KI-Unternehmer."
            delay={3}
          />
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        eyebrow="Zielunternehmen"
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
          <GlassCard
            num="01"
            icon="layers"
            title="Wachstumsfähige Strukturen"
            body="Klare Strukturen und Prozesse in der Organisation der Unternehmen, die für KI-Integration und anorganisches Wachstum ausgelegt sind."
            delay={1}
          />
          <GlassCard
            num="02"
            icon="spark"
            title="Ambitionierte Unternehmer"
            body="Unternehmer, die Fähigkeiten und Ambitionen für den Aufbau einer Gruppe mitbringen."
            delay={2}
          />
          <GlassCard
            num="03"
            icon="target"
            title="Unternehmen als Plattform"
            body="Wir suchen vorrangig Unternehmen als Plattform mit einem Umsatz von 10–100 Mio. €, sowie ergänzende Zukäufe als Add-ons ab 3 Mio. € Umsatz."
            delay={3}
          />
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        eyebrow="Unser Ansatz · Langfristig und themenbasiert"
        title={
          <>
            Wie wir unsere
            <br />
            <span className="bold">Gruppen aufbauen.</span>
          </>
        }
        intro="Unsere Buy & Build Plattformstrategie fokussiert den Aufbau integrierter Gruppen: vom Nukleus bis zum Mittelstandsführer innerhalb von 5 Jahren."
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <GlassCard
            num="Phase 1 · Jahr 1"
            icon="flag"
            title="Plattform"
            body="Akquisition eines etablierten Nukleus-Unternehmens mit ca. 300–500 FTE, das mit skalierbaren Strukturen als Fundament für anorganisches Wachstum dient."
            delay={1}
          />
          <GlassCard
            num="Phase 2 · Jahr 2–3"
            icon="plus"
            title="Add-ons"
            body="Zukauf und Integration von 5 bis 10 Unternehmen, die strategisch zur Plattform passen — Wertschöpfungskette, Geographie, Ergänzung der Endmärkte. Zusätzliches Wachstum durch Gewinnung von Fachkräften aus dem Wettbewerbsumfeld, incentiviert über Unternehmensbeteiligungen."
            delay={2}
          />
          <GlassCard
            num="Phase 3 · Jahr 3–5"
            icon="horizon"
            title="Integrierter Marktführer"
            body="Eine vollständig integrierte Gruppe mit rund 1.000 Mitarbeitenden. Add-ons sind operativ und kulturell eingegliedert, AI Use Cases umgesetzt und wertschöpfend im Einsatz."
            delay={3}
          />
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        eyebrow="Mehrwerte einer Unternehmensgruppe"
        title={
          <>
            Was eine starke Gruppe
            <br />
            <span className="bold">möglich macht.</span>
          </>
        }
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-2">
          <GlassCard
            num="01"
            icon="users"
            title="Attraktiver Arbeitgeber"
            body="Stärkere Arbeitgebermarke, neue Leitungsrollen und Zugang zu modernen Technologien — ein Umfeld, in dem Talente bleiben und sich entwickeln."
            delay={1}
          />
          <GlassCard
            num="02"
            icon="shield"
            title="Resiliente Strukturen"
            body="Mehr Marktdiversifikation, Balance zwischen Endmärkten und Kapazitäten. Eine zweite Führungsebene gibt der Gruppe organisatorische Tiefe."
            delay={2}
          />
          <GlassCard
            num="03"
            icon="cpu"
            title="Neue Technologien"
            body="Zentrale Teams und gezielte Investitionen in Innovation und Digitalisierung — als gemeinsame Plattform für alle Standorte der Gruppe."
            delay={1}
          />
          <GlassCard
            num="04"
            icon="globe"
            title="Marktzugänge"
            body="Zugang zu Großprojekten und Ausschreibungen, die bestimmte Kapazitäten und Referenzen voraussetzen — als Gruppe erreichbar, einzeln oft nicht."
            delay={2}
          />
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        eyebrow="Differenzierung · Technologie · Wertschöpfung"
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
        <div className="glass-grid cols-3">
          <GlassCard
            num="01"
            icon="chart"
            title="Management"
            body="Mehr Transparenz für die Geschäftsführung: datenbasierte Entscheidungsgrundlagen, entlastete Engpass-Prozesse, ein klares Bild davon, was im Unternehmen wirklich passiert."
            delay={1}
          />
          <GlassCard
            num="02"
            icon="layers"
            title="Operatives Kerngeschäft"
            body="Tief im Tagesgeschäft, zugeschnitten auf die Branche und den Prozess: höhere Qualität, verfügbares Wissen, schnellere Planungs- und Umsetzungszyklen."
            delay={2}
          />
          <GlassCard
            num="03"
            icon="shield"
            title="Supportfunktionen"
            body="Backoffice entlastet, Risiko reduziert, mehr Zeit für das, was wirklich zählt."
            delay={3}
          />
        </div>
        <p className="body-text rv rv-d2 section-intro" style={{ marginTop: 40 }}>
          Digitalisierung ist bei uns kein Schlagwort, sondern handwerkliche Arbeit. Wir verankern sie dort, wo sie Marge, Geschwindigkeit und Kundennutzen messbar verändert — ohne den Charakter eines mittelständischen Unternehmens zu beschädigen.
        </p>
        <div className="rv rv-d3" style={{ marginTop: 28 }}>
          <a href="/kontakt" className="btn btn-light">Lassen Sie uns sprechen →</a>
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        eyebrow="Partner & Team"
        title={
          <>
            Das Team hinter
            <br />
            <span className="bold">NextGen Equity.</span>
          </>
        }
        contentMaxWidth={1100}
      >
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
      </Section>

      <div className="sec-divider" />

      <Section
        eyebrow="Branchen"
        title={
          <>
            Unsere Themen-
            <br />
            <span className="bold">Schwerpunkte.</span>
          </>
        }
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <GlassCard num="01" icon="compass" title="Bauplanung" body="tbd" delay={1} />
          <GlassCard num="02" icon="shield" title="Testing, Inspection, Certification" body="tbd" delay={2} />
          <GlassCard num="03" icon="cpu" title="IT-Services" body="tbd" delay={3} />
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="pane kontakt-teaser-pane kontakt-teaser-section">
        <div className="pane-inner kontakt-teaser-inner">
          <div className="s-tag rv">Kontakt</div>
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
          <p className="body-text rv rv-d3" style={{ marginTop: 28, opacity: 0.7 }}>
            München, Deutschland
          </p>
        </div>
      </section>
    </>
  );
}
