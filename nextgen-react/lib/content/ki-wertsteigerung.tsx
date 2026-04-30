export type CmpCard = { num: string; headline: React.ReactNode; counter: React.ReactNode };
export type AaaTool = { name: string; desc: string };
export type AaaRow = {
  level: "management" | "core" | "support";
  num: string;
  title: string;
  intro: string;
  tools: AaaTool[];
  outcomes: string[];
};

export const ki = {
  hero: {
    eyebrow: "Differenzierung · Technologie · Wertschöpfung",
    title: (
      <>
        <span className="hero-line">Digitalisierung,</span>
        <span className="hero-line">die im <span className="bold">Betrieb ankommt.</span></span>
      </>
    ),
    sub: "Ob und wie ein Mittelständler digitale Werkzeuge in sein Geschäft integriert, wird in den nächsten Jahren einen spürbaren Unterschied machen – in der Marge, in der Geschwindigkeit, in der Attraktivität als Arbeitgeber. Wir beschäftigen uns seit Jahren ernsthaft damit, wie das in der Praxis gelingt.",
  },

  approach: {
    eyebrow: "Unser Ansatz",
    title: <>Ein eigenes Team. <span className="bold">Direkt im Betrieb.</span></>,
    paragraphs: [
      "Wir haben ein eigenes Team aus Technikern und Entwicklern, das direkt in den Unternehmen unserer Gruppe arbeitet. Keine externen Berater, die einen Bericht liefern und gehen. Die gleichen Menschen, die eine Lösung entwickeln, setzen sie auch um – und bleiben, bis sie im Alltag funktioniert.",
      "Unsere technische Expertise bauen wir intern auf und setzen sie in den Unternehmen ein. Eine Kombination, die im DACH-Mittelstand selten ist.",
    ],
    cards: [
      {
        num: "01",
        headline: <>Technische Prüfung<br />mit eigenen Werkzeugen.</>,
        counter: <><span className="cmp-vs">Wir verstehen ein Unternehmen auch von innen</span> – wie die Prozesse laufen, wo Digitalisierung wirklich greift und wo sie keinen Sinn ergibt.</>,
      },
      {
        num: "02",
        headline: <>Im Tagesgeschäft verankert.<br />Messbar.</>,
        counter: <><span className="cmp-vs">Kein Buzzword</span>, keine Präsentation, die im Regal steht. Konkrete Umsetzung, direkt in den Abläufen des Unternehmens.</>,
      },
      {
        num: "03",
        headline: <>Tiefe statt<br />Breite.</>,
        counter: <><span className="cmp-vs">Wir konzentrieren uns auf wenige Branchen</span>, die wir wirklich kennen – statt als Generalist in vielen Bereichen oberflächlich zu bleiben.</>,
      },
    ] satisfies CmpCard[],
  },

  diagram: {
    eyebrow: "Wo Digitalisierung wirkt",
    title: <>Drei Bereiche, in denen wir <span className="bold">konkret ansetzen.</span></>,
    intro:
      "Statt Digitalisierung als Schlagwort über ein Unternehmen zu legen, arbeiten wir auf drei klar getrennten Ebenen – jede mit eigenem Fokus und messbaren Ergebnissen.",
    rows: [
      {
        level: "management",
        num: "01 · Management",
        title: "Steuerung und Überblick",
        intro: "Datenbasierte Entscheidungen statt Bauchgefühl – ein klares Bild davon, was im Unternehmen wirklich passiert.",
        tools: [
          { name: "Reporting", desc: "Integrierte, automatisierte BI über Finance, HR & CRM hinweg." },
          { name: "AI Finance Forecasting", desc: "Prognosen für Cashflow, Auftragseingang und Kapazitäten." },
          { name: "CPQ Terminal", desc: "KI-gestützte, schnelle Angebotserstellung." },
        ],
        outcomes: ["Mehr Transparenz", "Datenbasierte Entscheidungen", "Engpass-Prozesse entlastet"],
      },
      {
        level: "core",
        num: "02 · Core Operations",
        title: "Im Kerngeschäft",
        intro: "Tief im Tagesgeschäft – zugeschnitten auf Branche und Prozess. Höhere Qualität, schnellere Zyklen.",
        tools: [
          { name: "Generative Routing", desc: "GenAI-Routing technischer Infrastruktur (Beispiel: Bauplanung)." },
          { name: "NormCheck", desc: "Abgleich mit Normen und Standards in Planungsdokumenten." },
          { name: "Audit Copilot", desc: "KI-gestützte Audit-Planung und Reporting-Engine." },
        ],
        outcomes: ["Höhere Output-Qualität", "Wissen verfügbar gemacht", "Schnellere Planungs- und Ausführungszyklen"],
      },
      {
        level: "support",
        num: "03 · Support Functions",
        title: "Querschnittsfunktionen",
        intro: "Backoffice entlastet, Risiko reduziert, mehr Zeit für das, was wirklich zählt.",
        tools: [
          { name: "Procurement & Tendering", desc: "Automatisches Screening und Bewertung durch KI-Agenten." },
          { name: "Contract Management", desc: "KI-gestütztes Drafting, Review und Tracking von Verträgen." },
          { name: "Website & Marketing", desc: "Automatisierte Erstellung von SEO-Content und Outreach." },
        ],
        outcomes: ["Backoffice entlastet", "Risiko reduziert", "Mehr Zeit für Kernaufgaben"],
      },
    ] satisfies AaaRow[],
  },

  quote: {
    portrait: "/assets/team/amon.png",
    portraitAlt: "Dr. Amon Göppert",
    name: "Dr. Amon Göppert",
    role: "Partner Technologie · NextGen Equity",
    body: (
      <p>
        Digitalisierung ist bei uns kein Schlagwort, sondern <strong>handwerkliche Arbeit</strong>. Wir verankern sie dort, wo sie <strong>Marge, Geschwindigkeit und Kundennutzen</strong> messbar verändert – ohne den Charakter eines <strong>mittelständischen Unternehmens</strong> zu beschädigen.
      </p>
    ),
    cta: { href: "/kontakt", label: "Lassen Sie uns sprechen →" },
  },
} as const;
