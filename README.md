# Juniper Trails B&B

Single-page site for Steve & Emily's bed & breakfast, on 27 acres outside
Williams Lake, BC. Vanilla **Vite + HTML + CSS + JS**, deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # static build → dist/
npm run preview    # serve the built dist/ locally
```

## How content works

There are **no hardcoded strings in the markup**. Every visitor-facing word
lives in one file:

```
src/content/site.js
```

The HTML partials in `src/partials/` render from that object at **build time**
via `vite-plugin-handlebars` (configured in `vite.config.js`). Output is fully
static HTML — good for SEO, no client-side rendering of copy.

To change wording, rates, room descriptions, testimonials, or contact details,
edit `site.js`. Don't touch the partials for copy changes.

### Adding photos

Drop images in `public/images/` and set the `image.src` field on the matching
entry in `site.js` (e.g. `hero.image.src = '/images/property-wide.jpg'`). Any
entry with an empty `src` shows a labelled warm-neutral placeholder, so the
layout never breaks while you wait on photos.

## Structure

```
index.html              layout + partial includes
src/
  content/site.js        ← single source of truth for all copy
  partials/              section markup (renders from site.js)
  styles/
    tokens.css           palette, type, spacing (CSS variables)
    base.css             reset, typography, buttons, primitives
    sections.css         per-section styles
  js/nav.js              nav transparent→solid on scroll
  main.js                entry: imports styles + JS
public/
  favicon.svg
  images/                photos go here
```

## Design system (locked)

- **Palette:** cream/parchment + deep forest dominant. Green (`--accent`,
  `#85A20A`) is for **CTAs and highlights only** — never a background fill.
- **Type:** Cormorant Garamond (display/headings, never below ~18px) +
  DM Sans (body, UI, captions).
- Dark sections use a warm-neutral button (`--btn-on-dark`), never the bright
  accent on dark green.

## Deploy

Pushed to GitHub, hosted on Vercel. Vercel auto-deploys `main`. Config in
`vercel.json` (framework: vite, output: `dist/`).

## V2 — Decap CMS (planned, not in V1)

The content seam is already in place: `site.js` holds the editable shape.
When Decap is added, that object gets sourced from Decap's YAML/markdown
instead of being hand-edited, and the partials stay as-is. Keep the field
shape in `site.js` stable; add fields rather than renaming them.

## Before launch — checklist

- [ ] Replace placeholder testimonials in `site.js` with real,
      permission-cleared guest reviews (don't paste verbatim from
      TripAdvisor/Google).
- [ ] Add real photos to `public/images/` and wire up `image.src` fields.
- [ ] Confirm room descriptions and rates with Steve.
- [ ] Verify phone/email once more before going live.
