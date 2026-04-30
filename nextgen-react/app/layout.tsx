import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { HeroShader } from "@/components/layout/hero-shader";
import { PageAnimations } from "@/components/animations/page-animations";
import { MagneticButtons } from "@/components/animations/magnetic-buttons";
import { CursorProxy } from "@/components/animations/cursor-proxy";
import { SharedRuntime } from "@/components/providers/shared-runtime";

const SITE = "https://nextgen-equity.com";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
      </head>
      <body className="bg-image">
        <HeroShader />
        <div className="grain"></div>

        <SmoothScrollProvider>
          <Nav />
          {children}
          <Footer />
          <PageAnimations />
          <MagneticButtons />
          <CursorProxy />
        </SmoothScrollProvider>

        <div className="imp-backdrop" id="imp-backdrop">
          <div className="imp-panel">
            <button className="imp-close" id="imp-close" aria-label="Schließen">✕</button>
            <div className="imp-eyebrow">Rechtliches</div>
            <div className="imp-title" id="imp-title">Impressum</div>
            <div className="imp-body" id="imp-body"></div>
          </div>
        </div>

        <Script id="set-lang" strategy="beforeInteractive">{`
          if (typeof document !== 'undefined' && location.pathname.toLowerCase().startsWith('/en')) {
            document.documentElement.lang = 'en';
          }
        `}</Script>
        <SharedRuntime />
      </body>
    </html>
  );
}
