// ─────────────────────────────────────────────────────────────────────────
//  Seasonal touch — "real people live here."
//
//  Picks the season from the visitor's own clock and reveals the matching
//  Trails note. The partial renders all four seasonal lines (static HTML);
//  this shows only the one for today's season.
//
//  No animation, no reduced-motion concerns — it's a content switch. Runs on
//  every load so a July visitor sees summer and a January visitor sees winter,
//  with no server or build-time date baked in.
// ─────────────────────────────────────────────────────────────────────────

// Meteorological seasons, Northern Hemisphere (correct for the Cariboo):
//   Dec–Feb winter · Mar–May spring · Jun–Aug summer · Sep–Nov fall
export function seasonFor(date = new Date()) {
  const m = date.getMonth(); // 0–11
  if (m <= 1 || m === 11) return 'winter';
  if (m <= 4) return 'spring';
  if (m <= 7) return 'summer';
  return 'fall';
}

const SEASONS = ['winter', 'spring', 'summer', 'fall'];

// Allow ?season=winter to force a season — for testing all four locally and
// for sending a host a preview link (e.g. ?season=fall) before that season
// arrives. Falls through to the real date when absent or invalid.
function overrideSeason() {
  try {
    const q = new URLSearchParams(window.location.search).get('season');
    return q && SEASONS.includes(q) ? q : null;
  } catch {
    return null;
  }
}

export function initSeason() {
  const season = overrideSeason() || seasonFor();

  // Reveal the matching Trails note, if present.
  const note = document.querySelector('[data-season-note]');
  if (!note) return;

  const match = note.querySelector(`.trails__season-line[data-season="${season}"]`);
  if (!match) return; // that season intentionally left blank — stay hidden

  match.hidden = false;
  note.hidden = false;
}
