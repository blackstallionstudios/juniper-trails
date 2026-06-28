// ─────────────────────────────────────────────────────────────────────────
//  Trail spine — the signature wayfinding element.
//
//  A thin path meanders down the left margin, threading one waypoint per
//  section. As you scroll, an accent "walked" trail draws in over the faint
//  full trail, and the waypoint for the section you're in lights up. It's a
//  real <nav> of anchor links underneath, so it works without JS and with a
//  keyboard; this module just adds the drawn path and the active state.
//
//  Only runs when the spine is actually on screen (wide viewports). On
//  reduced-motion, the full trail shows immediately with no draw animation.
// ─────────────────────────────────────────────────────────────────────────

const SVGNS = 'http://www.w3.org/2000/svg';

export function initSpine() {
  const spine = document.querySelector('[data-spine]');
  if (!spine) return;

  const links = [...spine.querySelectorAll('[data-spine-link]')];
  if (!links.length) return;

  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The spine is display:none under ~1200px (CSS). Only wire it up when it's
  // actually visible, and reveal it (it ships [hidden] so it never flashes
  // un-styled or shows on no-JS narrow screens).
  const mq = window.matchMedia('(min-width: 1200px)');

  let trail, walked, nodes;

  function buildPath() {
    // Clear any previous SVG (e.g. after a resize).
    spine.querySelector('.spine__svg')?.remove();

    nodes = [...spine.querySelectorAll('.spine__node')];
    const list = spine.querySelector('.spine__list');
    const box = list.getBoundingClientRect();
    const w = 36; // drawing lane width
    const cx = w / 2;

    // Waypoint centres, in the SVG's local space.
    const pts = nodes.map((n) => {
      const r = n.getBoundingClientRect();
      return { x: cx, y: r.top + r.height / 2 - box.top };
    });

    // Meander: nudge each interior waypoint alternately left/right so the
    // line reads like a trail, not a ruler. Endpoints stay centred.
    pts.forEach((p, i) => {
      if (i === 0 || i === pts.length - 1) return;
      p.x = cx + (i % 2 ? -1 : 1) * 9;
    });

    const h = box.height;
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'spine__svg');
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('aria-hidden', 'true');

    const d = smoothPath(pts);
    trail = mkPath(d, 'spine__trail');
    walked = mkPath(d, 'spine__walked');
    svg.append(trail, walked);
    spine.insertBefore(svg, list);

    // Prime the draw-in: the walked trail starts hidden and reveals on
    // scroll. Under reduced-motion it simply stays hidden — the active
    // waypoint highlight carries wayfinding without an animated line.
    const len = walked.getTotalLength();
    walked.style.strokeDasharray = len;
    walked.style.strokeDashoffset = len;
    if (reduce) walked.style.display = 'none';
  }

  function mkPath(d, cls) {
    const p = document.createElementNS(SVGNS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', cls);
    p.setAttribute('fill', 'none');
    return p;
  }

  // Catmull-Rom → cubic Bézier for a smooth, organic curve through the points.
  function smoothPath(p) {
    if (p.length < 2) return '';
    let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i];
      const p1 = p[i];
      const p2 = p[i + 1];
      const p3 = p[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  // Draw the walked trail in proportion to how far down the page we are.
  function onScroll() {
    if (!walked || reduce) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    const len = walked.getTotalLength();
    walked.style.strokeDashoffset = String(len * (1 - progress));
  }

  // Light up the waypoint for the section currently in view.
  let active = -1;
  function setActive(idx) {
    if (idx === active) return;
    active = idx;
    links.forEach((a, i) => a.classList.toggle('is-active', i === idx));
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = sections.indexOf(e.target);
          if (idx !== -1) setActive(idx);
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  let wired = false;
  function enable() {
    buildPath();
    onScroll();
    if (wired) return;
    sections.forEach((s) => io.observe(s));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', debounce(buildPath, 150));
    wired = true;
  }

  function apply(matches) {
    if (matches) {
      spine.hidden = false;
      // Wait a frame so layout is settled before measuring node positions.
      requestAnimationFrame(enable);
    } else {
      spine.hidden = true;
    }
  }

  apply(mq.matches);
  mq.addEventListener('change', (e) => apply(e.matches));
}

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
