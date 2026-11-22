/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS — the one place for business-wide details.
 *  Email, towns and tagline live in src/editable/business.json
 *  (editable at /admin/). Change them there or the nav here and every page
 *  (header, footer, contact page, structured data) updates.
 * ─────────────────────────────────────────────────────────────
 */

import details from '../editable/business.json';

export const site = {
  name: 'Small Town Chatter',
  owner: 'Chelsey',
  email: details.email,
  region: 'Ottawa Valley',
  province: 'Ontario',
  country: 'Canada',

  /** Short lines used in the footer and social previews. */
  tagline: details.tagline,
  description: details.description,
  coreMessage: details.coreMessage,

  /** Towns listed everywhere the service area appears, in this order. */
  towns: details.towns as string[],

  /**
   * Your portrait for the About page.
   * Leave as null to show the labelled placeholder.
   * To add your photo: put it in src/assets/photos/ (e.g. chelsey.jpg)
   * and set portrait: 'chelsey.jpg'.
   */
  portrait: 'chelsey-portrait.jpg' as string | null,
  portraitAlt: 'Chelsey, owner of Small Town Chatter, smiling at her desk at home',
};

/** Main navigation, in display order. */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Websites', href: '/websites/' },
  { label: 'Photography', href: '/photography/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQs', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];

/** "Renfrew, Calabogie, … and Barry's Bay" */
export function townList(conjunction = 'and') {
  const t = site.towns;
  return `${t.slice(0, -1).join(', ')} ${conjunction} ${t[t.length - 1]}`;
}

/**
 * Production URL and indexing.
 * Set SITE_URL in Netlify (Site configuration → Environment variables),
 * e.g. https://smalltownchatter.ca — it's used for canonical links,
 * the sitemap and social previews. Nothing here invents a domain.
 *
 * Search engines may index the site only on Netlify's production
 * context (or if ALLOW_INDEXING=true). Deploy previews, branch deploys
 * and local builds are marked noindex automatically.
 */
const env = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>;

export const siteUrl: string | null = (env.SITE_URL || (env.CONTEXT === 'production' ? env.URL : '') || '')
  .replace(/\/+$/, '') || null;

export const allowIndexing: boolean =
  env.ALLOW_INDEXING === 'false'
    ? false
    : env.ALLOW_INDEXING === 'true' || env.CONTEXT === 'production';
