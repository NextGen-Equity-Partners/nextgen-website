import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beteiligungen — NextGen Equity Partners",
  description:
    "Unsere Beteiligungen im DACH-Mittelstand: Portfoliounternehmen, in die wir Wachstumskapital und Digitalisierung investieren.",
  alternates: { canonical: "/beteiligungen" },
  openGraph: {
    title: "Beteiligungen — NextGen Equity Partners",
    description:
      "Unsere Beteiligungen im DACH-Mittelstand: Portfoliounternehmen, in die wir Wachstumskapital und Digitalisierung investieren.",
    url: "/beteiligungen",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
