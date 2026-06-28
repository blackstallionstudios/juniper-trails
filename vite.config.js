import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import site from './src/content/site.js';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(process.cwd(), 'src/partials'),
      context: site,
    }),
  ],
});
