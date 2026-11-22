# Small Town Chatter — website

The website for **Small Town Chatter**: affordable small-business websites and candid event photography in the Ottawa Valley.

Built with [Astro](https://astro.build) and plain CSS. It produces a fast, fully static site, ready for Netlify, with a Netlify Forms contact form. No database, no accounts, no paid content system.

---

## 1. Preview it on your computer

You need **Node.js 22 or newer** ([download](https://nodejs.org)). Then, in Terminal:

```bash
cd "path/to/this/folder"
npm install          # first time only
npm run dev          # live preview while editing
```

Open **http://localhost:4321** in your browser. Pages update as soon as you save a file. Press `Ctrl + C` to stop.

To preview the finished, production version instead:

```bash
npm run build
npm run preview
```

> **Note:** the contact form only *sends* once the site is on Netlify. Locally it will show the "didn't send" message when you submit, which is expected.

---

## 2. Where to edit things

Most everyday changes happen in **`src/data/`**. Change it once there and every page updates.

| I want to change… | Edit this file |
|---|---|
| Email address, towns served, tagline, footer text, my portrait | `src/data/site.ts` |
| **Package prices**, names, included features | `src/data/packages.ts` |
| Contact-form dropdown options | `src/data/packages.ts` (`inquiryOptions`) |
| FAQ questions and answers | `src/data/faqs.ts` |
| Event types on the Photography page | `src/data/events.ts` |
| Which photo appears where, alt text, credits | `src/data/images.ts` |
| Homepage words | `src/pages/index.astro` |
| Websites / Photography / About / Contact / Privacy words | `src/pages/websites.astro`, `photography.astro`, `about.astro`, `contact/index.astro`, `privacy.astro` |
| Colours, fonts, spacing | `src/styles/global.css` (the `:root` section at the top) |

**Changing a price:** edit `price` in `src/data/packages.ts`. The homepage, Websites page, contact dropdown, FAQs and search-engine data all update automatically.

### Adding your portrait (About page)

1. Put your photo in `src/assets/photos/`, for example `chelsey.jpg` (a tall/portrait photo at least 1200px wide works best).
2. In `src/data/site.ts`, change `portrait: null` to `portrait: 'chelsey.jpg'`.

The labelled placeholder disappears automatically.

### Swapping in your own photos

1. Put the photo in `src/assets/photos/`.
2. In `src/data/images.ts`, replace that photo's entry with
   `'bakery-counter': { file: 'my-photo.jpg', alt: 'Describe the photo', w: 1600, h: 1067 },`
   (`w`/`h` are the photo's real width and height).

Astro automatically creates small, modern (AVIF/WebP) versions at build time. Remember to update `IMAGE-CREDITS.md` and to only show your own photography as examples of your work.

---

## 3. Publishing on Netlify

Nothing has been deployed yet. When you're ready:

1. Create a free Netlify account at [netlify.com](https://www.netlify.com) and choose **Add new project → Import an existing project → GitHub**, then pick the `smalltownchatter/main` repository. Netlify reads `netlify.toml`, so the build settings fill in automatically (`npm run build`, publish folder `dist`).
2. **Turn on form detection:** in Netlify, go to **Forms** and click **Enable form detection**, then redeploy (Deploys → Trigger deploy). The form named **contact** should appear under Forms.
3. **Get emails for new messages:** Project configuration → Notifications → **Emails and webhooks** → **Form submission notifications** → **Add notification → Email notification**, choose the `contact` form, and enter `smalltownchatter@gmail.com`.
4. **Send yourself a test message** from the live Contact page and confirm it arrives in Gmail (check Spam the first time and mark it "Not spam").
5. **Domain:** once you've bought one (e.g. through Netlify or another registrar), add it under Domain management.
6. **Tell the site its address:** Project configuration → Environment variables → add `SITE_URL` with your full address, e.g. `https://yourdomain.ca` (no trailing slash). Redeploy. This turns on canonical links, the sitemap and full social-preview URLs.

### Search engines and previews

The site automatically tells search engines **not** to index it unless it's Netlify's **production** deploy. Deploy previews, branch deploys and local builds are always `noindex` with a blocking `robots.txt`.

- To force indexing off (e.g. while you're still polishing on the live URL), set `ALLOW_INDEXING=false` in Netlify.
- After launch, submit `https://yourdomain/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

### Spam protection

The form uses Netlify's honeypot field plus Netlify's built-in spam filtering. No API keys or secrets are in the code. If spam becomes a problem later, Netlify can add a reCAPTCHA (`data-netlify-recaptcha="true"`).

---

## 4. Project layout

```
src/
  data/         ← business details, prices, FAQs, photos (edit these most)
  pages/        ← one file per page (index, websites, photography, about, faq, contact, privacy, 404)
  components/   ← header, footer, wordmark, buttons/cards, contact form, photo, icons
  layouts/      ← shared page shell: <head>, SEO tags, structured data
  styles/       ← global.css (colours, type, spacing)
  assets/photos ← your own photos go here
public/         ← favicon, social sharing image, web manifest
scripts/        ← helpers: regenerate icons/social image, automated QA
netlify.toml    ← build settings, caching and security headers
IMAGE-CREDITS.md← where every stock photo came from and its licence
```

## 5. Checks

```bash
npm run build                           # must finish with "Complete!"
npm run preview                         # then, in a second Terminal window:
NODE_PATH=$(npm root -g) node scripts/qa.cjs http://localhost:4321
```

`scripts/qa.cjs` (needs `npm i -g playwright` once) checks every page's title/description/H1, internal links and anchors, every call-to-action destination, package preselection, form validation, loading/success/error states (with Netlify's response simulated), the FAQ keyboard controls, the mobile menu and horizontal scrolling. Pass a path to `axe.min.js` (from the `axe-core` package) as a second argument to add an automated accessibility scan.

Other helpers:

- `node scripts/make-icons.mjs` regenerates the PNG favicons from `public/favicon.svg`.
- `node scripts/make-og.mjs` regenerates `public/og-image.jpg` from `scripts/og.html` (needs Playwright).
