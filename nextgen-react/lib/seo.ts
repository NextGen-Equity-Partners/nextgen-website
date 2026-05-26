import type { Metadata } from "next";

/** Canonical production origin. No trailing slash. */
export const SITE = "https://nextgen-equity.com";
/** Full legal/display name, used consistently across titles and schema. */
export const SITE_NAME = "NextGen Equity Partners";
/** Short brand form (matches schema alternateName). */
export const SITE_SHORT_NAME = "NextGen Equity";
/** Company LinkedIn (canonical, tracking params stripped). */
export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/nextgen-equity/";
/** 1200×630 social preview shared by every page. */
export const OG_IMAGE = "/assets/og-image-v6.jpg";

export const SITE_DESCRIPTION =
  "Unsere Mission bei NextGen Equity Partners ist die Entwicklung kleiner und mittlerer Dienstleistungsunternehmen im DACH-Raum zu technologisch und marktführenden Unternehmensgruppen. Wir setzen Wachstumskapital ein, um die Substanz des Mittelstands zu stärken und KI-befähigte Wissensträger in den Mittelpunkt zu stellen.";

/**
 * Build complete, self-consistent metadata for a sub-page.
 *
 * Next.js shallow-merges `openGraph`/`twitter`, so a page that sets only
 * `title`/`description` loses the parent's image, type, siteName and locale.
 * This helper always emits the full set, so every page has a correct social
 * preview and canonical URL. The `<title>` tag is left to the root
 * `title.template`, while OG/Twitter titles carry the brand explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page-specific title, without the brand suffix (the root template adds it). */
  title: string;
  description: string;
  /** Absolute path from the site root, e.g. "/profil". */
  path: string;
}): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
