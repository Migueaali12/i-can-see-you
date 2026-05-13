// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://icanseeyou.dev',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        return !['/demo/', '/results/'].includes(url.pathname);
      },
    }),
  ],
});