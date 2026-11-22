/**
 * XML sitemap. Uses SITE_URL (see src/data/site.ts). If no production URL
 * is configured yet, an empty sitemap is produced rather than a made-up domain.
 * Add new public pages to the list below.
 */
import type { APIRoute } from 'astro';
import { siteUrl } from '../data/site';

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/websites/', priority: '0.9' },
  { path: '/photography/', priority: '0.9' },
  { path: '/about/', priority: '0.7' },
  { path: '/faq/', priority: '0.7' },
  { path: '/contact/', priority: '0.8' },
  { path: '/privacy/', priority: '0.2' },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = siteUrl
    ? pages
        .map(
          (p) =>
            `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority></url>`,
        )
        .join('\n')
    : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
