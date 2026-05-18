import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Wertsteigerung — NextGen Equity Partners",
  description:
    "Wie wir Künstliche Intelligenz einsetzen, um die Wertschöpfung in unseren Portfoliounternehmen zu beschleunigen und Wissensträger in den Mittelpunkt zu stellen.",
  alternates: { canonical: "/ki-wertsteigerung" },
  openGraph: {
    title: "KI-Wertsteigerung — NextGen Equity Partners",
    description:
      "Wie wir Künstliche Intelligenz einsetzen, um die Wertschöpfung in unseren Portfoliounternehmen zu beschleunigen und Wissensträger in den Mittelpunkt zu stellen.",
    url: "/ki-wertsteigerung",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
