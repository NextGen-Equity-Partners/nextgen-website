import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "KI-Wertsteigerung",
  description:
    "Wie wir Künstliche Intelligenz einsetzen, um die Wertschöpfung in unseren Portfoliounternehmen zu beschleunigen und Wissensträger in den Mittelpunkt zu stellen.",
  path: "/ki-wertsteigerung",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={breadcrumbLd([{ name: "KI-Wertsteigerung", path: "/ki-wertsteigerung" }])} />
    </>
  );
}
