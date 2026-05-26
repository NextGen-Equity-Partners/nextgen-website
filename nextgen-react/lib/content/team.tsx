import type { ReactNode } from "react";

export type TeamMember = {
  name: string;
  role: string;
  body: string;
  image: string;
  linkedin?: string;
};

type TeamContent = {
  hero: { eyebrow: string; title: ReactNode; sub: string };
  intro: { eyebrow: string; title: ReactNode; body: string };
  partners: TeamMember[];
  extended: TeamMember[];
  philosophy: {
    eyebrow: string;
    title: ReactNode;
    paragraphs: string[];
    cta: { href: string; label: string };
  };
};

const de: TeamContent = {
  hero: {
    eyebrow: "Die Menschen hinter NextGen",
    title: (
      <>
        <span className="hero-line">Das Team hinter</span>
        <span className="hero-line"><span className="bold">NextGen.</span></span>
      </>
    ),
    sub: "Investoren, Unternehmer und Technikexperten – in einem Team, das gemeinsam kauft, aufbaut und Verantwortung trägt. Mit eigenem Kapital im Spiel.",
  },

  intro: {
    eyebrow: "Partner & Team",
    title: <>Investoren, Unternehmer <span className="bold">und Technikexperten.</span></>,
    body: "Ein Team, das gemeinsam kauft, aufbaut und Wert schafft – mit voller Verantwortung und eigenem Kapital.",
  },

  partners: [
    { name: "Maximilian Göppert", role: "Partner", image: "/assets/team/max.jpeg", body: "Über zwölf Jahre Erfahrung im Mittelstand – vom ersten Gespräch bis weit nach dem Closing. Denkt in Beziehungen, nicht in Transaktionen.", linkedin: "https://www.linkedin.com/in/maximilian-g%C3%B6ppert/" },
    { name: "Leander Heyken", role: "Partner", image: "/assets/team/leander.png", body: "Langjährige Erfahrung an der Schnittstelle von Investment und operativer Führung. Begleitet Unternehmer von der ersten Überlegung bis zur Umsetzung im Alltag.", linkedin: "https://www.linkedin.com/in/heyken/" },
    { name: "Dr. Amon Göppert", role: "Partner · Technologie", image: "/assets/team/amon.png", body: "Forscher und Praktiker zugleich. Bringt akademische Tiefe aus Informatik und Engineering direkt in den Betrieb – und entwickelt technische Lösungen, die im Alltag funktionieren.", linkedin: "https://www.linkedin.com/in/amon-goeppert/" },
  ],

  extended: [
    { name: "Alexander Rien", role: "Wertschöpfung", image: "/assets/team/alex.jpeg", body: "Erfahrung in operativer Führung und Prozessgestaltung. Arbeitet mit den Teams in den Unternehmen zusammen – damit Strategie im Tagesgeschäft ankommt.", linkedin: "https://www.linkedin.com/in/alexander-rien/" },
    { name: "Gerald Weitbrecht", role: "Origination & BD", image: "/assets/team/gerald.jpeg", body: "Jahrzehntelange Erfahrung im Vertrieb und in der Begleitung mittelständischer Unternehmen. Kennt die Menschen hinter den Unternehmen – und weiß, wann der richtige Moment für ein Gespräch ist.", linkedin: "https://www.linkedin.com/in/gkfweitbrecht/" },
  ],

  philosophy: {
    eyebrow: "Team-Philosophie",
    title: <>Gemeinsam kaufen.<br />Gemeinsam <span className="bold">aufbauen.</span></>,
    paragraphs: [
      "Wir bringen kein Beraternetzwerk mit, das auf Abruf kommt. Unser Team kauft gemeinsam, baut gemeinsam und trägt gemeinsam Verantwortung – mit eigenem Kapital im Spiel.",
      "Investoren, Unternehmer und Technikexperten unter einem Dach – ein Team, das nicht auslagert, sondern selbst umsetzt.",
    ],
    cta: { href: "/kontakt", label: "Lassen Sie uns sprechen →" },
  },
};

const en: TeamContent = {
  hero: {
    eyebrow: "The people behind NextGen",
    title: (
      <>
        <span className="hero-line">The team behind</span>
        <span className="hero-line"><span className="bold">NextGen.</span></span>
      </>
    ),
    sub: "Investors, entrepreneurs and technical experts — one team that buys, builds, and bears responsibility together. With our own capital at stake.",
  },

  intro: {
    eyebrow: "Partners & Team",
    title: <>Investors, entrepreneurs <span className="bold">and technical experts.</span></>,
    body: "A team that buys, builds, and creates value together — with full accountability and our own capital.",
  },

  partners: [
    { name: "Maximilian Göppert", role: "Partner", image: "/assets/team/max.jpeg", body: "Over twelve years of mid-market experience — from the first conversation to long after closing. Thinks in relationships, not transactions.", linkedin: "https://www.linkedin.com/in/maximilian-g%C3%B6ppert/" },
    { name: "Leander Heyken", role: "Partner", image: "/assets/team/leander.png", body: "Years of experience at the intersection of investment and operational leadership. Walks alongside entrepreneurs from the first consideration to day-to-day execution.", linkedin: "https://www.linkedin.com/in/heyken/" },
    { name: "Dr. Amon Göppert", role: "Partner · Technology", image: "/assets/team/amon.png", body: "Researcher and practitioner. Brings academic depth from computer science and engineering directly into operations — and builds technical solutions that hold up in everyday business.", linkedin: "https://www.linkedin.com/in/amon-goeppert/" },
  ],

  extended: [
    { name: "Alexander Rien", role: "Value Creation", image: "/assets/team/alex.jpeg", body: "Experience in operational leadership and process design. Works alongside the teams in our companies — so strategy actually lands in day-to-day operations.", linkedin: "https://www.linkedin.com/in/alexander-rien/" },
    { name: "Gerald Weitbrecht", role: "Origination & BD", image: "/assets/team/gerald.jpeg", body: "Decades of experience in sales and supporting mid-market companies. Knows the people behind the businesses — and the right moment for a conversation.", linkedin: "https://www.linkedin.com/in/gkfweitbrecht/" },
  ],

  philosophy: {
    eyebrow: "Team philosophy",
    title: <>Buy together.<br />Build <span className="bold">together.</span></>,
    paragraphs: [
      "We don't bring a consultant network on retainer. Our team buys together, builds together, and bears responsibility together — with our own capital at stake.",
      "Investors, entrepreneurs and technical experts under one roof — a team that doesn't outsource, but executes itself.",
    ],
    cta: { href: "/kontakt", label: "Let's talk →" },
  },
};

export const team = { de, en };
