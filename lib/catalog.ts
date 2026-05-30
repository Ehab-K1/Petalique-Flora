import type {
  Product,
  Colour,
  ColourId,
  Option,
  AddOn,
  Occasion,
} from './types';

// ── Occasions ────────────────────────────────────────────────────────────────
export const OCCASIONS: { id: Occasion; name: string }[] = [
  { id: 'birthday', name: 'Birthday' },
  { id: 'anniversary', name: 'Anniversary' },
  { id: 'apology', name: 'Apology' },
  { id: 'congratulations', name: 'Congratulations' },
  { id: 'sympathy', name: 'Sympathy' },
  { id: 'just-because', name: 'Just because' },
  { id: 'new-baby', name: 'New baby' },
  { id: 'wedding', name: 'Wedding' },
];

// ── Rose colours ─────────────────────────────────────────────────────────────
export const COLOURS: Record<ColourId, Colour> = {
  white: { id: 'white', name: 'White', hex: '#F4EFE6', upcharge: 0 },
  blush: { id: 'blush', name: 'Blush', hex: '#E6C7C2', upcharge: 0 },
  pink: { id: 'pink', name: 'Pink', hex: '#D98BA0', upcharge: 0 },
  red: { id: 'red', name: 'Red', hex: '#8A2230', upcharge: 0 },
  peach: { id: 'peach', name: 'Peach', hex: '#E4A988', upcharge: 0 },
  lavender: { id: 'lavender', name: 'Lavender', hex: '#B9A7C9', upcharge: 0 },
  butter: { id: 'butter', name: 'Butter', hex: '#E8D49B', upcharge: 0 },
  terracotta: { id: 'terracotta', name: 'Terracotta', hex: '#B5654A', upcharge: 0 },
  midnight: { id: 'midnight', name: 'Midnight (tinted)', hex: '#5B6E8C', upcharge: 15, premium: true },
  ombre: { id: 'ombre', name: 'Ombré', hex: '#C98A7D', upcharge: 15, premium: true },
};

export const colourList = (ids: ColourId[]): Colour[] => ids.map((i) => COLOURS[i]);

// ── Rose count → price ───────────────────────────────────────────────────────
export const COUNT_PRESETS: { count: number; price: number; label: string }[] = [
  { count: 12, price: 90, label: 'A dozen' },
  { count: 24, price: 140, label: 'Two dozen' },
  { count: 36, price: 185, label: 'Three dozen' },
  { count: 50, price: 240, label: 'The Fifty' },
];

const ANCHORS: [number, number][] = [
  [12, 90],
  [24, 140],
  [36, 185],
  [50, 240],
];

const round5 = (n: number) => Math.round(n / 5) * 5;

/** Live price for any rose count (6–100), piecewise-linear across anchors. */
export function rosePrice(count: number): number {
  const n = Math.max(6, Math.min(100, Math.round(count)));
  if (n <= 12) return round5(54 + n * 3); // 6→72, 12→90
  if (n >= 50) return round5(240 + (n - 50) * 3.9);
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [a, pa] = ANCHORS[i];
    const [b, pb] = ANCHORS[i + 1];
    if (n >= a && n <= b) return round5(pa + ((pb - pa) * (n - a)) / (b - a));
  }
  return 240;
}

// ── Wraps & bows ─────────────────────────────────────────────────────────────
export const WRAPS: Option[] = [
  { id: 'signature-bone', name: 'Signature Bone', upcharge: 0, note: 'Matte bone paper, our house wrap' },
  { id: 'kraft', name: 'Natural Kraft', upcharge: 0, note: 'Unbleached, market-style' },
  { id: 'aubergine', name: 'Aubergine & Champagne', upcharge: 8, note: 'Cinematic, for evening gifts' },
  { id: 'quiet-box', name: 'The Quiet Box', upcharge: 12, note: 'Sealed window box with wax stamp' },
];

export const BOWS: Option[] = [
  { id: 'silk-bone', name: 'Silk Bone', upcharge: 0, note: 'Hand-tied house ribbon' },
  { id: 'velvet-ember', name: 'Velvet Ember', upcharge: 6, note: 'Deep rose-terracotta velvet' },
  { id: 'engraved', name: 'Engraved Silk Ribbon', upcharge: 15, note: 'Foil-stamped: two letters, a date, or a word' },
];

// ── Add-ons ("Complete the gift") ────────────────────────────────────────────
export const ADDONS: AddOn[] = [
  { id: 'note-card', name: 'Letterpress note card', desc: 'Hand-written by the team, never printed.', price: 12 },
  { id: 'vase', name: 'Hand-blown glass vase', desc: 'Clear, weighted, ready to receive.', price: 28 },
  { id: 'chocolates', name: 'Belgian chocolates', desc: 'Nine pieces, dark & sea salt.', price: 18 },
  { id: 'candle', name: 'Atelier soy candle', desc: 'Fig, cedar, a little smoke.', price: 24 },
];

// ── The bouquet catalogue ────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    slug: 'the-sunday',
    name: 'The Sunday',
    latin: 'Rosa · Gypsophila',
    occasions: ['just-because', 'birthday', 'new-baby'],
    defaultColour: 'blush',
    colours: ['blush', 'pink', 'white', 'peach'],
    defaultCount: 12,
    basePrice: 90,
    blurb: 'Blush garden roses, a cloud of baby’s breath.',
    description:
      'The bouquet we make most often, and the one we’d send our own mothers. Blush garden roses gathered close with a soft cloud of gypsophila, hand-tied in bone paper and finished with a silk knot. Quiet, generous, and impossible to get wrong.',
    badges: ['Best seller'],
    inSeason: true,
    bestSeller: true,
    rating: 4.97,
    reviews: 312,
    shotLabel: 'Blush roses + baby’s breath · 4:5 portrait · cream backdrop',
    imageTone: 'blush',
  },
  {
    slug: 'ember-anniversary',
    name: 'Ember Anniversary',
    latin: 'Rosa · “Explorer” red',
    occasions: ['anniversary', 'just-because'],
    defaultColour: 'red',
    colours: ['red', 'terracotta', 'ombre'],
    defaultCount: 24,
    basePrice: 140,
    blurb: 'Deep red roses, baby’s breath, an engraved ribbon.',
    description:
      'A round of velvet-red roses ringed in baby’s breath, wrapped dark and finished with a foil-stamped silk ribbon you choose the words for. Built for the anniversary that deserves to be said out loud.',
    badges: ['Engravable'],
    inSeason: true,
    bestSeller: true,
    rating: 4.98,
    reviews: 204,
    shotLabel: 'Red roses, round bouquet, engraved ribbon · 4:5 · aubergine wrap',
    imageTone: 'ember',
  },
  {
    slug: 'first-light',
    name: 'First Light',
    latin: 'Rosa · Lilium',
    occasions: ['birthday', 'congratulations', 'just-because'],
    defaultColour: 'pink',
    colours: ['pink', 'blush', 'peach', 'white'],
    defaultCount: 12,
    basePrice: 120,
    blurb: 'Pink roses opening among white lilies.',
    description:
      'Pink roses and just-opening white lilies, with snapdragon and a breath of gypsophila — a bouquet with a little height and a lot of optimism. Wrapped in blush, tied long.',
    inSeason: true,
    rating: 4.96,
    reviews: 141,
    shotLabel: 'Pink roses + white lilies · 4:5 · blush scalloped wrap',
    imageTone: 'blush',
  },
  {
    slug: 'still-water',
    name: 'Still Water',
    latin: 'Rosa · Hydrangea · Eucalyptus',
    occasions: ['congratulations', 'new-baby', 'just-because'],
    defaultColour: 'midnight',
    colours: ['midnight', 'white', 'lavender'],
    defaultCount: 12,
    basePrice: 130,
    blurb: 'Blue-tinted roses, white hydrangea, eucalyptus.',
    description:
      'Cooled-down and calm: roses tinted the colour of dusk, paired with white hydrangea and trailing eucalyptus. The one to send for a son, a graduation, a steadying word.',
    badges: ['Tinted roses'],
    rating: 4.95,
    reviews: 88,
    shotLabel: 'Blue-tinted roses + hydrangea + eucalyptus · 4:5 · white wrap',
    imageTone: 'sage',
  },
  {
    slug: 'the-quiet-box',
    name: 'The Quiet Box',
    latin: 'Rosa · Gypsophila · Dianthus',
    occasions: ['just-because', 'birthday', 'apology'],
    defaultColour: 'pink',
    colours: ['pink', 'blush', 'white', 'red'],
    defaultCount: 24,
    basePrice: 110,
    blurb: 'Roses and baby’s breath set in our sealed window box.',
    description:
      'Our signature gift box: roses and gypsophila set petal-up in a sealed window box with a wax stamp, so it photographs the moment it’s opened and travels without a bruise. Reach for it when it has to arrive perfectly.',
    badges: ['Gift box'],
    bestSeller: true,
    rating: 4.97,
    reviews: 176,
    shotLabel: 'Pink + white roses in white window gift box · 4:5 · overhead-soft',
    imageTone: 'cream',
  },
  {
    slug: 'white-address',
    name: 'White Address',
    latin: 'Rosa · Dianthus · Gypsophila',
    occasions: ['sympathy', 'congratulations', 'wedding'],
    defaultColour: 'white',
    colours: ['white'],
    defaultCount: 24,
    basePrice: 115,
    blurb: 'All-white roses and carnations, in the box.',
    description:
      'An all-white composition of roses, carnations and baby’s breath in the sealed box — the most quietly correct thing to send for a sympathy, a christening, or a room that should feel calm.',
    rating: 4.98,
    reviews: 97,
    shotLabel: 'All-white roses + carnations gift box · 4:5 · cream on cream',
    imageTone: 'cream',
  },
  {
    slug: 'the-fifty',
    name: 'The Fifty',
    latin: 'Rosa · fifty stems',
    occasions: ['anniversary', 'apology', 'congratulations'],
    defaultColour: 'red',
    colours: ['red', 'blush', 'white', 'pink'],
    defaultCount: 50,
    basePrice: 240,
    blurb: 'Fifty roses. The grand gesture, made well.',
    description:
      'Fifty roses, gathered into one heavy, hand-tied dome and wrapped to be carried with two arms. The bouquet for the apology that means it, or the number that matters.',
    badges: ['The grand gesture'],
    rating: 4.99,
    reviews: 64,
    shotLabel: 'Fifty red roses, large hand-tied dome · 4:5 · aubergine wrap',
    imageTone: 'ember',
  },
  {
    slug: 'morning-market',
    name: 'Morning Market',
    latin: 'Seasonal · florist’s choice',
    occasions: ['just-because', 'birthday', 'congratulations'],
    defaultColour: 'peach',
    colours: ['peach', 'butter', 'blush', 'lavender'],
    defaultCount: 12,
    basePrice: 95,
    blurb: 'Whatever’s best at market this morning, arranged our way.',
    description:
      'A florist’s-choice bouquet built from whatever arrived best at the flower market that morning — ranunculus, tulips, anemone, in a warm seasonal palette. Different every week, our eye every time.',
    badges: ['Florist’s choice'],
    inSeason: true,
    rating: 4.94,
    reviews: 120,
    shotLabel: 'Seasonal mixed bouquet, warm palette · 4:5 · market light',
    imageTone: 'cream',
  },
  {
    slug: 'taupe-and-cream',
    name: 'Taupe & Cream',
    latin: 'Rosa · Eustoma · Ranunculus',
    occasions: ['wedding', 'congratulations', 'just-because'],
    defaultColour: 'white',
    colours: ['white', 'blush', 'butter'],
    defaultCount: 24,
    basePrice: 125,
    blurb: 'A neutral, editorial bouquet in cream and taupe.',
    description:
      'Cream roses, lisianthus and ranunculus in the most photographable neutral we make — the bouquet brides ask us to recreate, and the one that suits a modern room with nothing to prove.',
    rating: 4.96,
    reviews: 73,
    shotLabel: 'Cream + taupe editorial bouquet · 4:5 · neutral backdrop',
    imageTone: 'cream',
  },
  {
    slug: 'butter-light',
    name: 'Butter Light',
    latin: 'Rosa · Narcissus · Tulipa',
    occasions: ['congratulations', 'birthday', 'just-because'],
    defaultColour: 'butter',
    colours: ['butter', 'peach', 'white'],
    defaultCount: 12,
    basePrice: 98,
    blurb: 'Soft yellow roses, narcissus, the first warm day.',
    description:
      'Butter-yellow roses with narcissus and tulip — the bouquet that reads like the first warm morning of the year. For a new job, a new home, a reason to be glad.',
    inSeason: true,
    rating: 4.93,
    reviews: 58,
    shotLabel: 'Soft yellow roses + narcissus · 4:5 · warm light',
    imageTone: 'cream',
  },
  {
    slug: 'lavender-hour',
    name: 'Lavender Hour',
    latin: 'Rosa · Eustoma · Limonium',
    occasions: ['sympathy', 'just-because', 'birthday'],
    defaultColour: 'lavender',
    colours: ['lavender', 'white', 'blush'],
    defaultCount: 12,
    basePrice: 105,
    blurb: 'Lavender roses and lisianthus, calm as dusk.',
    description:
      'Lavender roses, lisianthus and a haze of limonium — a cool, consoling palette for the evening of a hard day or the desk of someone who needs a little quiet.',
    rating: 4.95,
    reviews: 49,
    shotLabel: 'Lavender roses + lisianthus · 4:5 · dusk tone',
    imageTone: 'sage',
  },
  {
    slug: 'terracotta-table',
    name: 'Terracotta Table',
    latin: 'Rosa · Leucadendron · Eucalyptus',
    occasions: ['just-because', 'congratulations', 'wedding'],
    defaultColour: 'terracotta',
    colours: ['terracotta', 'peach', 'butter'],
    defaultCount: 24,
    basePrice: 135,
    blurb: 'Terracotta roses and foliage for the table you live at.',
    description:
      'Earthy terracotta roses with leucadendron and eucalyptus — a warmer, architectural bouquet built to sit on a table for a week and look intentional the whole time. A Lived Spaces favourite.',
    badges: ['Lived Spaces'],
    rating: 4.96,
    reviews: 41,
    shotLabel: 'Terracotta roses + foliage, low arrangement · 4:5 · warm room',
    imageTone: 'ember',
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const bestSellers = (): Product[] => PRODUCTS.filter((p) => p.bestSeller);

export const productsByOccasion = (occ: Occasion): Product[] =>
  PRODUCTS.filter((p) => p.occasions.includes(occ));
