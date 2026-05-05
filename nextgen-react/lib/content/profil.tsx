import type { ReactNode } from "react";
import type { GlassCardData } from "./home";

type ProfilContent = {
  hero: {
    eyebrow: string;
    title: ReactNode;
    sub: string;
    ctaPrimary: { href: string; label: string };
    ctaSecondary: { href: string; label: string };
  };
  pillars: {
    eyebrow: string;
    title: ReactNode;
    intro: string;
    cards: GlassCardData[];
  };
  origin: {
    eyebrow: string;
    title: ReactNode;
    paragraphs: string[];
  };
  values: {
    eyebrow: string;
    title: ReactNode;
    cards: GlassCardData[];
  };
  esg: {
    eyebrow: string;
    title: ReactNode;
    body: string;
    tags: string[];
  };
  vision: {
    eyebrow: string;
    title: ReactNode;
    cards: GlassCardData[];
    cta: { href: string; label: string };
  };
};

const de: ProfilContent = {
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
    ],
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
    ],
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
    ],
    cta: { href: "/team", label: "Das Team treffen →" },
  },
};

const en: ProfilContent = {
  hero: {
    eyebrow: "Who we are",
    title: (
      <>
        <span className="hero-line">Investors who carry</span>
        <span className="hero-line"><span className="bold">responsibility themselves.</span></span>
      </>
    ),
    sub: "We come from investment, operational leadership and technology development. We know from experience what running a mid-market business looks like — and where most external partners miss reality. Our own capital is in the deal.",
    ctaPrimary: { href: "/team", label: "Meet the team →" },
    ctaSecondary: { href: "/kontakt", label: "Let's talk" },
  },

  pillars: {
    eyebrow: "What we stand for",
    title: <>What we build on<br />— and what you can<br /><span className="bold">measure us by.</span></>,
    intro:
      "NextGen Equity was founded by people who have carried responsibility inside companies themselves. That shapes how we work with entrepreneurs and teams: direct, reliable, with our own capital — and without the distance many external partners bring.",
    cards: [
      { num: "Capital", icon: "coin", title: "Our own capital", body: "We invest our own money — not someone else's. That changes how decisions get made." },
      { num: "Technology", icon: "cpu", title: "In-house digital expertise", body: "We have our own team for digitalization and automation — no external consultants who drop in once. The expertise stays inside the company." },
      { num: "Strategy", icon: "target", title: "Groups with substance", body: "We build corporate groups that grow within their industry — through organic growth and targeted add-ons that make strategic sense." },
      { num: "Culture", icon: "users", title: "A life's work deserves a partner who understands what that means.", body: "We invest in locations, teams and structures — not because it sounds good, but because it's the foundation for everything else." },
    ],
  },

  origin: {
    eyebrow: "Why we do this",
    title: <>The conviction <span className="bold">behind it.</span></>,
    paragraphs: [
      "We've come to know the mid-market from three angles: as investors, as operators, and from technology development. What we kept seeing: companies with a strong core — and entrepreneurs who lacked a partner who actually understood how the business runs day to day.",
      "Classic consulting too often stays at the surface. Capital partners deliver money but rarely the operational support when it counts. And digitalization gets promised, but rarely lands where it actually changes margin or speed.",
      "NextGen Equity grew out of that picture: a partner who works alongside the company — with its own capital, its own experience from corporate leadership, and an internal team for digitalization — not above it.",
      "We don't want to be the next buyer in line. We want to be the name entrepreneurs and managers think of when they get serious about what comes next for their company.",
    ],
  },

  values: {
    eyebrow: "Our values",
    title: <>What you can expect<br /><span className="bold">from a partner.</span></>,
    cards: [
      { num: "01 · Trust", icon: "handshake", title: "On equal footing.", body: "We speak plainly, listen, and put on the table early what works and what doesn't. Trust comes from transparency, not big words." },
      { num: "02 · Reliability", icon: "shield", title: "What we say stands.", body: "Clear valuation, clear structures, clear timeline — and we stick with it, even when the process gets hard. No last-minute surprises before signing." },
      { num: "03 · Responsibility", icon: "leaf", title: "For people and substance.", body: "Responsibility for the team, the locations, the customers — and for the long-term competitiveness of the company, not just the next KPI." },
    ],
  },

  esg: {
    eyebrow: "Responsibility",
    title: <>Responsible <span className="bold">investing.</span></>,
    body:
      "Sustainability isn't a checkbox for us — it's part of how we want to run companies. We invest long-term in people, locations and structures, and we treat social and environmental considerations as a natural part of our work. Strong employers are reliable employers.",
    tags: ["Long-term partnerships", "People at the centre", "Responsible governance"],
  },

  vision: {
    eyebrow: "Where we're heading",
    title: <>Companies people <span className="bold">know.</span></>,
    cards: [
      { num: "Mid-term · 5 years", icon: "compass", title: "Visible work in the DACH mid-market.", body: "A handful of companies in business services that have grown under our roof, evolved, and made a clear step forward in their market." },
      { num: "Long-term · 10+ years", icon: "horizon", title: "A name that's trusted.", body: "The partner that mid-market entrepreneurs and managers think of when they're seriously thinking about growth, succession, or the next step." },
    ],
    cta: { href: "/team", label: "Meet the team →" },
  },
};

export const profil = { de, en };
