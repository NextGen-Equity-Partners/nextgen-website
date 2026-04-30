# Codex Working Guide

This is a Next.js App Router site. The main maintenance goal is fast, local edits:
small visual or content changes should be possible without searching through global
CSS or page-sized markup files.

## Architecture Rules

- Keep ownership local. Styles for a component, section, or pattern belong in the
  matching file under `app/styles/`.
- Do not add new rules to `app/styles/responsive.css`; it is intentionally
  deprecated and should stay empty except for its comment.
- Do not create new global catch-all files for page-specific fixes.
- Prefer the reusable primitives in `components/ui/` before repeating raw section,
  hero, or glass-card markup.
- Keep migrated page text and card data in `lib/content/`.
- Keep runtime browser behavior inside focused client components, not global
  scripts in `public/`.
- Avoid inline styles in pages unless the value is genuinely one-off.

## Common Change Locations

- Header/nav glass, scroll state, mobile menu: `app/styles/nav.css`
- Hero layout and hero responsive behavior: `app/styles/hero.css`
- Generic pane sections and typography: `app/styles/sections.css`
- Glass cards and card grids: `app/styles/glass-cards.css`
- Contact form layout and behavior: `app/styles/contact-form.css` and
  `components/forms/contact-form.tsx`
- Page-wide reveal/tilt DOM effects: `components/runtime/page-effects.tsx`
- Hero GSAP animation: `components/animations/page-animations.tsx`
- Legal modal content/behavior: `components/layout/legal-modal.tsx`
- Reusable layout primitives: `components/ui/`
- Migrated page content: `lib/content/`

## Header Glass Changes

Header gloss should be changed only in `app/styles/nav.css`.

Use the CSS variables at the top of `.nav`:

- `--nav-pill-bg`
- `--nav-pill-bg-scrolled`
- `--nav-pill-blur`
- `--nav-pill-blur-scrolled`
- `--nav-pill-shadow`
- `--nav-top-glow`
- `--nav-top-glow-opacity`

Do not edit `bg-image.css`, `animations-lab.css`, or `responsive.css` for header
glass changes.

## Verification

Run these after structural changes:

```bash
npm install
npm exec -- tsc --noEmit
npm run build
```

For browser sanity, run the dev server and check:

- `/`
- `/profil`
- `/ansatz`
- `/ki-wertsteigerung`
- `/team`
- `/beteiligungen`
- `/kontakt`
- `/animations`

Check desktop and mobile widths. The mobile nav should show the burger, not the
desktop links.

## Known Intentional State

- `/en` routes have been removed.
- `public/shared.js` has been removed; do not recreate imperative global runtime
  scripts.
- Three.js / React Three dependencies were removed with the old floating shard
  components.
- `app/styles/responsive.css` is kept only as a deprecated compatibility import.
- `kontakt` and `beteiligungen` are less content-extracted than the migrated main
  pages; do not expand them unless there is a concrete maintenance benefit.
