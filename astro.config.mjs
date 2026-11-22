// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL is set in Netlify once you have a domain (see README).
// It's only used for canonical links and the sitemap; nothing breaks without it.
const site = process.env.SITE_URL || (process.env.CONTEXT === 'production' ? process.env.URL : undefined);

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: {
    // Unsplash's CDN already resizes remote photos; Astro only processes local ones.
    remotePatterns: [],
  },
  devToolbar: { enabled: false },
});
