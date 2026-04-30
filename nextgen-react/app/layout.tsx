import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroMark } from "@/components/layout/hero-mark";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { HeroShader } from "@/components/layout/hero-shader";
import { PageAnimations } from "@/components/animations/page-animations";
import { MagneticButtons } from "@/components/animations/magnetic-buttons";
import { CursorProxy } from "@/components/animations/cursor-proxy";

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
          <HeroMark />
          <PageAnimations />
          <MagneticButtons />
          <CursorProxy />
        </SmoothScrollProvider>
        <script
          id="nav-runtime"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function bindNav() {
                  var nav = document.getElementById('nav');
                  if (nav && !window.__nextgenNavScrollBound) {
                    window.__nextgenNavScrollBound = true;
                    var setNavScrolled = function () {
                      var top = window.scrollY || document.documentElement.scrollTop || 0;
                      nav.classList.toggle('is-scrolled', top > 8);
                    };
                    setNavScrolled();
                    window.addEventListener('scroll', setNavScrolled, { passive: true });
                  }

                  var burger = document.getElementById('nav-burger');
                  var mobile = document.getElementById('nav-mobile');
                  if (burger && mobile && !window.__nextgenNavMobileBound) {
                    window.__nextgenNavMobileBound = true;
                    burger.addEventListener('click', function () {
                      var open = !mobile.classList.contains('open');
                      burger.classList.toggle('open', open);
                      burger.setAttribute('aria-expanded', String(open));
                      mobile.classList.toggle('open', open);
                    });
                    mobile.querySelectorAll('a').forEach(function (link) {
                      link.addEventListener('click', function () {
                        burger.classList.remove('open');
                        burger.setAttribute('aria-expanded', 'false');
                        mobile.classList.remove('open');
                      });
                    });
                  }
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', bindNav, { once: true });
                } else {
                  bindNav();
                }
              })();
            `,
          }}
        />

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
        <Script src="/shared.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
