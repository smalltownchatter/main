// Regenerates public/og-image.jpg (the social sharing image). Run: node scripts/make-og.mjs
import { createRequire } from 'node:module';
// Playwright isn't a project dependency; install it globally (npm i -g playwright) to regenerate.
const { chromium } = createRequire(import.meta.url)('playwright');
import { fileURLToPath } from 'node:url';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file://' + fileURLToPath(new URL('./og.html', import.meta.url)));
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 88 });
await browser.close();
console.log('wrote public/og-image.jpg');
