// Hero slideshow: slow cross-fade between slides. CSS does the fade and the
// Ken Burns drift (a scale transition on .is-active); this just advances the
// active slide on a timer.

export function initHero() {
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length <= 1) return; // nothing to cycle

  // Honour reduced-motion: stay on the first slide, no cycling, no drift.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Prime the first slide so its Ken Burns plays on first view.
  //
  // The first slide ships with .is-active in the markup (see hero.html) so the
  // hero is never blank before JS runs — the no-JS, reduced-motion, and
  // single-slide paths all bail before this point and rely on that. But it
  // means the first slide is *born* at the active transform, scale(1.13), with
  // no earlier state to transition from, so its drift doesn't play until the
  // slide cycles back around.
  //
  // Fix: snap its transform to the resting scale with the transition
  // suppressed, commit that, then release it. The 11s transition now has a
  // real 1.05 → 1.13 path to run on this first view too. Opacity is left
  // alone, so the slide stays fully visible — no fade flicker.
  const first = slides[0];
  first.style.transition = 'none';
  first.style.transform = 'scale(1.05)';
  void first.offsetWidth;       // commit the resting transform with no transition
  first.style.transition = '';  // restore the CSS transition (opacity 2.4s, transform 11s)
  first.style.transform = '';   // release to .is-active's scale(1.13) → drifts in

  const HOLD = 6500; // ms per slide (overlaps the 2.4s CSS cross-fade)
  let i = 0;

  setInterval(() => {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    // Each incoming slide has been sitting at its resting scale(1.05) since it
    // was last shown, so adding .is-active gives the transform a clean
    // 1.05 → 1.13 path on its own. No reflow trick needed here — that
    // (and the old style.animation reset) was a leftover from the keyframe
    // implementation Ken Burns no longer uses.
    slides[i].classList.add('is-active');
  }, HOLD);
}