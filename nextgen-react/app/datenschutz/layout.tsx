import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der NextGen Equity Partners GmbH gemäß DSGVO.",
  path: "/datenschutz",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={breadcrumbLd([{ name: "Datenschutzerklärung", path: "/datenschutz" }])} />
    </>
  );
}
