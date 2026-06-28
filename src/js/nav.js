// Nav behaviour:
//  1. Transparent over the dark hero, solid (blurred cream) once scrolled past.
//  2. Mobile dropdown menu toggle.

export function initNav() {
  const nav = document.getElementById('nav');
  const hero = document.getElementById('top');
  if (!nav) return;

  // ── Stuck state ───────────────────────────────────────────────────────
  // Solid once the hero is essentially behind the bar. Hysteresis on the way
  // back up: stay solid until we're nearly at the top, so a fast fling doesn't
  // turn the bar transparent while cream rooms is still in the viewport — that
  // read as a blank strip between the header and the hero.
  let ticking = false;
  let stuck = false;

  const update = () => {
    const stickAt = hero ? hero.offsetHeight - nav.offsetHeight : 8;
    const unstickAt = nav.offsetHeight + 12;
    const y = window.scrollY;

    if (y <= unstickAt) {
      stuck = false;
    } else if (y > stickAt) {
      stuck = true;
    }
    // Between unstickAt and stickAt: keep previous `stuck` (hysteresis band).

    nav.classList.toggle('is-stuck', stuck);
    ticking = false;
  };

  const onScroll = () => {
    // Near the top, update synchronously — rAF batches one frame late, which
    // is exactly when the gap flashes on a fast scroll home.
    if (window.scrollY <= nav.offsetHeight + 32) {
      update();
      return;
    }
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();

  // ── Mobile menu ───────────────────────────────────────────────────────
  const toggle = nav.querySelector('.nav__toggle');
  const panel = document.getElementById('mobile-menu');
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    panel.hidden = !open;
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after picking a section, on Escape, or when tapping outside.
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
  document.addEventListener('click', (e) => {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !nav.contains(e.target)
    ) {
      setOpen(false);
    }
  });
}
