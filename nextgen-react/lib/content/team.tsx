export type TeamMember = {
  name: string;
  role: string;
  body: string;
  image: string;
  linkedin?: string;
};

export const team = {
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
  ] satisfies TeamMember[],

  extended: [
    { name: "Alexander Rien", role: "Wertschöpfung", image: "/assets/team/alex.jpeg", body: "Erfahrung in operativer Führung und Prozessgestaltung. Arbeitet mit den Teams in den Unternehmen zusammen – damit Strategie im Tagesgeschäft ankommt.", linkedin: "https://www.linkedin.com/in/alexander-rien/" },
    { name: "Gerald Weitbrecht", role: "Origination & BD", image: "/assets/team/gerald.jpeg", body: "Jahrzehntelange Erfahrung im Vertrieb und in der Begleitung mittelständischer Unternehmen. Kennt die Menschen hinter den Unternehmen – und weiß, wann der richtige Moment für ein Gespräch ist.", linkedin: "https://www.linkedin.com/in/gkfweitbrecht/" },
  ] satisfies TeamMember[],

  philosophy: {
    eyebrow: "Team-Philosophie",
    title: <>Gemeinsam kaufen.<br />Gemeinsam <span className="bold">aufbauen.</span></>,
    paragraphs: [
      "Wir bringen kein Beraternetzwerk mit, das auf Abruf kommt. Unser Team kauft gemeinsam, baut gemeinsam und trägt gemeinsam Verantwortung – mit eigenem Kapital im Spiel.",
      "Investoren, Unternehmer und Technikexperten unter einem Dach – ein Team, das nicht auslagert, sondern selbst umsetzt.",
    ],
    cta: { href: "/kontakt", label: "Lassen Sie uns sprechen →" },
  },
} as const;
