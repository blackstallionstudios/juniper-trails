// Entry point. Styles are linked directly in <head> (see index.html) so the
// page paints styled on first frame — no JS-injected CSS, no flash.
// This module only wires up behaviour.
import { initNav } from './js/nav.js';
import { initHero } from './js/hero.js';
import { initSpine } from './js/spine.js';
import { initSeason } from './js/season.js';
import { initReveal } from './js/reveal.js';
import { initGallery } from './js/gallery.js';

initNav();
initHero();
initSpine();
initSeason(); // reveals today's Trails seasonal note
initReveal(); // trail-drift settling as content enters view
initGallery(); // artwork rail: trail-progress line + drag-to-scroll
