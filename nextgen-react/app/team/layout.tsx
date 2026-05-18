import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — NextGen Equity Partners",
  description:
    "Die Menschen hinter NextGen Equity Partners — Partner, erweitertes Team und unsere Philosophie für die Entwicklung mittelständischer Unternehmensgruppen.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Team — NextGen Equity Partners",
    description:
      "Die Menschen hinter NextGen Equity Partners — Partner, erweitertes Team und unsere Philosophie für die Entwicklung mittelständischer Unternehmensgruppen.",
    url: "/team",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
