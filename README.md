# NextGen Equity Partners — Website (V6)

Marketing website for [NextGen Equity Partners](https://nextgen-equity.com), a Munich-based private equity firm investing in mid-market companies in Business Services across DACH.

## Active stack

- **Next.js 15.5** (App Router, React 19, TypeScript 5)
- **Tailwind CSS 4** (utility classes for new components — legacy CSS in `globals.css`)
- **GSAP 3.15** (free since 2024 incl. SplitText, ScrollTrigger, MorphSVG)
- **Lenis 1.3** (smooth scroll, synced with GSAP ticker)
- **three.js 0.176** + **@react-three/fiber 9.6** + **drei 10.7** + **postprocessing 3.0** (3D / WebGL)
- **Playwright** (visual regression vs. legacy static site)

## Structure

```
.
├── nextgen-react/              # Active Next.js app
│   ├── app/                    # App Router pages
│   │   ├── page.tsx            # / (DE home)
│   │   ├── {profil,ansatz,ki-wertsteigerung,team,beteiligungen,kontakt}/page.tsx
│   │   ├── en/                 # /en/* English mirror
│   │   ├── layout.tsx          # Root layout (nav, footer, modal, shared.js)
│   │   └── globals.css         # Design system (~2.6k lines, 1:1 from shared.css)
│   ├── components/layout/      # Nav (with lang-switch), Footer
│   ├── public/
│   │   ├── shared.js           # Runtime (reveal, tilt, modal, scroll-video)
│   │   └── assets/             # Logos, hero videos, team portraits
│   └── scripts/
│       ├── convert.mjs         # HTML→JSX migration tool
│       └── compare.mjs         # Playwright side-by-side vs. legacy
├── archive/                    # Reference only — not deployed
│   ├── static-site/            # Original static HTML/CSS/JS site
│   ├── experiments/            # Variants: liquid-glass, video-only, onepage
│   └── docs/                   # Source documents (.docx)
└── README.md
```

## Local development

```bash
cd nextgen-react
npm install
npm run dev          # http://localhost:3000
```

Build:

```bash
npm run build
npm run start        # http://localhost:3000
```

## Visual comparison vs. legacy

The original static site is in `archive/static-site/` and can be served with any static server (e.g. `vite preview`, `python -m http.server`) for side-by-side comparison.

```bash
cd nextgen-react
node scripts/compare.mjs   # Generates compare-out/index.html with screenshots
```

## Deployment

Vercel — project root: `nextgen-react/`. Static-prerendered (all routes are `○ Static`).

## License

© 2026 NextGen Equity Partners GmbH · All rights reserved.
