/**
 * ─────────────────────────────────────────────────────────────
 *  WEBSITE PACKAGES — change a price or feature here ONCE and it
 *  updates the homepage preview, the Websites page, the contact
 *  form dropdown, the FAQs and the structured data.
 *  Prices are whole Canadian dollars, final all-in totals.
 * ─────────────────────────────────────────────────────────────
 */

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

export const packages: WebsitePackage[] = [
  {
    id: 'little-local',
    name: 'The Little Local',
    price: 1000,
    pages: 'One-page website',
    summary:
      'An affordable, polished online home for businesses that need a straightforward website: who you are, what you do and how to reach you.',
    features: [
      'Professional custom design',
      'Copywriting based on information you provide',
      'Licensed stock photography',
      'Responsive, mobile-friendly layout',
      'Business introduction and service information',
      'Contact details and contact form',
      'Basic on-page SEO',
      'One round of revisions',
      'Website launch setup',
    ],
    cta: "Let's Build My Little Local",
  },
  {
    id: 'main-street',
    name: 'The Main Street',
    price: 2500,
    pages: 'Up to five pages',
    summary:
      'Room to tell your whole story, with separate pages for your services, your background and the questions customers ask you every week.',
    includesPrevious: 'Everything in The Little Local, plus:',
    features: [
      'Up to five professionally designed pages',
      'Copywriting for all included pages',
      'Licensed stock photography throughout',
      'More detailed services and business information',
      'Individual page titles and descriptions for search engines',
      'Two rounds of revisions',
      'More flexibility in content layout',
    ],
    examplePages: 'Home, About, Services, FAQs, Contact',
    cta: "Let's Build My Main Street",
  },
];

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
