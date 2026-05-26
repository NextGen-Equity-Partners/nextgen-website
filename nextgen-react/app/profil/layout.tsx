import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil — NextGen Equity Partners",
  description:
    "Wer wir sind, was uns antreibt und wie wir Wachstumskapital für den Mittelstand im DACH-Raum einsetzen.",
  alternates: { canonical: "/profil" },
  openGraph: {
    title: "Profil — NextGen Equity Partners",
    description:
      "Wer wir sind, was uns antreibt und wie wir Wachstumskapital für den Mittelstand im DACH-Raum einsetzen.",
    url: "/profil",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
