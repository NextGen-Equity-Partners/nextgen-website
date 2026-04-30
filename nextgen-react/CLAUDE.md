# NextGen React Maintenance Guide

This project is a Next.js App Router site with a small set of reusable UI primitives and page content data.

## Architecture Rules

- Keep visual ownership local: component-specific responsive rules belong in that component's CSS file.
- Do not add new rules to `app/styles/responsive.css`; it is intentionally deprecated.
- Do not add global overrides from page-specific CSS files. Scope page-only styles to page-specific classes.
- Prefer reusable primitives from `components/ui/` before writing raw repeated markup in a page.
- Keep page text and card data in `lib/content/` for migrated pages.
- Avoid inline styles in pages unless the value is genuinely one-off and not part of a reusable pattern.

## Common Change Locations

- Header/nav glass, scroll state, mobile menu: `app/styles/nav.css`
- Hero layout and hero responsive behavior: `app/styles/hero.css`
- Generic pane sections and typography: `app/styles/sections.css`
- Glass cards and card grids: `app/styles/glass-cards.css`
- Page-wide reveal/tilt DOM effects: `components/runtime/page-effects.tsx`
- Hero GSAP animation: `components/animations/page-animations.tsx`
- Legal modal content/behavior: `components/layout/legal-modal.tsx`
- Contact form behavior: `components/forms/contact-form.tsx`

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

Do not edit `bg-image.css`, `animations-lab.css`, or `responsive.css` for header glass changes.

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

Check both desktop and mobile widths. The mobile nav should show the burger, not desktop links.

## Known Intentional State

- `/en` routes have been removed.
- `public/shared.js` has been removed; do not recreate imperative global runtime scripts.
- Three.js / React Three dependencies were removed with the old floating shard components.
- `app/styles/responsive.css` is kept only as a deprecated compatibility import and should stay empty.
