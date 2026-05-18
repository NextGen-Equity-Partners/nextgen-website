import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — NextGen Equity Partners",
  description:
    "Sprechen Sie mit uns über Beteiligungsmöglichkeiten, Wachstumskapital und Digitalisierung im Mittelstand. Hier finden Sie Ihren Kontakt zu NextGen Equity Partners.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt — NextGen Equity Partners",
    description:
      "Sprechen Sie mit uns über Beteiligungsmöglichkeiten, Wachstumskapital und Digitalisierung im Mittelstand.",
    url: "/kontakt",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
