import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import site from './src/content/site.js';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(process.cwd(), 'src/partials'),
      context: site,
      helpers: {
        // Renders 5 star spans (full / half / empty) from a numeric rating.
        // Use triple-mustache in templates: {{{stars this.rating}}}
        stars(rating) {
          if (rating == null) return '<span class="review-card__stars review-card__stars--none" aria-hidden="true">&#9733;</span>';
          const r     = parseFloat(rating);
          const full  = Math.min(5, Math.floor(r));
          const half  = (r - full) >= 0.5 && full < 5;
          const empty = 5 - full - (half ? 1 : 0);
          const s     = (cls) => `<span class="star star--${cls}" aria-hidden="true">&#9733;</span>`;
          return (
            `<span class="review-card__stars" role="img" aria-label="${r} out of 5 stars">` +
            s('full').repeat(full) +
            (half ? s('half') : '') +
            s('empty').repeat(empty) +
            '</span>'
          );
        },
      },
    }),
  ],
});
