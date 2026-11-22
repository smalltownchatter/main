// Regenerates the PNG favicons from public/favicon.svg.  Run: node scripts/make-icons.mjs
import sharp from 'sharp';
const svg = 'public/favicon.svg';
for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 600 }).resize(size, size).png().toFile(`public/${file}`);
  console.log('wrote', file);
}
