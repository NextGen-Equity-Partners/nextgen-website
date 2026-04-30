import type { GlassCardData } from "./home";

export const profil = {
  hero: {
    eyebrow: "Wer wir sind",
    title: (
      <>
        <span className="hero-line">Investoren, die selbst</span>
        <span className="hero-line"><span className="bold">Verantwortung tragen.</span></span>
      </>
    ),
    sub: "Wir kommen aus Investment, operativer Führung und Technologieentwicklung. Wir wissen aus eigener Erfahrung, womit ein Mittelständler seinen Tag verbringt – und wo die meisten externen Partner an der Realität vorbeigehen. Unser Kapital steckt mit drin.",
    ctaPrimary: { href: "/team", label: "Das Team treffen →" },
    ctaSecondary: { href: "/kontakt", label: "Lassen Sie uns sprechen" },
  },

  pillars: {
    eyebrow: "Wofür wir stehen",
    title: <>Worauf wir aufbauen<br />– und woran man uns<br /><span className="bold">messen darf.</span></>,
    intro:
      "NextGen Equity wurde von Menschen gegründet, die selbst in Unternehmen Verantwortung getragen haben. Das prägt, wie wir mit Unternehmern und Teams umgehen: direkt, verlässlich, mit eigenem Kapital – und ohne die Distanz, die viele externe Partner mitbringen.",
    cards: [
      { num: "Kapital", icon: "coin", title: "Eigenes Kapital", body: "Wir investieren mit eigenem Geld – nicht mit dem Geld anderer. Das verändert, wie man Entscheidungen trifft." },
      { num: "Technologie", icon: "cpu", title: "Digitale Kompetenz im eigenen Haus", body: "Wir haben ein eigenes Team für Digitalisierung und Automatisierung – keine externen Berater, die einmalig vorbeikommen. Die Expertise bleibt im Unternehmen." },
      { num: "Strategie", icon: "target", title: "Gruppen mit Substanz", body: "Wir bauen Unternehmensgruppen, die in ihrer Branche wachsen – durch organisches Wachstum und gezielte Zukäufe, die strategisch Sinn ergeben." },
      { num: "Kultur", icon: "users", title: "Wer ein Lebenswerk übergibt, verdient einen Partner, der das versteht.", body: "Wir investieren in Standorte, Teams und Strukturen – nicht, weil es gut klingt, sondern weil es die Grundlage für alles andere ist." },
    ] satisfies GlassCardData[],
  },

  origin: {
    eyebrow: "Warum wir das tun",
    title: <>Die Überzeugung <span className="bold">dahinter.</span></>,
    paragraphs: [
      "Wir haben den Mittelstand aus drei Perspektiven kennengelernt: als Investor, als Führungskraft und aus der Technologieentwicklung. Was uns dabei immer wieder begegnet ist: Unternehmen mit starkem Kern – und Unternehmer, denen ein Partner fehlt, der wirklich versteht, wie es im Betrieb aussieht.",
      "Klassische Beratung bleibt zu oft an der Oberfläche. Kapitalpartner liefern Geld, aber selten die operative Unterstützung, wenn es darauf ankommt. Und Digitalisierung wird versprochen, landet aber selten dort, wo sie Marge oder Geschwindigkeit tatsächlich verändert.",
      "Aus diesem Bild heraus ist NextGen Equity entstanden: ein Partner, der mit eigenem Kapital, eigener Erfahrung aus der Unternehmensführung und einem internen Team für Digitalisierung direkt an der Seite des Unternehmens arbeitet – nicht über ihm.",
      "Wir wollen nicht der nächste Käufer in einer Reihe sein, sondern die Adresse, an die Unternehmer und Manager denken, wenn sie ernsthaft darüber nachdenken, wie es mit ihrer Firma weitergeht.",
    ],
  },

  values: {
    eyebrow: "Unsere Werte",
    title: <>Was Sie von einem Partner<br /><span className="bold">erwarten dürfen.</span></>,
    cards: [
      { num: "01 · Vertrauen", icon: "handshake", title: "Auf Augenhöhe.", body: "Wir reden Klartext, hören zu und legen früh offen, was geht und was nicht. Vertrauen entsteht durch Transparenz, nicht durch große Worte." },
      { num: "02 · Verlässlichkeit", icon: "shield", title: "Was wir sagen, gilt.", body: "Klare Bewertung, klare Strukturen, klarer Fahrplan – und wir bleiben dabei, auch wenn es im Prozess schwierig wird. Keine Überraschungen kurz vor dem Abschluss." },
      { num: "03 · Verantwortung", icon: "leaf", title: "Für Menschen und Substanz.", body: "Verantwortung für das Team, für die Standorte, für die Kunden – und für die langfristige Wettbewerbsfähigkeit des Unternehmens, nicht nur für die nächste Kennzahl." },
    ] satisfies GlassCardData[],
  },

  esg: {
    eyebrow: "Verantwortung",
    title: <>Verantwortungsvolles <span className="bold">Investieren.</span></>,
    body:
      "Nachhaltigkeit ist für uns keine Pflichtübung, sondern Teil dessen, wie wir Unternehmen führen wollen. Wir investieren langfristig in Menschen, Standorte und Strukturen – und berücksichtigen soziale und ökologische Gesichtspunkte als selbstverständlichen Teil unserer Arbeit. Starke Arbeitgeber sind verlässliche Arbeitgeber.",
    tags: ["Langfristige Partnerschaften", "Mitarbeiter im Mittelpunkt", "Verantwortungsvolle Unternehmensführung"],
  },

  vision: {
    eyebrow: "Wo wir hinwollen",
    title: <>Unternehmen, die <span className="bold">man kennt.</span></>,
    cards: [
      { num: "Mittelfristig · 5 Jahre", icon: "compass", title: "Sichtbare Arbeit im DACH-Mittelstand.", body: "Eine Handvoll Unternehmen in Business Services, die unter unserem Dach gewachsen sind, sich verändert haben und im Markt einen klaren Schritt nach vorne gemacht haben." },
      { num: "Langfristig · 10+ Jahre", icon: "horizon", title: "Eine Adresse, der man vertraut.", body: "Ein Partner, an den Unternehmer und Manager im Mittelstand denken, wenn sie über Wachstum, Nachfolge oder den nächsten Schritt nachdenken." },
    ] satisfies GlassCardData[],
    cta: { href: "/team", label: "Das Team treffen →" },
  },
} as const;
