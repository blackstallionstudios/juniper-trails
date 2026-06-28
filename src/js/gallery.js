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
//    · A drag is not a click: if the pointer moved past a small threshold we
//      swallow the click so dragging the rail never pops a lightbox.
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

  function update() {
    const max = maxScroll();
    if (max <= 1) {
      foot?.classList.add('is-static'); // nothing to scroll → no cue
      return;
    }
    foot?.classList.remove('is-static');
    const p = Math.min(1, Math.max(0, rail.scrollLeft / max));
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
  const DRAG_THRESHOLD = 6; // px of travel that turns a click into a drag

  function suspendSnap() {
    rail.style.scrollSnapType = 'none';
  }

  function resumeSnap() {
    rail.style.scrollSnapType = '';
  }

  function onPointerMove(e) {
    if (!down) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    rail.scrollLeft = startLeft - dx;
  }

  function endDrag(e) {
    if (!down) return;
    down = false;
    const wasDrag = moved > DRAG_THRESHOLD;
    suppressClick = wasDrag;
    const left = rail.scrollLeft;

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', endDrag);
    document.removeEventListener('pointercancel', endDrag);

    suspendSnap();
    rail.classList.remove('is-dragging');
    if (wasDrag) {
      rail.scrollLeft = left;
      rail.classList.add('is-free-scroll');
    }
    try { rail.releasePointerCapture?.(e.pointerId); } catch (_) {}

    requestAnimationFrame(() => {
      if (wasDrag) rail.scrollLeft = left;
      else resumeSnap();
    });
  }

  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return; // touch keeps native momentum
    if (e.button !== 0) return;
    e.preventDefault(); // stop button focus/activation from eating the drag
    down = true;
    moved = 0;
    startX = e.clientX;
    startLeft = rail.scrollLeft;
    suspendSnap();
    rail.classList.add('is-dragging');
    rail.setPointerCapture?.(e.pointerId);
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
      const left = rail.scrollLeft;
      progress.classList.remove('is-dragging');
      rail.classList.remove('is-dragging');
      document.removeEventListener('pointermove', onScrubMove);
      document.removeEventListener('pointerup', endScrub);
      document.removeEventListener('pointercancel', endScrub);
      suspendSnap();
      rail.scrollLeft = left;
      try { progress.releasePointerCapture?.(e.pointerId); } catch (_) {}
      requestAnimationFrame(() => { rail.scrollLeft = left; });
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
