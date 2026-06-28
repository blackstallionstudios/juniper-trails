// ─────────────────────────────────────────────────────────────────────────
//  Artwork gallery rail + lightbox.
//
//  Rail:
//    · A "trail-progress" line fills as you move through the canvases — the
//      same walked-path idea as the spine, turned on its side.
//    · Pointer drag-to-scroll for mouse users (trackpad/touch already swipe).
//      Snap is suspended mid-drag (see CSS .is-dragging) or proximity snapping
//      fights the programmatic scrollLeft and the drag reads as dead.
//
//  Lightbox:
//    · Each canvas is a <button>; clicking/Enter opens the painting full-view.
//    · Pointerdown on a canvas skips preventDefault so the click can fire; once
//      movement crosses the drag threshold the rail takes over and the click is
//      swallowed so dragging never pops the lightbox.
//    · Esc / click-away / arrow keys; focus trapped, returned to the opener.
//
//  Everything degrades: no JS → the rail still scrolls (it's a real focusable
//  scroll region) and the buttons simply do nothing. Reduced motion honoured.
// ─────────────────────────────────────────────────────────────────────────

export function initGallery() {
  const rail = document.querySelector('[data-art-rail]');
  if (!rail) return;

  const fill = document.querySelector('[data-art-progress-fill]');
  const foot = document.querySelector('[data-art-foot]');
  const openers = [...rail.querySelectorAll('[data-art-open]')];

  // ── Progress line ────────────────────────────────────────────────────
  const maxScroll = () => rail.scrollWidth - rail.clientWidth;

  function clampScroll() {
    const max = maxScroll();
    if (max <= 0) {
      if (rail.scrollLeft !== 0) rail.scrollLeft = 0;
      return 0;
    }
    const left = Math.min(max, Math.max(0, rail.scrollLeft));
    if (left !== rail.scrollLeft) rail.scrollLeft = left;
    return left;
  }

  function update() {
    const max = maxScroll();
    if (max <= 1) {
      foot?.classList.add('is-static'); // nothing to scroll → no cue
      return;
    }
    foot?.classList.remove('is-static');
    const left = clampScroll();
    const p = left / max;
    if (fill) fill.style.width = (p * 100).toFixed(2) + '%';
  }

  let ticking = false;
  rail.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    },
    { passive: true }
  );
  window.addEventListener('resize', debounce(update, 150));
  update();

  // ── Drag-to-scroll (mouse only) ──────────────────────────────────────
  // Proximity scroll-snap fights programmatic scrollLeft every frame unless
  // snap is suspended for the whole drag *and* the release. Without that,
  // the rail looks dead mid-drag or snaps back the instant you let go.
  let down = false;
  let startX = 0;
  let startLeft = 0;
  let moved = 0;
  let suppressClick = false;
  let clickTarget = null; // canvas button when pointerdown started on a painting
  const DRAG_THRESHOLD = 6; // px of travel that turns a click into a drag

  function suspendSnap() {
    rail.style.scrollSnapType = 'none';
  }

  function resumeSnap() {
    rail.style.scrollSnapType = '';
  }

  function beginDrag(e) {
    suspendSnap();
    rail.classList.add('is-dragging');
    rail.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!down) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));

    /* Pointerdown on a canvas must not preventDefault — that kills the button
       click that opens the lightbox. Wait until movement crosses the threshold,
       then take over as a rail drag (and swallow the eventual click). */
    if (clickTarget && moved > DRAG_THRESHOLD) {
      clickTarget = null;
      suppressClick = true;
      beginDrag(e);
    }

    if (!rail.classList.contains('is-dragging')) return;
    e.preventDefault();
    rail.scrollLeft = startLeft - dx;
  }

  function endDrag(e) {
    if (!down) return;
    down = false;
    const wasDrag = moved > DRAG_THRESHOLD;
    if (wasDrag) suppressClick = true;
    clickTarget = null;

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', endDrag);
    document.removeEventListener('pointercancel', endDrag);

    suspendSnap();
    rail.classList.remove('is-dragging');
    if (wasDrag) {
      clampScroll();
      rail.classList.add('is-free-scroll');
    }
    try { rail.releasePointerCapture?.(e.pointerId); } catch (_) {}

    requestAnimationFrame(() => {
      if (wasDrag) clampScroll();
      else resumeSnap();
    });
  }

  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return; // touch keeps native momentum + tap-to-open
    if (e.button !== 0) return;

    clickTarget = e.target.closest('[data-art-open]');
    down = true;
    moved = 0;
    startX = e.clientX;
    startLeft = rail.scrollLeft;

    if (!clickTarget) {
      e.preventDefault();
      beginDrag(e);
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);
  });

  // Trackpad/wheel scroll can re-enable snap; mouse drags keep free scroll.
  rail.addEventListener('wheel', () => {
    if (down) return;
    rail.classList.remove('is-free-scroll');
    resumeSnap();
  }, { passive: true });

  rail.addEventListener('dragstart', (e) => e.preventDefault());

  // ── Progress-bar scrub (the "drag bar" beside the hint) ───────────────
  const progress = foot?.querySelector('[data-art-progress]');
  if (progress) {
    let scrubbing = false;

    function scrollFromPointer(e) {
      const rect = progress.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const max = maxScroll();
      if (max <= 0) return;
      suspendSnap();
      rail.classList.add('is-free-scroll');
      rail.scrollLeft = p * max;
      clampScroll();
      update();
    }

    function onScrubMove(e) {
      if (!scrubbing) return;
      e.preventDefault();
      scrollFromPointer(e);
    }

    function endScrub(e) {
      if (!scrubbing) return;
      scrubbing = false;
      progress.classList.remove('is-dragging');
      rail.classList.remove('is-dragging');
      document.removeEventListener('pointermove', onScrubMove);
      document.removeEventListener('pointerup', endScrub);
      document.removeEventListener('pointercancel', endScrub);
      suspendSnap();
      clampScroll();
      try { progress.releasePointerCapture?.(e.pointerId); } catch (_) {}
      requestAnimationFrame(() => { clampScroll(); });
    }

    progress.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      scrubbing = true;
      progress.classList.add('is-dragging');
      rail.classList.add('is-dragging');
      progress.setPointerCapture?.(e.pointerId);
      scrollFromPointer(e);
      document.addEventListener('pointermove', onScrubMove);
      document.addEventListener('pointerup', endScrub);
      document.addEventListener('pointercancel', endScrub);
    });
  }

  // Swallow the click that a drag would otherwise fire (capture phase, before
  // it reaches a canvas button), so dragging never opens the lightbox.
  rail.addEventListener(
    'click',
    (e) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      }
    },
    true
  );

  // ── Lightbox ─────────────────────────────────────────────────────────
  if (openers.length) initLightbox(openers);
}

function initLightbox(openers) {
  const pieces = openers.map((b) => ({
    src: b.getAttribute('data-src'),
    title: b.getAttribute('data-title') || '',
    alt: b.getAttribute('data-alt') || '',
    btn: b,
  }));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build the overlay once.
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.hidden = true;
  box.innerHTML = `
    <button type="button" class="lightbox__btn lightbox__prev" aria-label="Previous painting">&lsaquo;</button>
    <div class="lightbox__stage"><img class="lightbox__img" alt="" /></div>
    <p class="lightbox__cap"><span class="lightbox__title"></span><span class="lightbox__count"></span></p>
    <button type="button" class="lightbox__btn lightbox__close" aria-label="Close">&times;</button>
    <button type="button" class="lightbox__btn lightbox__next" aria-label="Next painting">&rsaquo;</button>
  `;
  document.body.appendChild(box);

  const img = box.querySelector('.lightbox__img');
  const titleEl = box.querySelector('.lightbox__title');
  const countEl = box.querySelector('.lightbox__count');
  const closeBtn = box.querySelector('.lightbox__close');
  const prevBtn = box.querySelector('.lightbox__prev');
  const nextBtn = box.querySelector('.lightbox__next');
  const focusable = [closeBtn, prevBtn, nextBtn];

  let index = 0;
  let opener = null;

  function render() {
    const p = pieces[index];
    img.src = p.src;
    img.alt = p.alt;
    titleEl.textContent = p.title;
    countEl.textContent = `${index + 1} / ${pieces.length}`;
    box.setAttribute('aria-label', `${p.title} — painting ${index + 1} of ${pieces.length}`);
  }

  function open(i) {
    index = i;
    opener = pieces[i].btn;
    render();
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    requestAnimationFrame(() => box.classList.add('is-open'));
    closeBtn.focus();
    document.addEventListener('keydown', onKey, true);
  }

  function close() {
    box.classList.remove('is-open');
    document.removeEventListener('keydown', onKey, true);
    const done = () => {
      box.hidden = true;
      document.body.classList.remove('lightbox-open');
      opener?.focus(); // return focus to where the user was
    };
    if (reduce) done();
    else setTimeout(done, 240);
  }

  const go = (delta) => {
    index = (index + delta + pieces.length) % pieces.length;
    render();
  };

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'Tab') {
      // simple focus trap across the three controls
      e.preventDefault();
      const dir = e.shiftKey ? -1 : 1;
      const cur = focusable.indexOf(document.activeElement);
      const next = (cur + dir + focusable.length) % focusable.length;
      focusable[next].focus();
    }
  }

  // Wire openers (the click-suppression in initGallery guards against drags).
  pieces.forEach((p, i) => p.btn.addEventListener('click', () => open(i)));

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  // Click on the dark field (not the image or a control) closes.
  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.classList.contains('lightbox__stage')) close();
  });
}

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
