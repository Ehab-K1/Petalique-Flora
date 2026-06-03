// Recurring-revenue + trade + weddings data: subscriptions, corporate, wholesale,
// and wedding packages. All estimators are pure functions for live pricing.

// ── Home subscriptions ("Lived Spaces") ──────────────────────────────────────
export interface HomeTier {
  id: string;
  name: string;
  perDelivery: number;
  desc: string;
}
export const HOME_TIERS: HomeTier[] = [
  { id: 'petite', name: 'Petite', perDelivery: 45, desc: 'A small, considered arrangement for a console or bedside.' },
  { id: 'signature', name: 'Signature', perDelivery: 75, desc: 'The dining-table centrepiece. Our most-chosen home plan.' },
  { id: 'grand', name: 'Grand', perDelivery: 120, desc: 'A statement arrangement for an entryway or open kitchen.' },
];

// ── Corporate tiers ──────────────────────────────────────────────────────────
export interface CorpTier {
  id: string;
  name: string;
  perDelivery: number;
  desc: string;
}
export const CORP_TIERS: CorpTier[] = [
  { id: 'reception', name: 'Reception', perDelivery: 85, desc: 'One designed arrangement for a front desk or reception.' },
  { id: 'lobby', name: 'Lobby', perDelivery: 160, desc: 'A larger lobby piece plus a reception arrangement.' },
  { id: 'suite', name: 'Suite', perDelivery: 280, desc: 'Lobby, reception and meeting-room florals, fully styled.' },
];

export const FREQUENCIES = [
  { id: 'weekly', name: 'Weekly', perMonth: 4.33 },
  { id: 'biweekly', name: 'Biweekly', perMonth: 2.17 },
  { id: 'monthly', name: 'Monthly', perMonth: 1 },
] as const;
export type FrequencyId = (typeof FREQUENCIES)[number]['id'];

export function monthlyEstimate(perDelivery: number, freq: FrequencyId, locations = 1): number {
  const f = FREQUENCIES.find((x) => x.id === freq) ?? FREQUENCIES[0];
  return Math.round((perDelivery * f.perMonth * locations) / 5) * 5;
}

// ── Wholesale / trade ────────────────────────────────────────────────────────
export type TradeCategory = 'Roses' | 'Focal' | 'Filler' | 'Greenery';
export type TradeTone = 'blush' | 'ember' | 'sage' | 'cream' | 'aubergine';

export interface TradeItem {
  id: string;
  name: string;
  latin: string;
  unit: string;
  pricePerUnit: number;
  moq: number;
  stock: 'in' | 'low' | 'pre';
  category: TradeCategory;
  tone: TradeTone;
  blurb: string;
  grade: string;
  seasonal?: boolean;
}
export const TRADE_ITEMS: TradeItem[] = [
  { id: 'garden-rose', name: 'Garden Roses', latin: 'Rosa', unit: 'stem', pricePerUnit: 2.4, moq: 25, stock: 'in', category: 'Roses', tone: 'blush', grade: '50–60cm', blurb: 'Open-cut English heads in blush, cream and terracotta. Our backbone stem.' },
  { id: 'babys-breath', name: 'Baby’s Breath', latin: 'Gypsophila', unit: 'bunch', pricePerUnit: 6.5, moq: 10, stock: 'in', category: 'Filler', tone: 'cream', grade: 'XL bunch', blurb: 'Dense, bright-white clouds. Sold by the wrapped bunch.' },
  { id: 'ranunculus', name: 'Ranunculus', latin: 'Ranunculus', unit: 'stem', pricePerUnit: 3.1, moq: 25, stock: 'low', category: 'Focal', tone: 'blush', grade: 'Clooney', blurb: 'Layered, papery heads. Limited cut this week — order ahead.' },
  { id: 'eucalyptus', name: 'Eucalyptus', latin: 'Eucalyptus cinerea', unit: 'bunch', pricePerUnit: 7.2, moq: 10, stock: 'in', category: 'Greenery', tone: 'sage', grade: 'Silver dollar', blurb: 'Silver-dollar foliage, heavy bunches. The reliable trail.' },
  { id: 'hydrangea', name: 'Hydrangea', latin: 'Hydrangea macrophylla', unit: 'stem', pricePerUnit: 4.5, moq: 20, stock: 'in', category: 'Focal', tone: 'blush', grade: 'Jumbo head', blurb: 'Full mophead in antique and blue. Volume in a single stem.' },
  { id: 'tulip', name: 'Tulips', latin: 'Tulipa', unit: 'stem', pricePerUnit: 1.9, moq: 50, stock: 'in', category: 'Focal', tone: 'cream', grade: 'French', blurb: 'Tall French tulips that keep moving in the vase. Best value stem.' },
  { id: 'lisianthus', name: 'Lisianthus', latin: 'Eustoma', unit: 'stem', pricePerUnit: 2.8, moq: 25, stock: 'low', category: 'Filler', tone: 'blush', grade: 'Double', blurb: 'Rose-like doubles in soft palettes. A gentle volume filler.' },
  { id: 'peony', name: 'Peonies', latin: 'Paeonia', unit: 'stem', pricePerUnit: 6.5, moq: 20, stock: 'pre', category: 'Focal', tone: 'ember', grade: 'Coral / Sarah', blurb: 'Seasonal pre-order. Tight buds shipped cold to open on site.', seasonal: true },
];

export const TRADE_CATEGORIES: TradeCategory[] = ['Roses', 'Focal', 'Filler', 'Greenery'];

export const VOLUME_BREAKS = [
  { min: 0, discount: 0, label: 'List' },
  { min: 100, discount: 0.08, label: '100+' },
  { min: 250, discount: 0.14, label: '250+' },
  { min: 500, discount: 0.2, label: '500+' },
];

export function tradeBreak(qty: number) {
  return [...VOLUME_BREAKS].reverse().find((b) => qty >= b.min) ?? VOLUME_BREAKS[0];
}

// ── Wedding packages ─────────────────────────────────────────────────────────
export interface WeddingPackage {
  id: string;
  name: string;
  from: number;
  desc: string;
  includes: string[];
}
export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'elopement',
    name: 'The Elopement',
    from: 1200,
    desc: 'Intimate ceremonies and small celebrations — up to 20 guests.',
    includes: ['Bridal bouquet + one accompaniment', 'Two boutonnières / wristlets', 'One ceremony moment', 'Press & Keep included'],
  },
  {
    id: 'celebration',
    name: 'The Celebration',
    from: 4500,
    desc: 'The full-day wedding — ceremony and reception, fully designed.',
    includes: ['Bridal party florals', 'Ceremony arch or aisle', 'Reception centrepieces', 'On-site styling team', 'Press & Keep included'],
  },
  {
    id: 'installation',
    name: 'The Installation',
    from: 12000,
    desc: 'Statement florals and built installations for large venues.',
    includes: ['Suspended or built installation', 'Full ceremony + reception design', 'Dedicated lead designer', 'Install + strike crew', 'Press & Keep included'],
  },
];

export const CEREMONY_TYPES = [
  'Wedding',
  'Engagement',
  'Nikkah',
  'Reception',
  'Mehndi',
  'Christening',
  'Diwali',
  'Anniversary party',
  'Corporate event',
  'Other celebration',
];

export const BUDGET_BANDS = ['Under $2,000', '$2,000 – $5,000', '$5,000 – $12,000', '$12,000 – $30,000', '$30,000+'];
