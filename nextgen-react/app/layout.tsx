import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { LegalModal } from "@/components/layout/legal-modal";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { HeroShader } from "@/components/layout/hero-shader";
import { PageAnimations } from "@/components/animations/page-animations";
import { MagneticButtons } from "@/components/animations/magnetic-buttons";
import { CursorProxy } from "@/components/animations/cursor-proxy";
import { PageEffects } from "@/components/runtime/page-effects";

const SITE = "https://nextgen-equity.com";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "NextGen Equity Partners – Wachstumspartner für den Mittelstand.",
  description:
    "NextGen Equity – Partner für Unternehmer in Business Services. Wachstumskapital, operative Erfahrung und KI-Kompetenz.",
  openGraph: {
    type: "website",
    siteName: "NextGen Equity Partners",
    title: "NextGen Equity Partners – Wachstumspartner für den Mittelstand.",
    description:
      "Mehrheitsbeteiligungen an gesunden Unternehmen in Business Services. Mit eigenem Kapital und langfristigem Horizont.",
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }],
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Equity Partners",
    description: "Mehrheitsbeteiligungen im Mittelstand.",
    images: ["/assets/og-image.jpg"],
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
          {children}
          <Footer />
          <PageAnimations />
          <PageEffects />
          <MagneticButtons />
          <CursorProxy />
        </SmoothScrollProvider>

        <LegalModal />
      </body>
    </html>
  );
}
