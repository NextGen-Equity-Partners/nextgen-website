import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Profil",
  description:
    "Wer wir sind, was uns antreibt und wie wir Wachstumskapital für den Mittelstand im DACH-Raum einsetzen.",
  path: "/profil",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={breadcrumbLd([{ name: "Profil", path: "/profil" }])} />
    </>
  );
}
