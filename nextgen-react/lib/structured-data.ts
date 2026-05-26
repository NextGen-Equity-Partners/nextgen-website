import {
  SITE,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_DESCRIPTION,
  COMPANY_LINKEDIN,
  OG_IMAGE,
} from "@/lib/seo";

/** Stable @id anchors so the entities form one linked graph. */
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

/**
 * Organization / FinancialService (a LocalBusiness subtype). The München
 * address is a real office, so this doubles as the LocalBusiness entity.
 * No telephone or opening hours are published by request.
 */
export const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE,
  logo: `${SITE}/assets/logo-blue.svg`,
  image: `${SITE}${OG_IMAGE}`,
  description: SITE_DESCRIPTION,
  email: "contact@nextgen-equity.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Leopoldstraße 21",
    postalCode: "80802",
    addressLocality: "München",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
  ],
  knowsAbout: [
    "Private Equity",
    "Wachstumskapital",
    "Mittelstand",
    "Unternehmensgruppen",
    "Digitalisierung",
    "Künstliche Intelligenz",
    "ESG",
    "Buy-and-Build",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "contact@nextgen-equity.com",
    availableLanguage: ["de", "en"],
  },
  sameAs: [COMPANY_LINKEDIN],
};

/** WebSite entity, published by the Organization. No on-site search → no SearchAction. */
export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE,
  name: SITE_NAME,
  inLanguage: "de-DE",
  publisher: { "@id": ORG_ID },
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Member = { name: string; role: string; image: string; linkedin?: string };

/** Person entities for the team, each linked to the Organization via worksFor. */
export function teamLd(members: Member[]) {
  return members.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/team#${slug(m.name)}`,
    name: m.name,
    jobTitle: m.role,
    worksFor: { "@id": ORG_ID },
    image: `${SITE}${m.image}`,
    ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
  }));
}

/** BreadcrumbList. `trail` is everything after the home node, in order. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Start", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

/** FAQPage. Answers must restate facts already published on the site. */
export function faqLd(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
