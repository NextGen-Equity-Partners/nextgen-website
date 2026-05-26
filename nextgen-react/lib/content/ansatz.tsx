import type { ReactNode } from "react";
import type { GlassCardData } from "./home";

export type JItem = { n: string; title: string; body: string };

type AnsatzContent = {
  hero: { eyebrow: string; title: ReactNode; sub: string };
  meet: {
    eyebrow: string;
    title: ReactNode;
    paragraphs: string[];
    items: JItem[];
  };
  cooperate: {
    eyebrow: string;
    title: ReactNode;
    paragraphs: string[];
    cards: GlassCardData[];
  };
  build: {
    eyebrow: string;
    title: ReactNode;
    intro: string;
    cards: GlassCardData[];
  };
  meaning: {
    eyebrow: string;
    title: ReactNode;
    items: JItem[];
    cta: { href: string; label: string };
  };
};

const de: AnsatzContent = {
  hero: {
    eyebrow: "Wie wir arbeiten",
    title: (
      <>
        <span className="hero-line">Wie wir mit Unternehmern</span>
        <span className="hero-line"><span className="bold">arbeiten.</span></span>
      </>
    ),
    sub: "Wir hören zu, bevor wir Einschätzungen abgeben. Halten den Prozess so einfach wie möglich. Und bleiben nach dem Abschluss dabei – nicht nur in der Anfangsphase.",
  },

  meet: {
    eyebrow: "Kennenlernen",
    title: <>Zeit für das Unternehmen –<br />nicht für <span className="bold">Modelle.</span></>,
    paragraphs: [
      "Bevor über Strukturen, Bewertungen oder Zahlen gesprochen wird, geht es um das Unternehmen selbst – die Geschichte, die Menschen, die Märkte, in denen es stark ist und wo es sich verändern könnte.",
      "Wir nehmen uns für diese Phase Zeit. Sie ist die Grundlage für alles, was danach kommt – und die einzige Möglichkeit, wirklich mehr beizutragen als Kapital.",
    ],
    items: [
      { n: "01", title: "Erstgespräch", body: "Persönlich, vertraulich, ohne Druck. Wir verstehen Ausgangslage und Ziele – und sagen offen, wenn wir nicht der richtige Partner sind." },
      { n: "02", title: "Tieferes Kennenlernen", body: "Mehrere Gespräche mit Unternehmern, Geschäftsführung und wichtigen Personen im Unternehmen. Besuch vor Ort, wenn es passt. Kein Fragenkatalog – Verständnis." },
      { n: "03", title: "Erste Einschätzung", body: "Wir formulieren früh, wie wir das Unternehmen sehen, welche Bewertung wir für realistisch halten und wie eine gemeinsame Zusammenarbeit aussehen könnte." },
    ],
  },

  cooperate: {
    eyebrow: "Kooperieren",
    title: <>Wenn wir Ja sagen,<br /><span className="bold">steht es.</span></>,
    paragraphs: [
      "Wenn beide Seiten weitermachen wollen, halten wir den Prozess so schlank und vorhersehbar wie möglich. Klare Bewertung, klare Strukturen, klare Zeitplanung. Keine Bewertungsspiele, keine Nachverhandlungen kurz vor dem Abschluss.",
      "Für jede Situation gibt es eine andere Form der Zusammenarbeit – wichtig ist, dass sie zum Unternehmen und zu den Menschen passt.",
    ],
    cards: [
      { num: "01", title: "Nachfolgelösungen", body: "Diskret, verlässlich, langfristig. Wir tragen die Verantwortung weiter, ohne den Charakter des Unternehmens zu verändern." },
      { num: "02", title: "Konzernausgliederungen", body: "Strukturen lösen, Substanz und Team erhalten. Ein neuer Rahmen, in dem das Geschäft eigenständig weiterwachsen kann." },
      { num: "03", title: "Wachstumsfinanzierungen", body: "Kapital und operative Unterstützung für den nächsten Schritt – ohne dass die Eigentümer das Steuer aus der Hand geben müssen." },
      { num: "04", title: "Management-Partnerschaften", body: "Gemeinsam mit Managern, die ein Unternehmen übernehmen oder in eine zentrale Rolle hineinwachsen wollen." },
    ],
  },

  build: {
    eyebrow: "Aufbauen",
    title: <>Die ersten Monate <span className="bold">gemeinsam.</span></>,
    intro: "Nach dem Abschluss geht es nicht um große Veränderungen, sondern um ein gemeinsames Verständnis – wo das Unternehmen steht, wo es hin will und wo wir konkret helfen können. Drei Schwerpunkte, die wir mit Unternehmern und Managern abstimmen, nicht über sie entscheiden.",
    cards: [
      { num: "01 · Klarheit", icon: "compass", title: "Gemeinsamer Fahrplan.", body: "Wir setzen uns mit dem Führungsteam zusammen und priorisieren: Was hat in den nächsten zwölf Monaten den größten Effekt – aus Sicht der Kunden, des Teams und der Wirtschaftlichkeit?" },
      { num: "02 · Operative Unterstützung", icon: "spark", title: "Hände, nicht nur Folien.", body: "Wo es hilft, packen wir mit an – sei es bei Reporting und Steuerung, bei Zukäufen oder bei der Einführung digitaler Werkzeuge im Tagesgeschäft." },
      { num: "03 · Digitalisierung", icon: "cpu", title: "Dort, wo es Sinn ergibt.", body: "Unser internes Team für Digitalisierung unterstützt direkt im Unternehmen – an realen Prozessen, mit messbarem Ergebnis. Kein Strategieprojekt, das im Ordner landet." },
    ],
  },

  meaning: {
    eyebrow: "Was das für Unternehmer und Manager heißt",
    title: <>Ein Partner, der <span className="bold">Verantwortung mitträgt.</span></>,
    items: [
      { n: "01", title: "Klarheit von Anfang an", body: "Verbindliche Aussagen zur Bewertung, zum Prozess und zur weiteren Zusammenarbeit – damit Sie planen können, statt zu spekulieren." },
      { n: "02", title: "Diskretion", body: "Gespräche bleiben unter uns. Auch dann, wenn es am Ende doch nicht passt." },
      { n: "03", title: "Operative Mitverantwortung", body: "Wir bringen Erfahrung aus Investments, Führung und Technologie ein – nicht über externe Berater, sondern direkt aus unserem Team." },
      { n: "04", title: "Langfristiger Horizont", body: "Wir denken in Jahren, nicht in Quartalen. Das Unternehmen soll am Ende eine bessere Version von sich selbst sein." },
    ],
    cta: { href: "/ki-wertsteigerung", label: "Wo Digitalisierung bei uns wirkt →" },
  },
};

const en: AnsatzContent = {
  hero: {
    eyebrow: "How we work",
    title: (
      <>
        <span className="hero-line">How we work with</span>
        <span className="hero-line"><span className="bold">entrepreneurs.</span></span>
      </>
    ),
    sub: "We listen before we form opinions. Keep the process as simple as possible. And stay involved long after closing — not just in the early days.",
  },

  meet: {
    eyebrow: "Getting to know each other",
    title: <>Time for the company —<br />not for <span className="bold">spreadsheets.</span></>,
    paragraphs: [
      "Before structures, valuations or numbers come up, we focus on the company itself — its history, its people, the markets where it's strong, and where it could change.",
      "We take time for this phase. It's the foundation for everything that follows — and the only way to truly contribute more than capital.",
    ],
    items: [
      { n: "01", title: "First conversation", body: "Personal, confidential, no pressure. We understand the situation and goals — and say openly if we're not the right partner." },
      { n: "02", title: "Deeper acquaintance", body: "Several conversations with founders, management, and key people in the business. On-site visits where they make sense. No questionnaire — understanding." },
      { n: "03", title: "Initial assessment", body: "We share early how we see the company, what valuation we consider realistic, and what a partnership could look like." },
    ],
  },

  cooperate: {
    eyebrow: "Cooperating",
    title: <>When we say yes,<br /><span className="bold">it stands.</span></>,
    paragraphs: [
      "When both sides want to continue, we keep the process as lean and predictable as possible. Clear valuation, clear structures, clear timeline. No valuation games, no last-minute renegotiations.",
      "Every situation calls for a different form of cooperation — what matters is that it fits the company and the people.",
    ],
    cards: [
      { num: "01", title: "Succession solutions", body: "Discreet, reliable, long-term. We carry the responsibility forward without changing the character of the company." },
      { num: "02", title: "Corporate carve-outs", body: "Untangle structures, preserve substance and team. A new frame in which the business can keep growing independently." },
      { num: "03", title: "Growth financing", body: "Capital and operational support for the next step — without owners having to hand over the wheel." },
      { num: "04", title: "Management partnerships", body: "Together with managers who want to take over a company or grow into a central role." },
    ],
  },

  build: {
    eyebrow: "Building",
    title: <>The first months <span className="bold">together.</span></>,
    intro: "After closing, it's not about big changes — it's about a shared understanding of where the company stands, where it's heading, and where we can concretely help. Three priorities we align with founders and managers, not decide over them.",
    cards: [
      { num: "01 · Clarity", icon: "compass", title: "A shared roadmap.", body: "We sit down with the leadership team and prioritise: what has the biggest effect over the next twelve months — for customers, the team, and the bottom line?" },
      { num: "02 · Operational support", icon: "spark", title: "Hands, not just slides.", body: "Wherever it helps, we get involved — whether on reporting and steering, on add-on acquisitions, or on rolling out digital tools in day-to-day work." },
      { num: "03 · Digitalization", icon: "cpu", title: "Where it makes sense.", body: "Our in-house digitalization team supports directly inside the company — on real processes, with measurable results. No strategy project that ends up in a folder." },
    ],
  },

  meaning: {
    eyebrow: "What this means for entrepreneurs and managers",
    title: <>A partner who <span className="bold">shares responsibility.</span></>,
    items: [
      { n: "01", title: "Clarity from the start", body: "Binding statements on valuation, process, and how we work together — so you can plan instead of speculate." },
      { n: "02", title: "Discretion", body: "Conversations stay between us. Even if it ultimately doesn't work out." },
      { n: "03", title: "Shared operational responsibility", body: "We bring experience from investment, leadership and technology — not via external consultants, but directly from our team." },
      { n: "04", title: "Long-term horizon", body: "We think in years, not quarters. The company should be a better version of itself at the end." },
    ],
    cta: { href: "/ki-wertsteigerung", label: "Where digitalization works for us →" },
  },
};

export const ansatz = { de, en };
