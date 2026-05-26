import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { LegalModal } from "@/components/layout/legal-modal";
import { Watermark } from "@/components/layout/watermark";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/providers/scroll-progress";
import { ScrollCue } from "@/components/providers/scroll-cue";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { HeroShader } from "@/components/layout/hero-shader";
import { PageAnimations } from "@/components/animations/page-animations";
import { PageEffects } from "@/components/runtime/page-effects";

const SITE = "https://nextgen-equity.com";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

const SITE_TITLE = "Wachstumskapital und Digitalisierung für Unternehmensgruppen im Mittelstand.";
const SITE_DESCRIPTION =
  "Unsere Mission bei NextGen Equity Partners ist die Entwicklung kleiner und mittlerer Dienstleistungsunternehmen im DACH-Raum zu technologisch und marktführenden Unternehmensgruppen. Wir setzen Wachstumskapital ein, um die Substanz des Mittelstands zu stärken und KI-befähigte Wissensträger in den Mittelpunkt zu stellen.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "NextGen Equity Partners",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE,
    images: [{ url: "/assets/og-image-v6.jpg", width: 1200, height: 630 }],
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/assets/og-image-v6.jpg"],
  },
  icons: { icon: "/assets/favicon.svg?v=2" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  name: "NextGen Equity Partners",
  alternateName: "NextGen Equity",
  url: SITE,
  logo: `${SITE}/assets/logo-blue.svg`,
  image: `${SITE}/assets/og-image-v6.jpg`,
  description: SITE_DESCRIPTION,
  email: "contact@nextgen-equity.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Leopoldstraße 21",
    postalCode: "80802",
    addressLocality: "München",
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
  sameAs: [] as string[],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`bg-image ${outfit.variable} ${outfit.className}`}>
        <LocaleProvider>
          <HeroShader />
          <div className="grain"></div>

          <SmoothScrollProvider>
            <Nav />
            <Watermark />
            {children}
            <Footer />
            <PageAnimations />
            <PageEffects />
            <ScrollProgress />
            <ScrollCue />
          </SmoothScrollProvider>

          <LegalModal />
        </LocaleProvider>
      </body>
    </html>
  );
}
