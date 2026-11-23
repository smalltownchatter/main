/**
 * ─────────────────────────────────────────────────────────────
 *  WEBSITE PACKAGES — change a price or feature here ONCE and it
 *  updates the homepage preview, the Websites page, the contact
 *  form dropdown and the structured data (FAQ answers are separate text).
 *  Prices are whole Canadian dollars, one-time totals including tax.
 *  The package details live in src/editable/packages.json, which
 *  can be edited in the dashboard at /admin/.
 * ─────────────────────────────────────────────────────────────
 */
import data from '../editable/packages.json';

export interface WebsitePackage {
  id: string; // used in contact links, e.g. /contact/?service=little-local
  name: string;
  price: number;
  pages: string; // short summary
  summary: string;
  features: string[];
  includesPrevious?: string;
  examplePages?: string;
  cta: string;
}

export const packages: WebsitePackage[] = data.packages;

export const pkg = (id: string) => packages.find((p) => p.id === id)!;

/** $1,000 */
export const money = (n: number) => `$${n.toLocaleString('en-CA')}`;

/** The one-line pricing promise, used on several pages. */
export const allInLine =
  'Professional design, copywriting, stock photography and applicable tax included.';

/**
 * Options for "What can I help you with?" on the contact form.
 * The `value` is what arrives in your inbox.
 */
export const inquiryOptions = [
  ...packages.map((p) => ({
    id: p.id,
    label: `${p.name} — ${p.pages} (${money(p.price)})`,
  })),
  { id: 'custom-website', label: 'A website with custom features' },
  { id: 'event-photography', label: 'Event photography' },
  { id: 'business-photography', label: 'Business photography' },
  { id: 'something-else', label: 'Something else' },
];
