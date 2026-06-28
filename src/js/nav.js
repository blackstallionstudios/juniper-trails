// Nav behaviour:
//  1. Transparent over the dark hero, solid (blurred cream) once scrolled past.
//  2. Mobile dropdown menu toggle.

export function initNav() {
  const nav = document.getElementById('nav');
  const hero = document.getElementById('top');
  if (!nav) return;

  // ── Stuck state ───────────────────────────────────────────────────────
  // Scroll-based and predictable: solid once the hero is essentially behind
  // the bar. (An IntersectionObserver fires a frame late right at the
  // hero/rooms boundary, which read as a flicker.)
  let ticking = false;
  const update = () => {
    const trigger = hero ? hero.offsetHeight - nav.offsetHeight : 8;
    nav.classList.toggle('is-stuck', window.scrollY > trigger);
    ticking = false;
  };
  const onScroll = () => {
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
