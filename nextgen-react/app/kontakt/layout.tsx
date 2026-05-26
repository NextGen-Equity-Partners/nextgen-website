import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Sprechen Sie mit uns über Beteiligungsmöglichkeiten, Wachstumskapital und Digitalisierung im Mittelstand. Hier finden Sie Ihren Kontakt zu NextGen Equity Partners.",
  path: "/kontakt",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={breadcrumbLd([{ name: "Kontakt", path: "/kontakt" }])} />
    </>
  );
}
