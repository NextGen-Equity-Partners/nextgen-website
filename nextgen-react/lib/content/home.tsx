import type { ReactNode } from "react";
import type { IconKey } from "@/components/ui/glass-icon";

export type GlassCardData = {
  num: string;
  title: ReactNode;
  body: ReactNode;
  icon?: IconKey;
};

export const home = {
  hero: {
    eyebrow: "DACH-Mittelstand · Business Services",
    title: (
      <>
        <span className="hero-line">Ihr Partner für Mehrheitsbeteiligungen</span>
        <span className="hero-line">im <span className="bold">Mittelstand.</span></span>
      </>
    ),
    sub: "Wir erwerben Mehrheitsbeteiligungen an gesunden Unternehmen im Bereich Business Services und entwickeln sie gemeinsam mit dem bestehenden Team weiter – mit eigenem Kapital, langfristigem Horizont und einem Team, das kauft, führt und umsetzt.",
    ctaPrimary: { href: "/kontakt", label: "Lassen Sie uns sprechen →" },
    ctaSecondary: { href: "/profil", label: "Über uns" },
  },

  werWirSind: {
    eyebrow: "Wer wir sind",
    title: <>Was Sie aufgebaut haben,<br /><span className="bold">soll bleiben.</span></>,
    intro:
      "NextGen Equity ist ein kleines Team aus München – Investoren, Unternehmer und Technikexperten. Wir übernehmen mittelständische Unternehmen in Business Services und arbeiten gemeinsam mit dem bestehenden Team daran weiter. Nicht auf Zeit, nicht auf Exit. Das Unternehmen soll nach uns stärker dastehen.",
    cards: [
      { num: "Kapital", icon: "coin", title: "Eigenes Kapital", body: "Wir investieren mit eigenem Geld – nicht mit dem Geld anderer. Das verändert, wie man Entscheidungen trifft." },
      { num: "Technologie", icon: "cpu", title: "Digitale Kompetenz im eigenen Haus", body: "Wir haben ein eigenes Team für Digitalisierung und Automatisierung – keine externen Berater, die einmalig vorbeikommen. Die Expertise bleibt im Unternehmen." },
      { num: "Strategie", icon: "target", title: "Gruppen mit Substanz", body: "Wir bauen Unternehmensgruppen, die in ihrer Branche wachsen – durch organisches Wachstum und gezielte Zukäufe, die strategisch Sinn ergeben." },
      { num: "Kultur", icon: "users", title: "Wer ein Lebenswerk übergibt, verdient einen Partner, der das versteht.", body: "Wir investieren in Standorte, Teams und Strukturen – nicht, weil es gut klingt, sondern weil es die Grundlage für alles andere ist." },
    ] satisfies GlassCardData[],
  },

  wasWirSuchen: {
    eyebrow: "Was wir suchen",
    title: <>Unternehmen mit Substanz –<br /><span className="bold">und Wachstum vor sich.</span></>,
    intro:
      "Wir suchen profitable Unternehmen im Bereich Business und Professional Services – mit stabilem Geschäftsmodell, verlässlichen Umsätzen und einem Markt, der noch Spielraum lässt. Die Branche ist zweitrangig; die Substanz zählt.",
    cards: [
      { num: "Profil", icon: "user", title: "Beziehung und Vertrauen", body: "Branchen, in denen die Kundenbeziehung zählt, in denen Erfahrung und Verlässlichkeit den Ausschlag geben – und in denen ein Zusammenwachsen mehrerer Unternehmen echten Sinn ergibt." },
      { num: "Umsatz", icon: "chart", title: "10–100 Mio. € Umsatz", body: "Etablierte Unternehmen mit stabilem Geschäft als Kern. Ergänzende Zukäufe ab 3 Mio. € Umsatz." },
      { num: "Region", icon: "globe", title: "Deutschland, Österreich, Schweiz", body: "Unternehmen, die etwas aufgebaut haben – und mit dem richtigen Partner die nächste Phase angehen wollen." },
    ] satisfies GlassCardData[],
    footer: "Partnerschaftlich · Langfristig · Mit eigenem Kapital",
  },

  storyBreak: {
    eyebrow: "Unser Suchprofil",
    quote: (
      <>
        <span className="accent">10–100 Mio. €</span> Plattform-Umsatz.<br />
        Add-ons ab <span className="accent">3 Mio. €.</span> DACH-weit.
      </>
    ),
    signature: "Buy-and-Build in Business Services",
  },

  ansatz: {
    eyebrow: "Unser Ansatz",
    title: <>Wie wir<br /><span className="bold">zusammenarbeiten.</span></>,
    intro:
      "Wir nehmen uns Zeit, bevor wir Einschätzungen abgeben – und sind verbindlich, sobald beide Seiten weitermachen wollen. Kein Bieterwettbewerb, keine Überraschungen.",
    cta: { href: "/ansatz", label: "So arbeiten wir →" },
    cards: [
      { num: "01", title: "Kennenlernen", body: "Erstgespräch und erste Einschätzung. Wir verstehen Geschäftsmodell, Zahlen und Perspektive – und sagen früh, wenn wir nicht der richtige Partner sind." },
      { num: "02", title: "Kooperieren", body: "Strukturierte Prüfung, klare Bewertung, verbindliche Konditionen. Kein Bieterwettbewerb, keine Überraschungen kurz vor dem Abschluss." },
      { num: "03", title: "Aufbauen", body: "Gemeinsamer Plan für die ersten Monate: organisches Wachstum, gezielte Zukäufe, Digitalisierung im Tagesgeschäft – umgesetzt mit dem bestehenden Team." },
      { num: "04", title: "Begleiten", body: "Langfristige Partnerschaft mit klarem Reporting, operativer Unterstützung und einem Netzwerk, das mit der Gruppe wächst." },
    ] satisfies GlassCardData[],
  },

  kontaktTeaser: {
    portrait: "/assets/team/max.jpeg",
    portraitAlt: "Maximilian Göppert",
    eyebrow: "Nächster Schritt",
    title: <>Lassen Sie uns über Ihr<br /><span className="bold">Unternehmen sprechen.</span></>,
    body:
      "Ob Unternehmer, Geschäftsführer oder M&A-Berater – wir sind offen für ein vertrauliches Gespräch. Diskretion und Verbindlichkeit sind selbstverständlich.",
    cta: { href: "/kontakt", label: "Unverbindliches Gespräch vereinbaren →" },
  },
} as const;
