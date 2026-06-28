# Juniper Trails — V1 redesign notes

Pass over the V0 build to fix two reported issues and lift the design from
"competent template" to something with a point of view. Content stays in
`src/content/site.js` (the Decap seam is untouched — fields were added, none
renamed).

## The two reported issues — fixed

**1. Unstyled flash on localhost (FOUC).**
Cause: CSS was imported through `main.js` (`import './styles/…css'`). Vite
injects JS-imported CSS *after* first paint in dev, so the page flashed
unstyled; the production build extracts it to a real `<link>`, which is why
only dev flashed. Fix: a single `src/styles/main.css` `@import`s the three
stylesheets in order and is linked once as a real render-blocking
`<link rel="stylesheet">` in `<head>`; the CSS imports are gone from `main.js`.
Verified in the live dev DOM: stylesheet is in `<head>`, zero JS-injected
`<style data-vite-dev-id>` tags.

**2. Uncorrelated font sizes.**
The display sizes sat on no consistent ratio (steps of 1.54, 1.76, 1.32…).
Rebuilt as one ladder in `tokens.css` where each display step is exactly
1.5625× (= 1.25²) the one below at its max — `--fs-lead → --fs-h3 → --fs-h2 →
--fs-hero`. DM Sans keeps a fixed functional trio (`--fs-body/sm/eyebrow`).
Every orphan `font-size` across base/sections was replaced with a token.

## The signature

A meandering **trail spine** down the left margin (`partials/spine.html` +
`js/spine.js`): a real `<nav>` of anchor links that draws an accent-green
"walked" path as far as you've scrolled, lights the active section, and labels
each waypoint. Literal to "Juniper *Trails*," doubles as section nav + scroll
progress. Hidden below 1200px and degrades to nothing without JS;
reduced-motion shows the faint trail with active-node highlighting only, no
draw animation.

## Meet the hosts (new section)

Added a `hosts` section — the "hosts are the product" thesis, stated plainly and
placed high (Hero → **Hosts** → Rooms). The rest of the page already carried
that thesis but only through *Steve* (rooms named for his dogs, "Steve cooks,"
"Steve paints"); Emily had no presence beyond the `site.hosts` label. This
section is the human anchor that introduces both as an equal pair before the
later Steve-craft beats elaborate. New `hosts` block in `site.js`
(`eyebrow / heading / lead / body[] / signature / signatureNote / image`), a
`#hosts` nav link and spine waypoint ("The hosts"), and a `.hosts__*` block in
`sections.css`.

Layout: a square, matted trail portrait (cream mat on the section's parchment
ground, warm hairline + soft shadow) beside a short first-person welcome signed
"— Steve & Emily, and the dogs." The framed plate intentionally rhymes with the
hung canvases in the artwork rail: the first "work on the wall" you meet is the
hosts themselves. Section is `section--parchment` (not dark — the forest-deep
ground stays reserved for the breakfast→artwork "this is Steve" stretch; and not
a green fill). Photo: the supplied trail selfie, graded warm to sit in the
parchment palette (warm WB, ~15% desat, shadows lifted toward `--bark` rather
than black) and cropped 1:1 to hold both faces on the diagonal and drop the
blown-out sky — `public/images/H1-SteveEmily-Trail.jpg`, 1280².

Confirm with Steve: whether to keep "and the dogs" in the sign-off (and, if so,
current dog names elsewhere), and that both are comfortable being described as
"runners and walkers."

## Other changes

- Hero: rewrote the keyword-stuffed headline to "Stay where the trails begin.";
  fixed a broken slide (it pointed at `P1-Parlour-ViewOfProperty.jpg`, which
  doesn't exist) — rotation is now M3 (land) → T1 (Farwell ride) → M1 (house);
  CTA "Reserve" → "Plan your stay" (there's no booking system).
- Rooms: dropped the card chrome for an editorial gallery (taller photos,
  hairline meta line). No 01/02/03 markers — rooms aren't a sequence.
- Breakfast: now leads with BR1 (coffee + muffins + the valley out the window)
  and a small supporting 2-up of the scone/omelette shots.
- Trails: wired T1; completed the dangling activities sentence (see below).
- Testimonials: boxy accent-bar cards → quiet italic pull-quotes.
- Wove in verified specifics from guest reviews: rooms named for the family's
  dogs, garden raspberries, fresh-baked mornings, Steve's trail knowledge.

## Confirm with Steve before launch

1. **Room name.** The brief said "The Suite"; the photo filename and guest
   reviews call it **"Chase's Place"** (which *is* the suite). Kept as Chase's
   Place — confirm.
2. **"Horsefly and Likely."** Completed the V0 `[INCOMPLETE]` line; both are
   real gold-rush communities near Williams Lake. Quick confirm on the pairing.
3. **Testimonials** are placeholder (paraphrased, not lifted) with the source
   field reading "Placeholder — replace before launch." Needs permission-
   cleared guest quotes.

## Still parked for V2

Decap CMS (Vercel → GitHub OAuth, not Netlify Identity). The content shape is
ready for it. `P3-Parlour-ViewOfParlour.jpg` is in `public/images` but unused —
kept for a possible "common spaces" block later.
