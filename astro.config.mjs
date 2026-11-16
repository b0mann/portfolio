// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Set SITE_URL at build time once the site has a home, e.g.
//   SITE_URL=https://example.com npm run build
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  // Code blocks stay plain: the design sets them in ink on a paper well, no theme colours.
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
