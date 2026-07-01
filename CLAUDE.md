# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **`AGENTS.md` is the canonical, detailed agent guide for this repo.** Read it for
> the full section map, design rules, image handling, and V2 plans. This file is the
> quick-start; AGENTS.md is the reference.

## What this is

Single-page marketing site for **Juniper Trails Bed & Breakfast** (three rooms, 27
acres near Williams Lake, BC; hosts Steve & Emily; domain `junipertrails.ca`). No
booking system — visitors call or email. Vanilla Vite + Handlebars + HTML/CSS/ES
modules. Deployed on Vercel (`dist/`).

## Commands

```bash
npm install
npm run dev       # Vite dev server, opens browser (--open)
npm run build     # static output → dist/
npm run preview   # serve built dist/ locally
```

No test suite. `playwright` and `linkedom` are in devDependencies but currently unused.

## The one architectural rule that matters

**All visitor-facing copy lives in `src/content/site.js` — never in the partials.**
The HTML partials in `src/partials/` are Handlebars templates that render from that
object at *build time* (wired in `vite.config.js`, which imports `site.js` as the
template context). Output is fully static HTML.

- **Copy / rates / room names / testimonials / contact** → edit `site.js` only.
- **Layout / markup** → the relevant partial in `src/partials/`.
- **Add `site.js` fields; do not rename existing ones.** The object shape is the
  intended Decap CMS seam for V2 — renaming a field silently breaks the partial that
  references it (Handlebars renders missing fields as empty).
- A new section needs all of: partial + `site.js` block + `index.html` include +
  `nav`/`spine` entries + styles in `sections.css`.

## CSS & JS wiring (non-obvious)

- CSS is linked as a real `<link>` in `index.html` `<head>` via `src/styles/main.css`
  (which `@import`s `tokens.css` → `base.css` → `sections.css`, in that order).
  **Do not** `import` CSS from `main.js` — that reintroduces the dev-only FOUC this
  setup deliberately fixed (see `NOTES-redesign.md`).
- Edit design tokens in `tokens.css` first (palette, type scale, spacing); use
  `--fs-*` tokens, never ad-hoc `font-size`. Section styles go in `sections.css`.
- Each `src/js/*` module exports an `init*()` called from `src/main.js`. New behaviour
  = new module + wire it in `main.js`.
- Motion (hero cycling, spine draw, reveals) must degrade under `prefers-reduced-motion`.
- Season override for testing: append `?season=winter|spring|summer|fall`.

## Images

- Active site photos live in `public/images/`; reference them as `/images/…` paths in
  `site.js` `image.src` fields. Empty `src` renders a `.ph` warm-neutral placeholder so
  layout never breaks.
- Some `site.js` slide paths reference photos not yet added to `public/images/` — those
  show as broken images until the file is dropped in. `images/` (repo root) holds
  source/legacy photos and Emily's artwork; it is **not** the build's image source.

## Conventions

- BEM-ish class naming (`block__element`, `is-*` states); match existing comment style.
- Keep diffs minimal.
- **No commits unless the user asks.**
- Don't add a runtime CMS or SSR without an explicit request (V2 = Decap CMS, planned only).
