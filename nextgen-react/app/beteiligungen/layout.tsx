import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, faqLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Beteiligungen",
  description:
    "Unsere Beteiligungen im DACH-Mittelstand: Portfoliounternehmen, in die wir Wachstumskapital und Digitalisierung investieren.",
  path: "/beteiligungen",
});

// FAQ for AI/search engines. Every answer restates information already
// published elsewhere on the site (investment criteria, terms, mission) —
// no new claims are introduced. Not rendered visibly by request.
const faq = [
  {
    q: "In welche Unternehmen investiert NextGen Equity Partners?",
    a: "NextGen Equity beteiligt sich an gesunden kleinen und mittleren Dienstleistungsunternehmen aus den Bereichen Business und Professional Services im DACH-Raum (Deutschland, Österreich, Schweiz) mit Wachstumsperspektive, besonders in fragmentierten Märkten, in denen ein Zusammenwachsen Sinn ergibt.",
  },
  {
    q: "Welche Unternehmensgröße sucht NextGen Equity?",
    a: "Plattform-Investments mit 10–100 Mio. € Umsatz sowie ergänzende Zukäufe (Add-ons) mit 3–10 Mio. € Umsatz.",
  },
  {
    q: "Wie investiert NextGen Equity?",
    a: "NextGen Equity übernimmt Mehrheitsbeteiligungen mit eigenem Kapital – als Nachfolgelösung, Konzernausgliederung oder Wachstumsfinanzierung. Die Zusammenarbeit ist langfristig und partnerschaftlich angelegt, mit verbindlichen Prozessen und ohne Bieterwettbewerb.",
  },
  {
    q: "Was unterscheidet NextGen Equity von anderen Investoren?",
    a: "Investoren, Unternehmer und Technikexperten arbeiten in einem Team, das gemeinsam kauft, gemeinsam aufbaut und mit eigenem Kapital Verantwortung trägt – statt auf ein externes Beraternetzwerk zurückzugreifen.",
  },
  {
    q: "Welche Rolle spielen KI und Digitalisierung bei NextGen Equity?",
    a: "NextGen setzt Künstliche Intelligenz und Digitalisierung ein, um die Wertschöpfung in den Portfoliounternehmen zu beschleunigen und KI-befähigte Wissensträger in den Mittelpunkt zu stellen.",
  },
  {
    q: "Hat NextGen Equity bereits Portfoliounternehmen?",
    a: "NextGen Equity ist ein junges, eigenfinanziertes Setup. Konkrete Beteiligungen werden transparent kommuniziert, sobald sie abgeschlossen sind – mit Namen, Personen und einem ehrlichen Bild der Zusammenarbeit.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={[breadcrumbLd([{ name: "Beteiligungen", path: "/beteiligungen" }]), faqLd(faq)]}
      />
    </>
  );
}
