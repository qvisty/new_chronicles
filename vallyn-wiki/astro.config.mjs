import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { remarkWikiLinks } from './src/plugins/wikilinks.mjs';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://qvisty.github.io',
  base: '/new_chronicles',
  output: 'static',
  markdown: {
    remarkPlugins: [
      [remarkWikiLinks, { base: '/new_chronicles' }],
    ],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
