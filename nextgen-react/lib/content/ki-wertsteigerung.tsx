import type { ReactNode } from "react";

export type CmpCard = { num: string; headline: ReactNode; counter: ReactNode };
export type AaaTool = { name: string; desc: string };
export type AaaRow = {
  level: "management" | "core" | "support";
  num: string;
  title: string;
  intro: string;
  tools: AaaTool[];
  outcomes: string[];
};

type KiContent = {
  hero: { eyebrow: string; title: ReactNode; sub: string };
  approach: {
    eyebrow: string;
    title: ReactNode;
    paragraphs: string[];
    cards: CmpCard[];
  };
  diagram: {
    eyebrow: string;
    title: ReactNode;
    intro: string;
    rows: AaaRow[];
    outcomeLabel: string;
  };
  quote: {
    portrait: string;
    portraitAlt: string;
    name: string;
    role: string;
    body: ReactNode;
    cta: { href: string; label: string };
  };
};

const de: KiContent = {
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
    ],
  },

  diagram: {
    eyebrow: "Wo Digitalisierung wirkt",
    title: <>Drei Bereiche, in denen wir <span className="bold">konkret ansetzen.</span></>,
    intro:
      "Statt Digitalisierung als Schlagwort über ein Unternehmen zu legen, arbeiten wir auf drei klar getrennten Ebenen – jede mit eigenem Fokus und messbaren Ergebnissen.",
    outcomeLabel: "Ergebnis",
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
    ],
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
};

const en: KiContent = {
  hero: {
    eyebrow: "Differentiation · Technology · Value creation",
    title: (
      <>
        <span className="hero-line">Digitalization that</span>
        <span className="hero-line">actually <span className="bold">lands in operations.</span></span>
      </>
    ),
    sub: "Whether and how a mid-market company integrates digital tools into its business will make a tangible difference over the coming years — in margin, in speed, in employer attractiveness. We've been working seriously for years on how that succeeds in practice.",
  },

  approach: {
    eyebrow: "Our approach",
    title: <>Our own team. <span className="bold">Inside the business.</span></>,
    paragraphs: [
      "We have our own team of engineers and developers who work directly inside the companies of our group. No external consultants who deliver a report and leave. The same people who design a solution also implement it — and stay until it works in everyday operations.",
      "We build our technical expertise in-house and apply it inside our companies. A combination that's rare in the DACH mid-market.",
    ],
    cards: [
      {
        num: "01",
        headline: <>Technical assessment<br />with our own tools.</>,
        counter: <><span className="cmp-vs">We understand a company from the inside</span> — how processes actually run, where digitalization really lands, and where it doesn't make sense.</>,
      },
      {
        num: "02",
        headline: <>Anchored in operations.<br />Measurable.</>,
        counter: <><span className="cmp-vs">No buzzword</span>, no presentation that ends up on a shelf. Concrete implementation, directly in the company's workflows.</>,
      },
      {
        num: "03",
        headline: <>Depth instead of<br />breadth.</>,
        counter: <><span className="cmp-vs">We focus on a few industries</span> we genuinely know — instead of staying superficial as a generalist across many.</>,
      },
    ],
  },

  diagram: {
    eyebrow: "Where digitalization works",
    title: <>Three areas where we <span className="bold">make a concrete difference.</span></>,
    intro:
      "Rather than overlaying digitalization as a buzzword, we work on three clearly separated levels — each with its own focus and measurable outcomes.",
    outcomeLabel: "Outcome",
    rows: [
      {
        level: "management",
        num: "01 · Management",
        title: "Steering and overview",
        intro: "Data-based decisions instead of gut feeling — a clear picture of what's really happening in the company.",
        tools: [
          { name: "Reporting", desc: "Integrated, automated BI across finance, HR and CRM." },
          { name: "AI Finance Forecasting", desc: "Forecasts for cashflow, order intake and capacity." },
          { name: "CPQ Terminal", desc: "AI-powered, rapid quote generation." },
        ],
        outcomes: ["More transparency", "Data-based decisions", "Bottleneck processes relieved"],
      },
      {
        level: "core",
        num: "02 · Core Operations",
        title: "In the core business",
        intro: "Deep in everyday operations — tailored to industry and process. Higher quality, faster cycles.",
        tools: [
          { name: "Generative Routing", desc: "GenAI routing of technical infrastructure (example: construction planning)." },
          { name: "NormCheck", desc: "Reconciliation against standards and norms in planning documents." },
          { name: "Audit Copilot", desc: "AI-powered audit planning and reporting engine." },
        ],
        outcomes: ["Higher output quality", "Knowledge made available", "Faster planning and execution cycles"],
      },
      {
        level: "support",
        num: "03 · Support Functions",
        title: "Cross-cutting functions",
        intro: "Back office relieved, risk reduced, more time for what really matters.",
        tools: [
          { name: "Procurement & Tendering", desc: "Automatic screening and evaluation by AI agents." },
          { name: "Contract Management", desc: "AI-powered drafting, review and tracking of contracts." },
          { name: "Website & Marketing", desc: "Automated creation of SEO content and outreach." },
        ],
        outcomes: ["Back office relieved", "Risk reduced", "More time for core tasks"],
      },
    ],
  },

  quote: {
    portrait: "/assets/team/amon.png",
    portraitAlt: "Dr. Amon Göppert",
    name: "Dr. Amon Göppert",
    role: "Partner Technology · NextGen Equity",
    body: (
      <p>
        For us, digitalization isn't a buzzword — it's <strong>craftsmanship</strong>. We anchor it where it measurably changes <strong>margin, speed and customer value</strong> — without damaging the character of a <strong>mid-market company</strong>.
      </p>
    ),
    cta: { href: "/kontakt", label: "Let's talk →" },
  },
};

export const ki = { de, en };
