/**
 * robots.txt — open to search engines only on the real production site.
 * Deploy previews, branch deploys and local builds block crawling.
 */
import type { APIRoute } from 'astro';
import { siteUrl, allowIndexing } from '../data/site';

export const GET: APIRoute = () => {
  const body = allowIndexing
    ? `User-agent: *\nAllow: /\nDisallow: /contact/thanks/\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`
    : `# This is a preview build — please don't index it.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
