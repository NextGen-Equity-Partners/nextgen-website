import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Ansatz",
  description:
    "Unser Ansatz: kennenlernen, gemeinsam aufbauen, Wertschöpfung. So entwickeln wir mittelständische Dienstleister zu Unternehmensgruppen.",
  path: "/ansatz",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={breadcrumbLd([{ name: "Ansatz", path: "/ansatz" }])} />
    </>
  );
}
