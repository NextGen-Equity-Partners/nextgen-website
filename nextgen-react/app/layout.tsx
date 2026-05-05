import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { LegalModal } from "@/components/layout/legal-modal";
import { Watermark } from "@/components/layout/watermark";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ScrollSnap } from "@/components/providers/scroll-snap";
import { ScrollProgress } from "@/components/providers/scroll-progress";
import { ScrollCue } from "@/components/providers/scroll-cue";
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

const SITE_DESCRIPTION =
  "Wir erwerben Mehrheitsbeteiligungen an gesunden Unternehmen in Business Services und entwickeln sie gemeinsam mit dem bestehenden Team weiter — mit eigenem Kapital, langfristigem Horizont und einem Team, das kauft, führt und umsetzt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "NextGen Equity Partners – Wachstumspartner für den Mittelstand.",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "NextGen Equity Partners",
    title: "NextGen Equity Partners – Wachstumspartner für den Mittelstand.",
    description: SITE_DESCRIPTION,
    images: [{ url: "/assets/og-image-v2.jpg", width: 1200, height: 630 }],
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Equity Partners – Wachstumspartner für den Mittelstand.",
    description: SITE_DESCRIPTION,
    images: ["/assets/og-image-v2.jpg"],
  },
  icons: { icon: "/assets/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`bg-image ${outfit.variable} ${outfit.className}`}>
        <HeroShader />
        <div className="grain"></div>

        <SmoothScrollProvider>
          <Nav />
          <Watermark />
          {children}
          <Footer />
          <PageAnimations />
          <PageEffects />
          <ScrollSnap />
          <ScrollProgress />
          <ScrollCue />
        </SmoothScrollProvider>

        <LegalModal />
      </body>
    </html>
  );
}
