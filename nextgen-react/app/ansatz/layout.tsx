import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ansatz — NextGen Equity Partners",
  description:
    "Unser Ansatz: kennenlernen, gemeinsam aufbauen, Wertschöpfung. So entwickeln wir mittelständische Dienstleister zu Unternehmensgruppen.",
  alternates: { canonical: "/ansatz" },
  openGraph: {
    title: "Ansatz — NextGen Equity Partners",
    description:
      "Unser Ansatz: kennenlernen, gemeinsam aufbauen, Wertschöpfung. So entwickeln wir mittelständische Dienstleister zu Unternehmensgruppen.",
    url: "/ansatz",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
