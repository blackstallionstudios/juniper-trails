// ─────────────────────────────────────────────────────────────────────────
//  Booking & cancellation policy lightbox.
//
//  The rates panel carries a quiet text link (`[data-policy-open]`); clicking
//  it opens the policy card over a dimmed field. Esc / click-away / the close
//  button all dismiss it; focus is trapped in the card while open and returned
//  to the link on close. Reduced motion honoured.
//
//  Degrades: no JS → the markup stays `hidden`, so the link simply does
//  nothing and the rates still read fine on their own.
// ─────────────────────────────────────────────────────────────────────────

export function initPolicy() {
  const modal = document.querySelector('[data-policy]');
  if (!modal) return;

  const openers = [...document.querySelectorAll('[data-policy-open]')];
  if (!openers.length) return;

  const panel = modal.querySelector('.policy__panel');
  const closers = [...modal.querySelectorAll('[data-policy-close]')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let opener = null;

  const focusable = () =>
    [...panel.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')]
      .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

  function onKey(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      const f = focusable();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function open() {
    opener = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('policy-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    (panel.querySelector('.policy__close') || panel).focus();
    document.addEventListener('keydown', onKey, true);
  }

  function close() {
    modal.classList.remove('is-open');
    document.removeEventListener('keydown', onKey, true);
    const done = () => {
      modal.hidden = true;
      document.body.classList.remove('policy-open');
      opener?.focus(); // return focus to the link that opened it
    };
    if (reduce) done();
    else setTimeout(done, 220);
  }

  openers.forEach((b) => b.addEventListener('click', open));
  closers.forEach((b) => b.addEventListener('click', close));
}
