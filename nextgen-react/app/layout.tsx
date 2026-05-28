import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Watermark } from "@/components/layout/watermark";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/providers/scroll-progress";
import { ScrollCue } from "@/components/providers/scroll-cue";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { HeroShader } from "@/components/layout/hero-shader";
import { PageAnimations } from "@/components/animations/page-animations";
import { PageEffects } from "@/components/runtime/page-effects";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import { SITE, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

// Home (default) title leads with the brand + positioning.
// Every sub-page sets its own short title; the template appends the brand.
const HOME_TITLE = "NextGen Equity Partners | Private Equity für den deutschen Mittelstand";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: HOME_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
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
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: { icon: "/assets/favicon.svg?v=2" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="color-scheme" content="dark" />
        <JsonLd data={[organizationLd, websiteLd]} />
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
        </LocaleProvider>
      </body>
    </html>
  );
}
