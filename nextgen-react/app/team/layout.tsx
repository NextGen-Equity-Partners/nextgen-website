import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, teamLd } from "@/lib/structured-data";
import { team } from "@/lib/content/team";

export const metadata = pageMetadata({
  title: "Team",
  description:
    "Die Menschen hinter NextGen Equity Partners — Partner, erweitertes Team und unsere Philosophie für die Entwicklung mittelständischer Unternehmensgruppen.",
  path: "/team",
});

// Person entities for every team member, sourced from the German content
// (names/roles are the same data shown on the page) so AI engines can
// attribute the people to the firm. LinkedIn URLs carry through as sameAs.
const members = [...team.de.partners, ...team.de.extended].map((m) => ({
  name: m.name,
  role: m.role,
  image: m.image,
  linkedin: m.linkedin,
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={[breadcrumbLd([{ name: "Team", path: "/team" }]), ...teamLd(members)]}
      />
    </>
  );
}
