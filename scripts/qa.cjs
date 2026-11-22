/**
 * Automated QA for Small Town Chatter.
 * Requires: a running preview (npm run build && npm run preview), and Playwright
 * available globally (npm i -g playwright). Optional: axe-core for accessibility.
 *   NODE_PATH=$(npm root -g) node scripts/qa.cjs [baseUrl] [path/to/axe.min.js]
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.argv[2] || 'http://localhost:4321';
const AXE = process.argv[3];
const DIST = path.join(__dirname, '..', 'dist');
const PAGES = ['/', '/websites/', '/photography/', '/about/', '/faq/', '/contact/', '/privacy/'];

let failures = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? '  ✓' : '  ✗'} ${msg}`);
  if (!cond) failures++;
};

// Stand-in for stock photos when the CDN is unreachable (doesn't affect the checks)
const fakeImg = (route) =>
  route.fulfill({ status: 200, contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"/>' });

(async () => {
  const browser = await chromium.launch();

  // ── 1. Pages, titles, meta, headings, console errors, broken assets ──
  console.log('\nPages & SEO');
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const titles = new Set();
  const links = new Set();
  for (const p of PAGES) {
    const page = await ctx.newPage();
    await page.route('https://images.unsplash.com/**', fakeImg);
    const errors = [];
    const bad = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('response', (r) => r.url().startsWith(BASE) && r.status() >= 400 && bad.push(`${r.status()} ${r.url()}`));
    const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
    const info = await page.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name=description]')?.content || '',
      h1: document.querySelectorAll('h1').length,
      og: !!document.querySelector('meta[property="og:image"]'),
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].every((s) => {
        try { JSON.parse(s.textContent); return true; } catch { return false; }
      }),
      imgsNoAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
      headingSkip: (() => {
        const hs = [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map((h) => +h.tagName[1]);
        return hs.some((l, i) => i > 0 && l - hs[i - 1] > 1);
      })(),
      hrefs: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
      mailtos: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href')),
    }));
    titles.add(info.title);
    info.hrefs.forEach((h) => links.add(JSON.stringify([p, h])));
    console.log(` ${p}  “${info.title}”`);
    ok(res.status() === 200, 'loads (200)');
    ok(info.desc.length >= 70 && info.desc.length <= 170, `meta description length ${info.desc.length}`);
    ok(info.h1 === 1, 'exactly one H1');
    ok(!info.headingSkip, 'no skipped heading levels');
    ok(info.og && info.ld, 'Open Graph + valid JSON-LD');
    ok(info.imgsNoAlt === 0, 'every image has alt text');
    ok(info.mailtos.every((m) => m === 'mailto:smalltownchatter@gmail.com'), `all email links correct (${info.mailtos.length})`);
    ok(errors.length === 0, `no console errors${errors.length ? ': ' + errors.join(' | ') : ''}`);
    ok(bad.length === 0, `no broken local assets${bad.length ? ': ' + bad.join(', ') : ''}`);
    await page.close();
  }
  ok(titles.size === PAGES.length, 'all page titles unique');

  // ── 2. Every internal link resolves (pages and #anchors) ──
  console.log('\nInternal links');
  const checked = new Map();
  let linkCount = 0;
  for (const item of links) {
    const [from, href] = JSON.parse(item);
    if (/^(mailto:|https?:)/.test(href)) continue;
    const url = new URL(href, BASE + from);
    const key = url.pathname + url.hash;
    if (checked.has(key)) continue;
    linkCount++;
    const file = path.join(DIST, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
    let good = fs.existsSync(file);
    if (good && url.hash) good = fs.readFileSync(file, 'utf8').includes(`id="${url.hash.slice(1)}"`);
    checked.set(key, good);
    if (!good) ok(false, `broken link ${href} (on ${from})`);
  }
  ok([...checked.values()].every(Boolean), `${linkCount} unique internal links/anchors resolve`);

  // ── 3. Key CTAs point where they should ──
  console.log('\nCalls to action');
  const ctas = [
    ['/', 'I Need a Website', '/websites/'],
    ['/', 'I’m Planning an Event', '/photography/'],
    ['/', 'Explore Website Design', '/websites/'],
    ['/', 'Explore Event Photography', '/photography/'],
    ['/', 'See Website Packages', '/websites/#pricing'],
    ['/', 'Let’s Get Chatting', '/contact/'],
    ['/websites/', 'Let’s Get Your Business Online', '/contact/'],
    ['/websites/', 'Let\'s Build My Little Local', '/contact/?service=little-local'],
    ['/websites/', 'Let\'s Build My Main Street', '/contact/?service=main-street'],
    ['/websites/', 'Ask About a Custom Website', '/contact/?service=custom-website'],
    ['/websites/', 'Ask About Business Photography', '/contact/?service=business-photography'],
    ['/websites/', 'Get My Website Started', '/contact/'],
    ['/photography/', 'Let’s Capture Your Event', '/contact/?service=event-photography'],
    ['/photography/', 'Request a Photography Quote', '/contact/?service=event-photography'],
    ['/photography/', 'Tell Me What You’re Celebrating', '/contact/?service=event-photography'],
    ['/about/', 'Let’s Get Chatting', '/contact/'],
    ['/faq/', 'Ask Me Anything', '/contact/'],
  ];
  {
    const page = await ctx.newPage();
    await page.route('https://images.unsplash.com/**', fakeImg);
    for (const [p, text, href] of ctas) {
      await page.goto(BASE + p);
      const got = await page.locator('main a', { hasText: text }).first().getAttribute('href').catch(() => null);
      ok(got === href, `${p} “${text}” → ${got}`);
    }
    await page.close();
  }

  // ── 4. Contact form ──
  console.log('\nContact form');
  const expectSel = {
    'little-local': 'The Little Local — One-page website ($1,000)',
    'main-street': 'The Main Street — Up to five pages ($2,500)',
    'custom-website': 'A website with custom features',
    'event-photography': 'Event photography',
    'business-photography': 'Business photography',
  };
  for (const [id, label] of Object.entries(expectSel)) {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact/?service=${id}`);
    const v = await page.locator('#cf-service').inputValue();
    const dateVisible = await page.locator('#cf-date').isVisible();
    ok(v === label, `?service=${id} preselects “${v}”`);
    ok(dateVisible === (id === 'event-photography'), `event date ${dateVisible ? 'shown' : 'hidden'}`);
    await page.close();
  }

  const fill = async (page, o = {}) => {
    await page.fill('#cf-name', o.name ?? 'Test Person');
    await page.fill('#cf-email', o.email ?? 'test@example.com');
    await page.selectOption('#cf-service', { label: 'Event photography' });
    await page.fill('#cf-date', '2027-06-12');
    await page.fill('#cf-message', o.message ?? 'Planning a baby shower.');
  };

  {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact/`);
    let posted = 0;
    await page.route(`${BASE}/`, (r) => (r.request().method() === 'POST' ? (posted++, r.fulfill({ status: 200 })) : r.continue()));
    await page.click('[data-submit]');
    ok(await page.locator('[data-summary]').isVisible(), 'empty submit shows error summary');
    ok((await page.locator('[aria-invalid="true"]').count()) === 4, '4 required fields flagged (name, email, service, message)');
    ok(await page.evaluate(() => document.activeElement?.matches('[data-summary]')), 'focus moves to error summary');
    ok(posted === 0, 'nothing sent while invalid');
    await fill(page, { email: 'not-an-email' });
    await page.click('[data-submit]');
    ok((await page.locator('#cf-email-err').textContent()).includes('valid email'), 'invalid email rejected');
    ok(posted === 0, 'nothing sent with invalid email');
    await page.fill('#cf-email', 'name@domain');
    await page.click('[data-submit]');
    ok(posted === 0, '“name@domain” rejected');
    await page.close();
  }

  {
    // Success path (Netlify mocked)
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact/?service=event-photography`);
    let body = '';
    await page.route(`${BASE}/`, async (r) => {
      if (r.request().method() !== 'POST') return r.continue();
      body = r.request().postData();
      await new Promise((res) => setTimeout(res, 600));
      r.fulfill({ status: 200, body: 'ok' });
    });
    await fill(page);
    await page.click('[data-submit]');
    await page.waitForTimeout(150);
    ok((await page.locator('[data-submit-label]').textContent()) === 'Sending…', 'loading state while sending');
    ok(!(await page.locator('[data-success]').isVisible()), 'success not shown before server confirms');
    await page.waitForSelector('[data-success]:not([hidden])');
    ok(await page.locator('text=Your message is on its way!').isVisible(), 'success message after confirmed 200');
    const params = new URLSearchParams(body);
    ok(params.get('form-name') === 'contact', 'posts form-name=contact (Netlify)');
    ok(params.get('service') === 'Event photography' && params.get('event-date') === '2027-06-12', 'posts service + event date');
    ok(params.has('bot-field') && params.get('bot-field') === '', 'honeypot field present and empty');
    ok((params.get('subject') || '').startsWith('New inquiry: Event photography'), 'notification subject set');
    await page.close();
  }

  {
    // Error path (server error)
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact/`);
    await page.route(`${BASE}/`, (r) => (r.request().method() === 'POST' ? r.fulfill({ status: 500 }) : r.continue()));
    await fill(page);
    await page.click('[data-submit]');
    await page.waitForSelector('[data-error-box]:not([hidden])');
    ok(true, 'error message shown on server failure');
    ok(!(await page.locator('[data-success]').isVisible()), 'no false success');
    ok((await page.locator('#cf-message').inputValue()) === 'Planning a baby shower.', 'typed message kept after failure');
    await page.close();
  }

  // ── 5. FAQ accordion keyboard support ──
  console.log('\nFAQ accordion');
  {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/faq/`);
    const first = page.locator('.acc__btn').first();
    ok((await first.getAttribute('aria-expanded')) === 'false', 'starts collapsed');
    await first.focus();
    await page.keyboard.press('Enter');
    ok((await first.getAttribute('aria-expanded')) === 'true', 'Enter expands');
    ok(await page.locator('#websites-1-panel').isVisible(), 'panel visible');
    await page.keyboard.press('Space');
    ok((await first.getAttribute('aria-expanded')) === 'false', 'Space collapses');
    await page.keyboard.press('ArrowDown');
    ok(await page.evaluate(() => document.activeElement?.id === 'websites-2-btn'), 'ArrowDown moves to next question');
    const count = await page.locator('.acc__btn').count();
    ok(count === 17, `${count} questions (11 website + 6 photography)`);
    await page.close();
  }

  // ── 6. Mobile menu ──
  console.log('\nMobile menu');
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  {
    const page = await mctx.newPage();
    await page.route('https://images.unsplash.com/**', fakeImg);
    await page.goto(`${BASE}/`);
    const t = page.locator('[data-menu-toggle]');
    ok(await t.isVisible(), 'hamburger visible on phone');
    ok(!(await page.locator('#site-nav').isVisible()), 'menu hidden initially');
    await t.click();
    ok((await t.getAttribute('aria-expanded')) === 'true' && (await page.locator('#site-nav').isVisible()), 'opens');
    await page.keyboard.press('Escape');
    ok((await t.getAttribute('aria-expanded')) === 'false', 'Escape closes');
    ok(await page.evaluate(() => document.activeElement?.matches('[data-menu-toggle]')), 'focus returns to button');
    await t.click();
    await page.locator('#site-nav a', { hasText: 'Photography' }).click();
    await page.waitForURL('**/photography/');
    ok(true, 'menu link navigates');
    for (const p of PAGES) {
      await page.goto(BASE + p);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      ok(over <= 0, `${p} no horizontal scroll at 390px`);
    }
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('a.btn, button')].filter((e) => e.offsetParent && e.getBoundingClientRect().height < 44).length,
    );
    ok(small === 0, 'buttons are at least 44px tall');
    await page.close();
  }

  // ── 7. Accessibility (axe-core, WCAG 2.2 A/AA rules) ──
  if (AXE) {
    console.log('\nAccessibility (axe-core)');
    const src = fs.readFileSync(AXE, 'utf8');
    for (const c of [ctx, mctx]) {
      for (const p of [...PAGES, '/contact/thanks/']) {
        const page = await c.newPage();
        await page.route('https://images.unsplash.com/**', fakeImg);
        await page.goto(BASE + p, { waitUntil: 'networkidle' });
        await page.addScriptTag({ content: src });
        const r = await page.evaluate(() =>
          axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }),
        );
        const v = r.violations.map((x) => `${x.id} (${x.nodes.length}): ${x.nodes[0].target.join(' ')}`);
        ok(v.length === 0, `${p} @${c === ctx ? 'desktop' : 'mobile'} ${v.length ? v.join(' | ') : 'no violations'}`);
        await page.close();
      }
    }
  }

  await browser.close();
  console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed.');
  process.exit(failures ? 1 : 0);
})();
