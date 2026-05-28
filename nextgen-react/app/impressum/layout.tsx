import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum der NextGen Equity Partners GmbH gemäß § 5 TMG.",
  path: "/impressum",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={breadcrumbLd([{ name: "Impressum", path: "/impressum" }])} />
    </>
  );
}
