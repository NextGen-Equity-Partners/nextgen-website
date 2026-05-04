# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

This repo contains the NextGen Equity Partners marketing site. All active code lives in `nextgen-react/`. Everything in `archive/` is reference-only and is not deployed.

```
nextgen-react/   # Active Next.js 16 / React 19 app (the only thing that ships)
archive/
  static-site/   # Original static HTML/CSS/JS site (visual reference)
  experiments/   # Prior variants (liquid-glass, video-only, onepage)
  docs/          # Source .docx documents
```

When the user describes a "page" or "component" without qualifying, they mean the one in `nextgen-react/`. Do not edit `archive/` to fix bugs in the live site.

A more detailed maintenance guide lives at `nextgen-react/CLAUDE.md` — read it before making structural changes. The same rules also exist in `nextgen-react/AGENTS.md` for Codex.

## Commands

All commands run from `nextgen-react/`:

```bash
npm install
npm run dev          # webpack dev server, http://localhost:3000
npm run dev:turbo    # turbopack variant
npm run build        # webpack production build
npm run start        # serve production build
npm run typecheck    # tsc --noEmit
npm run lint         # alias for typecheck — there is no separate ESLint config
```

After structural changes, the project's verification recipe is `npm install && npm exec -- tsc --noEmit && npm run build`. There is no test suite (Playwright tooling exists historically for visual diffing against `archive/static-site/` but is not part of the active workflow).

## Architecture (big picture)

- **App Router, single locale.** Routes are German-only: `/`, `/profil`, `/ansatz`, `/ki-wertsteigerung`, `/team`, `/beteiligungen`, `/kontakt`, plus `/animations` (visual lab). The previously-mentioned `/en` mirror has been removed — do not recreate it.
- **Content is data, not JSX-in-pages.** Migrated pages keep their copy and card data in `lib/content/*.tsx` and render via primitives in `components/ui/` (`Hero`, `Section`, `GlassCard`, `GlassIcon`). Add new sections by extending the content module and reusing primitives, not by duplicating markup.
- **Styling is component-scoped CSS, not Tailwind.** The design system is split across files in `app/styles/` (one file per concern: `nav.css`, `hero.css`, `glass-cards.css`, `sections.css`, etc.) plus tokens in `tokens.css`. `app/styles/responsive.css` is intentionally deprecated — leave it empty. Do not add page-specific overrides to global files; scope to page-specific classes.
- **Runtime effects live in client components mounted from `app/layout.tsx`**, not in global scripts. The chain in the root layout is: `SmoothScrollProvider` (Lenis + GSAP ScrollTrigger sync) → `Nav` / `Watermark` / page → `Footer` → `PageAnimations` (hero GSAP) → `PageEffects` (reveal-on-scroll + tilt, rebound on `usePathname` change) → `MagneticButtons` → `CursorProxy` → `LegalModal`. `public/shared.js` was removed — do not recreate imperative global runtime scripts.
- **Lenis ↔ ScrollTrigger wiring is load-bearing.** `SmoothScrollProvider` lets Lenis own its RAF (`autoRaf: true`) and only forwards `onScroll` to `ScrollTrigger.update()`. The earlier ref-based wiring caused a first-tick race that froze the page. Keep this pattern.
- **No Three.js / WebGL in the active app.** Despite `@react-three/*` and `three` being in `package.json`, the floating-shard components that used them have been removed. The current "shader" backdrop is `components/layout/hero-shader.tsx` via `@paper-design/shaders-react`. The 2D animation lab under `components/animations-2d/` and `components/animations-lab/` (rendered at `/animations`) is canvas/SVG-based, not WebGL.
- **Path alias.** `@/*` maps to `nextgen-react/*` (see `tsconfig.json`). Imports use `@/components/...`, `@/lib/content/...`.

## Editing rules to preserve

These are codified in `nextgen-react/CLAUDE.md` and `nextgen-react/AGENTS.md`; calling them out here so they're not lost:

- Header glass changes go only in `app/styles/nav.css` via the `--nav-pill-*` and `--nav-top-glow*` CSS variables. Don't touch `bg-image.css`, `animations-lab.css`, or `responsive.css` for nav glass.
- `kontakt` and `beteiligungen` are deliberately less content-extracted than the other migrated pages. Don't expand their `lib/content/` extraction without a concrete reason.
- Prefer reusing primitives in `components/ui/` over repeating hero / section / glass-card markup in pages.
- Avoid inline styles in pages unless the value is genuinely one-off.

## Deployment

Vercel, with project root set to `nextgen-react/`. All routes prerender as `○ Static`. The repo `.vercelignore` excludes archive cruft (legacy onepage HTML, raw photo assets) so they don't get bundled.
