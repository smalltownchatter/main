/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOS — every photo on the site is listed here by a short name.
 *
 *  Right now these are licensed stock photos from Unsplash
 *  (free for commercial use under the Unsplash License:
 *  https://unsplash.com/license). They're served from Unsplash's
 *  image CDN, which resizes them and delivers modern formats
 *  (AVIF/WebP) automatically. Credits live in IMAGE-CREDITS.md.
 *
 *  They are illustrations only, not Chelsey's own work or client
 *  projects. To swap in your own photo:
 *    1. Drop the file into src/assets/photos/ (e.g. my-bakery.jpg)
 *    2. Replace the entry below with:
 *         'bakery-counter': { file: 'my-bakery.jpg', alt: '…' , w: 1600, h: 1067 }
 *       (w/h = the photo's real pixel size, so the page doesn't jump)
 *  Astro will optimize local photos automatically at build time.
 * ─────────────────────────────────────────────────────────────
 */

export interface UnsplashPhoto {
  unsplash: string; // images.unsplash.com path, e.g. "photo-123-abc"
  page: string; // Unsplash photo page (for credits)
  credit: string; // photographer
  alt: string;
  w: number; // original aspect ratio
  h: number;
  focus?: string; // CSS object-position
}
export interface LocalPhoto {
  file: string; // in src/assets/photos/
  alt: string;
  w: number;
  h: number;
  focus?: string;
}
export type Photo = UnsplashPhoto | LocalPhoto;

export const photos = {
  'storefront-open-sign': {
    unsplash: 'photo-1583968300292-46b9da50309d',
    page: 'https://unsplash.com/photos/0IEemURq3GM',
    credit: 'Hana Fleur',
    alt: 'An "Open" sign glowing in the window of a small coffee shop',
    w: 3, h: 4,
  },
  'coffee-house-exterior': {
    unsplash: 'photo-1680197127995-cc201a418961',
    page: 'https://unsplash.com/photos/dFcYq0UOBZA',
    credit: 'Bobbie Wallace',
    alt: 'A small-town coffee house with a covered front porch',
    w: 3, h: 2,
  },
  'florist-shop-owner': {
    unsplash: 'photo-1531058240690-006c446962d8',
    page: 'https://unsplash.com/photos/24HcJhf0u6M',
    credit: 'Ellicia',
    alt: 'A florist arranging flowers at the counter of her plant-filled shop',
    w: 3, h: 2,
  },
  'shop-owner-ceramics': {
    unsplash: 'photo-1658314756218-72907d818aa7',
    page: 'https://unsplash.com/photos/Hb4MfbppIRo',
    credit: 'Centre for Ageing Better',
    alt: 'A shop owner looking over handmade pottery on her shelves',
    w: 3, h: 2,
  },
  'bakery-counter': {
    unsplash: 'photo-1579005007697-75b2fe2c88e7',
    page: 'https://unsplash.com/photos/b5kN9ClBRNU',
    credit: 'Ekaterina Tyapkina',
    alt: 'A baker standing behind a counter of fresh bread and pastries',
    w: 3, h: 2,
  },
  'cafe-owner-espresso': {
    unsplash: 'photo-1507914372368-b2b085b925a1',
    page: 'https://unsplash.com/photos/8jp-6SjVibM',
    credit: 'Brooke Cagle',
    alt: 'A smiling café owner making espresso behind the counter',
    w: 3, h: 2,
  },
  'party-hat-flowers': {
    unsplash: 'photo-1759124650162-00cb97c7db31',
    page: 'https://unsplash.com/photos/YFZRJ9rSYV8',
    credit: 'Michael Kyule',
    alt: 'A gold-starred party hat sitting in front of a bright bouquet',
    w: 3, h: 2,
  },
  'celebration-table-lilacs': {
    unsplash: 'photo-1655386068478-e8283085cac7',
    page: 'https://unsplash.com/photos/yliYM5I5hoc',
    credit: 'Silvia Mara',
    alt: 'A celebration table set with lilacs, candles and white dishes',
    w: 2, h: 3,
  },
  'floral-centrepiece': {
    unsplash: 'photo-1751257525926-11c033d01e81',
    page: 'https://unsplash.com/photos/1hfq0FKdrmA',
    credit: 'Hồng Xuân Văn',
    alt: 'A handmade centrepiece of roses, greenery and oranges',
    w: 2, h: 3,
  },
  'dinner-party-laughter': {
    unsplash: 'photo-1789758385775-98ab6db59e00',
    page: 'https://unsplash.com/photos/xzPq2pQxAFk',
    credit: 'Queensland, Australia',
    alt: 'Friends laughing together around a shared dinner table',
    w: 3, h: 2,
  },
  'grandmother-holding-baby': {
    unsplash: 'photo-1652300353103-490b43ac8366',
    page: 'https://unsplash.com/photos/m3ypbJjvXks',
    credit: 'Tim Mossholder',
    alt: 'A great-grandmother smiling as she holds a newborn baby',
    w: 3, h: 2,
  },
  'birthday-candles-kids': {
    unsplash: 'photo-1608790672275-309c02d888ff',
    page: 'https://unsplash.com/photos/As8zq82LBpw',
    credit: 'Nathan Dumlao',
    alt: 'Two children leaning in to blow out birthday candles',
    w: 3, h: 2,
  },
  'carpenter-workshop': {
    unsplash: 'photo-1687422810663-c316494f725a',
    page: 'https://unsplash.com/photos/PxlKOcj0a3Q',
    credit: 'Ali Mkumbwa',
    alt: 'A carpenter smiling as he works on a piece of wood in his workshop',
    w: 3, h: 2,
  },
  'notebook-and-coffee': {
    unsplash: 'photo-1650735311937-1876825e971b',
    page: 'https://unsplash.com/photos/hD9nj1vvVgk',
    credit: 'dlxmedia.hu',
    alt: 'A notebook, pen and latte on a wooden table',
    w: 3, h: 2,
  },
  'autumn-river-forest': {
    unsplash: 'photo-1617803676663-3aa36f6d148c',
    page: 'https://unsplash.com/photos/OwmmilQH_z4',
    credit: 'Derek Sutton',
    alt: 'Autumn forest in red and gold along a winding Canadian river',
    w: 3, h: 2,
  },
  // ── Photos supplied by Chelsey (src/assets/photos/) ──
  'phone-and-monitor-website': {
    file: 'phone-and-monitor-website.jpg',
    alt: 'Hands holding a phone showing a website, in front of the same site on a desktop monitor',
    w: 956, h: 630,
  },
  'laptop-photo-editing': {
    file: 'laptop-photo-editing.jpg',
    alt: 'Someone working on a laptop showing a grid of photos, with a camera on the desk',
    w: 945, h: 630,
  },
  'boutique-owner': {
    file: 'boutique-owner.jpg',
    alt: 'A smiling boutique owner standing in her clothing and gift shop',
    w: 758, h: 504,
  },
  'cafe-owner-apron': {
    file: 'cafe-owner-apron.jpg',
    alt: 'A café owner in a plaid apron standing proudly in front of her counter',
    w: 1123, h: 628,
    focus: '75% 40%',
  },
  'baby-shower-friends': {
    file: 'baby-shower-friends.jpg',
    alt: 'Friends gathered around a mom-to-be at a baby shower with a diaper cake and cupcakes',
    w: 940, h: 630,
  },
  'candlelit-table-roses': {
    file: 'candlelit-table-roses.jpg',
    alt: 'A celebration table with blush roses, tall candles and crystal glasses',
    w: 955, h: 630,
  },
  'sixtieth-birthday-friends': {
    file: 'sixtieth-birthday-friends.jpg',
    alt: 'Friends laughing around a table under gold 60 balloons at a birthday party',
    w: 948, h: 630,
  },
  'stone-bridge-autumn-river': {
    file: 'stone-bridge-autumn-river.jpg',
    alt: 'An old stone arch bridge over a rocky river, with autumn trees behind it',
    w: 1200, h: 1600,
    focus: '50% 45%',
  },
  'ottawa-valley-coffee-storefront': {
    file: 'ottawa-valley-coffee-storefront.jpg',
    alt: 'The Ottawa Valley Coffee storefront glowing with Christmas lights and decorated trees on a snowy winter evening',
    w: 1800, h: 1556,
    focus: '45% 50%',
  },
  'mom-holding-newborn': {
    file: 'mom-holding-newborn.jpg',
    alt: 'A smiling woman in a knit hat cuddling a sleeping newborn baby',
    w: 1600, h: 2130,
  },
  'birthday-girl-cake': {
    file: 'birthday-girl-cake.jpg',
    alt: 'A little girl laughing and pointing beside her doll birthday cake',
    w: 1096, h: 1384,
    focus: '50% 50%',
  },
  'cupcake-dessert-table': {
    file: 'cupcake-dessert-table.jpg',
    alt: 'Rose-piped cupcakes on glass stands in front of a stone wall, with jugs of juice behind them',
    w: 1800, h: 1200,
  },
  'kids-by-the-pond': {
    file: 'kids-by-the-pond.jpg',
    alt: 'A girl leaning down to whisper to her little brother beside a pond on a summer evening',
    w: 1800, h: 1510,
    focus: '70% 60%',
  },
  'campfire-at-night': {
    file: 'campfire-at-night.jpg',
    alt: 'A crackling campfire at night, ringed by logs and outdoor chairs',
    w: 1800, h: 1200,
  },
  'friendship-bracelet-cedar': {
    file: 'friendship-bracelet-cedar.jpg',
    alt: 'A beaded friendship bracelet hanging from a cedar branch, with hills in the distance',
    w: 1800, h: 1200,
    focus: '20% 50%',
  },
  'to-the-lake-sign-snow': {
    file: 'to-the-lake-sign-snow.jpg',
    alt: 'A hand-painted To the Lake sign on a tree beside a snowy winter trail',
    w: 1800, h: 1200,
  },
} satisfies Record<string, Photo>;

export type PhotoName = keyof typeof photos;
