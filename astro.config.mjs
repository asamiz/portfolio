import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ahmedsami.me',
  integrations: [sitemap()],
  markdown: {
    // The design shows code blocks as plain monospace text, without colors.
    syntaxHighlight: false,
  },
});
