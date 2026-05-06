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
  openGraph: {
    type: "website",
    siteName: "NextGen Equity Partners",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="color-scheme" content="dark" />
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
