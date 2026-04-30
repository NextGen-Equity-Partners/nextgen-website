import type { GlassCardData } from "./home";

export type JItem = { n: string; title: string; body: string };

export const ansatz = {
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
    ] satisfies JItem[],
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
    ] satisfies GlassCardData[],
  },

  build: {
    eyebrow: "Aufbauen",
    title: <>Die ersten Monate <span className="bold">gemeinsam.</span></>,
    intro: "Nach dem Abschluss geht es nicht um große Veränderungen, sondern um ein gemeinsames Verständnis – wo das Unternehmen steht, wo es hin will und wo wir konkret helfen können. Drei Schwerpunkte, die wir mit Unternehmern und Managern abstimmen, nicht über sie entscheiden.",
    cards: [
      { num: "01 · Klarheit", icon: "compass", title: "Gemeinsamer Fahrplan.", body: "Wir setzen uns mit dem Führungsteam zusammen und priorisieren: Was hat in den nächsten zwölf Monaten den größten Effekt – aus Sicht der Kunden, des Teams und der Wirtschaftlichkeit?" },
      { num: "02 · Operative Unterstützung", icon: "spark", title: "Hände, nicht nur Folien.", body: "Wo es hilft, packen wir mit an – sei es bei Reporting und Steuerung, bei Zukäufen oder bei der Einführung digitaler Werkzeuge im Tagesgeschäft." },
      { num: "03 · Digitalisierung", icon: "cpu", title: "Dort, wo es Sinn ergibt.", body: "Unser internes Team für Digitalisierung unterstützt direkt im Unternehmen – an realen Prozessen, mit messbarem Ergebnis. Kein Strategieprojekt, das im Ordner landet." },
    ] satisfies GlassCardData[],
  },

  meaning: {
    eyebrow: "Was das für Unternehmer und Manager heißt",
    title: <>Ein Partner, der <span className="bold">Verantwortung mitträgt.</span></>,
    items: [
      { n: "01", title: "Klarheit von Anfang an", body: "Verbindliche Aussagen zur Bewertung, zum Prozess und zur weiteren Zusammenarbeit – damit Sie planen können, statt zu spekulieren." },
      { n: "02", title: "Diskretion", body: "Gespräche bleiben unter uns. Auch dann, wenn es am Ende doch nicht passt." },
      { n: "03", title: "Operative Mitverantwortung", body: "Wir bringen Erfahrung aus Investments, Führung und Technologie ein – nicht über externe Berater, sondern direkt aus unserem Team." },
      { n: "04", title: "Langfristiger Horizont", body: "Wir denken in Jahren, nicht in Quartalen. Das Unternehmen soll am Ende eine bessere Version von sich selbst sein." },
    ] satisfies JItem[],
    cta: { href: "/ki-wertsteigerung", label: "Wo Digitalisierung bei uns wirkt →" },
  },
} as const;
