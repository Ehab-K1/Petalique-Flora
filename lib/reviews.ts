/**
 * Sample customer reviews — illustrative placeholder data.
 *
 * Wire this to a real review feed (Google Business, Trustpilot, Judge.me, etc.)
 * before launch. The component layer reads only the shape below, so swapping
 * the source is a one-file change.
 */

export type Review = {
  id: string;
  productSlug: string;
  rating: number;
  quote: string;
  name: string;
  location: string;
  product: string;
  verified: boolean;
  date: string;
};

export const AGGREGATE = {
  rating: 4.9,
  count: 1127,
};

const REVIEWS: Review[] = [
  {
    id: 'r-001',
    productSlug: 'the-sunday',
    rating: 5,
    quote:
      'Showed up an hour after I ordered and looked exactly like the photo. Wife still texting me pictures of it three days later.',
    name: 'Daniel R.',
    location: 'Etobicoke',
    product: 'The Sunday',
    verified: true,
    date: '2026-05-14',
  },
  {
    id: 'r-002',
    productSlug: 'ember-anniversary',
    rating: 5,
    quote:
      'Engraved ribbon, real card, no chain-store filler. This is what I’d send to a client I want to keep.',
    name: 'Priya S.',
    location: 'Mississauga',
    product: 'Ember Anniversary',
    verified: true,
    date: '2026-05-08',
  },
  {
    id: 'r-003',
    productSlug: 'still-water',
    rating: 5,
    quote:
      'Ordered for my grandmother — it arrived perfectly chilled and lasted twelve full days. Driver was kind, not pushy.',
    name: 'Marcus L.',
    location: 'Vaughan',
    product: 'Still Water',
    verified: true,
    date: '2026-04-30',
  },
  {
    id: 'r-004',
    productSlug: 'the-quiet-box',
    rating: 5,
    quote:
      'Birthday gift for a friend who hates ordinary roses. The box alone got her on FaceTime within thirty seconds.',
    name: 'Anika J.',
    location: 'Toronto',
    product: 'The Quiet Box',
    verified: true,
    date: '2026-04-22',
  },
  {
    id: 'r-005',
    productSlug: 'the-fifty',
    rating: 5,
    quote:
      'Fifty roses for our anniversary and not one of them was past its peak. Felt like I paid double, in a good way.',
    name: 'Christopher A.',
    location: 'Oakville',
    product: 'The Fifty',
    verified: true,
    date: '2026-04-15',
  },
  {
    id: 'r-006',
    productSlug: 'first-light',
    rating: 4,
    quote:
      'A bloom was slightly bruised. Messaged them and a replacement was on my porch the next morning. That’s the part I’ll remember.',
    name: 'Sofia M.',
    location: 'North York',
    product: 'First Light',
    verified: true,
    date: '2026-04-09',
  },
  {
    id: 'r-007',
    productSlug: 'morning-market',
    rating: 5,
    quote:
      'I run a small studio in Liberty Village. Their weekly subscription is the only thing on the table that gets compliments every Monday.',
    name: 'Rachel K.',
    location: 'Toronto',
    product: 'Subscription · Morning Market',
    verified: true,
    date: '2026-03-30',
  },
  {
    id: 'r-008',
    productSlug: 'taupe-and-cream',
    rating: 5,
    quote:
      'Stylist for a brand shoot — these were the only flowers we didn’t have to retouch. Knew what they were doing.',
    name: 'Yusuf B.',
    location: 'Toronto',
    product: 'Taupe & Cream',
    verified: true,
    date: '2026-03-22',
  },
  {
    id: 'r-009',
    productSlug: 'lavender-hour',
    rating: 5,
    quote:
      'My mother-in-law cried. Which is impressive because she has not cried since 1998. Worth every dollar.',
    name: 'Jenna T.',
    location: 'Burlington',
    product: 'Lavender Hour',
    verified: true,
    date: '2026-03-14',
  },
  {
    id: 'r-010',
    productSlug: 'white-address',
    rating: 5,
    quote:
      'We use Petalique for every closing gift in our office now. Clients keep asking who we use. We don’t tell them.',
    name: 'Adrian P.',
    location: 'Toronto',
    product: 'White Address · Corporate',
    verified: true,
    date: '2026-03-04',
  },
  {
    id: 'r-011',
    productSlug: 'butter-light',
    rating: 5,
    quote:
      'Sympathy arrangement for a colleague. The note was hand-written, not printed. Tells you everything.',
    name: 'Hannah W.',
    location: 'Hamilton',
    product: 'Butter Light',
    verified: true,
    date: '2026-02-26',
  },
  {
    id: 'r-012',
    productSlug: 'terracotta-table',
    rating: 5,
    quote:
      'Booked them for our small wedding. Two consultations, one quote, no nonsense. The arch made the whole day.',
    name: 'Elena & Tom',
    location: 'Caledon',
    product: 'Weddings · Terracotta Table',
    verified: true,
    date: '2026-02-18',
  },
];

export function reviewsFor(productSlug: string, limit = 6): Review[] {
  const matches = REVIEWS.filter((r) => r.productSlug === productSlug);
  if (matches.length >= limit) return matches.slice(0, limit);
  const others = REVIEWS.filter((r) => r.productSlug !== productSlug).slice(0, limit - matches.length);
  return [...matches, ...others];
}

export function homepageReviews(): Review[] {
  return REVIEWS.slice(0, 6);
}

export function aggregateFor(productSlug: string): { rating: number; count: number } {
  const matches = REVIEWS.filter((r) => r.productSlug === productSlug);
  if (matches.length === 0) return { rating: AGGREGATE.rating, count: AGGREGATE.count };
  const avg = matches.reduce((s, r) => s + r.rating, 0) / matches.length;
  return { rating: Math.round(avg * 10) / 10, count: matches.length * 84 + 7 };
}
