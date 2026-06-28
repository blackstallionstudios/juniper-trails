# AGENTS.md — Juniper Trails B&B

Context for AI agents working in this repository.

## Purpose

Single-page marketing site for **Juniper Trails Bed & Breakfast** — a three-room B&B on 27 acres near Williams Lake, BC (Cariboo). Hosts: Steve & Emily. Domain: `junipertrails.ca`. No booking form; visitors call or email directly.

## Stack

| Layer | Choice |
|-------|--------|
| Build | **Vite 5** (`vite.config.js`) |
| Templating | **vite-plugin-handlebars** — partials compile at build time |
| Runtime | Vanilla **HTML + CSS + ES modules** (no React/Vue) |
| Fonts | Google Fonts: Cormorant Garamond (display) + DM Sans (body) |
| Deploy | **Vercel** (`vercel.json` → `dist/`, `cleanUrls`) |

No test suite yet. `playwright` and `linkedom` are in `package.json` but unused.

## Commands

```bash
npm install
npm run dev       # Vite dev server (localhost)
npm run build     # static output → dist/
npm run preview   # serve dist/ locally
```

## Architecture

```
index.html                 # Shell: meta/SEO, font links, {{> partial}} includes, CSS <link>
vite.config.js             # Handlebars plugin; passes site.js as template context
vercel.json                # Vite framework preset, asset cache headers

src/
  content/site.js          # ★ Single source of truth for ALL visitor-facing copy
  partials/                # Handlebars markup only — no hardcoded strings
    nav.html               # Sticky header, desktop + mobile menu
    spine.html             # Left-margin trail wayfinding nav
    hero.html              # Full-bleed slideshow + CTAs
    hosts.html             # Meet the hosts — framed trail portrait + signed welcome
    rooms.html             # Three named rooms (editorial gallery)
    breakfast.html         # Dark section, lead photo + 2-up gallery
    trails.html            # Activities, nearby places, seasonal note
    testimonials.html      # Pull-quotes (#guests)
    contact.html           # Phone, email, directions
    footer.html
  styles/
    main.css               # Entry: @imports tokens → base → sections (linked in <head>)
    tokens.css             # Design tokens (palette, type scale, spacing) — edit here first
    base.css               # Reset, typography, buttons, `.ph` photo placeholders
    sections.css           # Per-section layout and components
  js/
    nav.js                 # Transparent→solid nav on scroll; mobile toggle
    hero.js                # Slideshow timer + Ken Burns priming
    spine.js               # SVG trail path draw + active waypoint (≥1200px only)
    season.js              # `data-season` on `<html>`; reveals today's trails note
    reveal.js              # Scroll-triggered "trail drift" reveals (`data-reveal`)
  main.js                  # Entry: imports and inits all js/* modules (no CSS imports)

public/
  favicon.svg
  images/                  # Site photos — reference as `/images/...` in site.js
```

### Content flow

1. Edit copy in **`src/content/site.js`** only.
2. Partials use Handlebars (`{{field}}`, `{{#each}}`) bound to that object via `vite.config.js`.
3. Build emits fully static HTML (good for SEO; no client-side copy rendering).

**Do not** put visitor-facing strings in partials. **Do not** rename `site.js` fields without updating every partial that references them — the shape is the Decap CMS seam for V2.

### Client JS

- CSS is linked in `<head>` from `main.css`, **not** imported in `main.js` (avoids dev FOUC).
- All behaviour modules export `init*()` called from `main.js`.
- Respect `prefers-reduced-motion`: hero cycling, spine draw, and reveals all degrade gracefully.
- Season override for testing: `?season=winter|spring|summer|fall`.

## Section map

| Partial | `#id` | `site.js` key |
|---------|-------|---------------|
| hero | `#top` | `hero` |
| hosts | `#hosts` | `hosts` |
| rooms | `#rooms` | `rooms` |
| breakfast | `#breakfast` | `breakfast` |
| trails | `#trails` | `trails` |
| testimonials | `#guests` | `testimonials` |
| contact | `#contact` | `contact` |

Nav labels: `nav[]`. Spine waypoints: `spine[]` (parallel order, different labels).

## Design rules (locked)

- **Palette:** cream/parchment + deep forest dominant. Green `--accent` (`#85A20A`) is **CTAs and highlights only** — never a section background fill.
- **Type:** Cormorant Garamond for headings (never below ~18px); DM Sans for body/UI. Use tokens (`--fs-*`), not ad-hoc `font-size`.
- **Dark sections:** buttons use `--btn-on-dark` (warm neutral), not bright accent on forest.
- **Trail spine:** signature element; hidden below 1200px. Don't remove without explicit brief.
- **Photo placeholders:** `.ph` class + warm neutrals when `image.src` is empty.

## Images

- **Active site photos:** `public/images/` — set `image.src` paths in `site.js` (e.g. `/images/M1-HouseView.JPG`).
- **`images/art/`:** Emily's artwork JPGs; **not wired into the site**. Legacy/archive alongside `images/Images.zip`.
- Some `site.js` slide paths may reference photos not yet in `public/images/` — browser shows broken img until added.

## Files outside the build

| Path | Role |
|------|------|
| `README.md` | Human-oriented setup + checklist |
| `NOTES-redesign.md` | V1 redesign decisions, FOUC fix, launch confirmations |
| `JT Web June 25-26 2 Sections.docx` | Client brief (not consumed by build) |
| `public/images/README.md` | Photo drop instructions |

## Conventions for agents

1. **Copy changes** → `site.js` only. Add fields; avoid renaming existing ones.
2. **Layout/markup** → relevant partial in `src/partials/`.
3. **Visual tokens** → `tokens.css`; section-specific styles → `sections.css`.
4. **New behaviour** → new module in `src/js/`, export `init*()`, wire in `main.js`.
5. **New section** → partial + `site.js` block + `index.html` include + `nav`/`spine` entries + `sections.css`.
6. Keep diffs minimal; match existing comment style and naming (`BEM`-ish: `block__element`, `is-*` states).
7. No commits unless the user asks.

## Pre-launch gaps (see README)

- Testimonials in `site.js` are **placeholder** — replace with permission-cleared quotes.
- Confirm room names, rates, and contact details with Steve.
- Wire remaining photos into `public/images/` and `site.js`.

## V2 (planned, not implemented)

**Decap CMS** on Vercel + GitHub OAuth. `site.js` shape becomes CMS-backed YAML; partials stay unchanged. Do not add a runtime CMS or SSR without an explicit request.
