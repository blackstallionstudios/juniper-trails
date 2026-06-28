// ─────────────────────────────────────────────────────────────────────────
//  Settling reveals — "trail drift."
//
//  As you scroll, content settles into place: a gentle rise paired with a
//  small drift in from the right, toward the spine's lane on the left — as if
//  the trail running down the page is reaching each piece of content in turn.
//  It's the same intention as the spine, not a second unrelated effect.
//
//  Principles:
//    · One-time. Once something has settled it stays; we don't re-animate on
//      scroll-up (that reads as a gimmick).
//    · Staggered. Children within a group settle in sequence, not all at once,
//      so a section assembles rather than pops.
//    · Honest about reduced-motion: if the user asks for less, everything is
//      simply visible from the start — no transforms, no observer.
//
//  Markup contract (set in the partials):
//    [data-reveal]        an element that settles in.
//    [data-reveal-group]  a container whose [data-reveal] children stagger.
//  Hidden/visible state lives in CSS (.is-revealed); this only toggles it.
// ─────────────────────────────────────────────────────────────────────────

export function initReveal() {
  const items = [...document.querySelectorAll('[data-reveal]')];
  if (!items.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion (or no IntersectionObserver): show everything immediately.
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // Per-child stagger: each element's delay is its index within its group, so
  // a group of cards settles left-to-right rather than in a single block.
  items.forEach((el) => {
    const group = el.closest('[data-reveal-group]');
    if (!group) return;
    const siblings = [...group.querySelectorAll('[data-reveal]')].filter(
      (s) => s.closest('[data-reveal-group]') === group
    );
    const i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty('--reveal-i', String(i));
  });

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-revealed');
        obs.unobserve(e.target); // one-time
      });
    },
    // Fire a little before fully in view, and only once the element has
    // genuinely entered — bottom margin trims the trigger up from the fold.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
  );

  items.forEach((el) => io.observe(el));
}
