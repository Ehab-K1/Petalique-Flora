import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { ProductImage } from '@/components/ProductImage';
import { TrustBar } from '@/components/TrustBar';
import { ReviewStars } from '@/components/ReviewStars';
import { ReviewCarousel } from '@/components/ReviewCarousel';
import { GuaranteeBadge } from '@/components/GuaranteeBadge';
import { PressLogos } from '@/components/PressLogos';
import { SameDayCountdown } from '@/components/SameDayCountdown';
import { PRODUCTS } from '@/lib/catalog';
import { HOME_TIERS } from '@/lib/plans';
import { cutoffLabel } from '@/lib/sameday';
import { AGGREGATE, homepageReviews } from '@/lib/reviews';

const OCCASION_TILES = [
  { id: 'birthday', name: 'Birthday', sub: 'From $90', tone: 'forest' },
  { id: 'anniversary', name: 'Anniversary', sub: 'From $140', tone: 'forest' },
  { id: 'sympathy', name: 'Sympathy', sub: 'From $90', tone: 'forest' },
  { id: 'just-because', name: 'Just because', sub: 'From $90', tone: 'forest' },
];

const HOW_IT_WORKS = [
  {
    n: '01',
    h: 'Pick your bouquet',
    d: 'Twelve named arrangements, or build your own. Real prices upfront.',
  },
  {
    n: '02',
    h: 'Order by 2pm',
    d: `We hand-tie it this morning and dispatch the same day across the GTA.`,
  },
  {
    n: '03',
    h: 'Delivered tonight',
    d: 'Tracked by text. Your driver waits up to nine minutes at the door.',
  },
];

const FAQ_TEASER = [
  {
    q: 'How fast can you deliver?',
    a: `Same-day across the Greater Toronto Area when you order by ${cutoffLabel()}. We send a tracking text as soon as your driver leaves the studio.`,
  },
  {
    q: 'What if a flower arrives less than perfect?',
    a: 'Send us a photo within 24 hours and we remake the bouquet. No questions, no return shipping. That is the fresh-flower guarantee.',
  },
  {
    q: 'Can I include a gift message?',
    a: 'Yes — a hand-written card is included in every order, free. Engraved silk ribbon is a $15 upgrade and ships with most bouquets.',
  },
  {
    q: 'Do you do subscriptions and weddings?',
    a: 'Both. Weekly home and office plans pause any time. Weddings are consult-led and currently booking 8–12 weeks out.',
  },
];

export default function HomePage() {
  const sellers = PRODUCTS.filter((p) =>
    ['the-sunday', 'ember-anniversary', 'the-quiet-box'].includes(p.slug),
  );
  const fallbackSellers = PRODUCTS.slice(0, 3);
  const featured = sellers.length === 3 ? sellers : fallbackSellers;
  const heroProduct = featured[0];
  const cheapestPlan = HOME_TIERS[0];
  const reviews = homepageReviews();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="v2-hero">
        <div className="container">
          <div className="v2-hero-grid">
            <div className="v2-hero-copy">
              <div className="eyebrow">
                <span className="dot">●</span> Toronto · Mississauga · Vaughan · Oakville
              </div>
              <h1 className="h-hero v2-hero-h1">
                Roses, delivered same-day across the GTA.
              </h1>
              <p className="body-lg v2-hero-lede">
                Hand-tied this morning. With you by 8pm or it&rsquo;s on us.
              </p>
              <div className="v2-hero-cta-row">
                <Link href="/bouquets" className="btn btn-lg">
                  Shop bouquets
                </Link>
                <Link href="/build" className="btn btn-lg btn-ghost">
                  Build your own
                </Link>
              </div>
              <div className="v2-hero-microtrust">
                <ReviewStars rating={AGGREGATE.rating} count={AGGREGATE.count} size={13} />
                <span aria-hidden="true">·</span>
                <span>Same-day cutoff {cutoffLabel()}</span>
                <span aria-hidden="true">·</span>
                <span>Fresh-flower guarantee</span>
              </div>
            </div>
            <div className="v2-hero-media">
              <Link href={`/bouquets/${heroProduct.slug}`} aria-label={`Shop ${heroProduct.name}`}>
                <ProductImage
                  slug={heroProduct.slug}
                  alt={`${heroProduct.name} — same-day Toronto rose delivery`}
                  priority
                  ratio="4/5"
                  sizes="(max-width: 900px) 100vw, 560px"
                />
              </Link>
              <div className="v2-hero-badge">
                <span className="v2-hero-badge-k">Bouquet this week</span>
                <span className="v2-hero-badge-v">{heroProduct.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="container">
          <TrustBar />
        </div>
      </section>

      {/* ── Best sellers ──────────────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">Bestsellers</div>
              <h2 className="h1" style={{ marginTop: 8 }}>
                The bouquets people send most.
              </h2>
            </div>
            <p className="body-lg" style={{ maxWidth: '46ch' }}>
              Real prices, real ratings, real next-day reviews. Pick one as it is, or open it up
              and make it yours.
            </p>
          </header>
          <div className="v2-bestseller-grid">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} eager={i === 0} />
            ))}
          </div>
          <div className="v2-section-foot">
            <Link href="/bouquets" className="btn btn-ghost">
              See all bouquets
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shop by occasion ──────────────────────────────────────────────── */}
      <section className="section-sm bg-paper">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">Shop by occasion</div>
              <h2 className="h2" style={{ marginTop: 8 }}>
                What are you celebrating?
              </h2>
            </div>
          </header>
          <div className="v2-occasion-grid">
            {OCCASION_TILES.map((o) => (
              <Link
                key={o.id}
                href={`/bouquets?occasion=${o.id}`}
                className="v2-occasion-tile"
              >
                <ProductImage
                  slug={`occasion-${o.id}`}
                  alt={`${o.name} flowers in Toronto`}
                  ratio="1/1"
                  sizes="(max-width: 760px) 50vw, 25vw"
                />
                <div className="v2-occasion-body">
                  <span className="v2-occasion-name">{o.name}</span>
                  <span className="v2-occasion-sub">{o.sub}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">How it works</div>
              <h2 className="h2" style={{ marginTop: 8 }}>
                Three steps. Tonight.
              </h2>
            </div>
          </header>
          <div className="v2-how-grid">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.n} className="v2-how-step">
                <span className="v2-how-n">{step.n}</span>
                <h3 className="h3">{step.h}</h3>
                <p className="body">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews carousel ──────────────────────────────────────────────── */}
      <section className="section bg-paper">
        <div className="container">
          <header className="v2-section-head v2-section-head-center">
            <div>
              <div className="marker">What buyers say</div>
              <h2 className="h2" style={{ marginTop: 8 }}>
                Rated{' '}
                <span className="accent">{AGGREGATE.rating.toFixed(1)} out of 5</span> by{' '}
                {AGGREGATE.count.toLocaleString('en-CA')} GTA buyers.
              </h2>
            </div>
          </header>
          <ReviewCarousel reviews={reviews} />
        </div>
      </section>

      {/* ── Same-day + guarantee ──────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <div className="v2-sameday-grid">
            <div>
              <div className="marker">Same-day delivery</div>
              <h2 className="h2" style={{ marginTop: 8 }}>
                Order before {cutoffLabel()}. Roses by tonight.
              </h2>
              <div className="v2-countdown"><SameDayCountdown /></div>
              <ul className="v2-coverage">
                <li>Toronto · Etobicoke · North York · Scarborough</li>
                <li>Mississauga · Brampton · Oakville · Burlington</li>
                <li>Vaughan · Richmond Hill · Markham · Pickering</li>
              </ul>
              <Link href="/bouquets" className="btn">
                Send flowers tonight
              </Link>
            </div>
            <div className="v2-guarantee-card">
              <GuaranteeBadge size={108} />
              <h3 className="h2" style={{ marginTop: 18, maxWidth: '14ch' }}>
                Backed by the fresh-flower guarantee.
              </h3>
              <ul className="v2-guarantee-list">
                <li>
                  <strong>Not perfect?</strong> Send a photo within 24h. We remake the bouquet,
                  free, with same-day re-delivery.
                </li>
                <li>
                  <strong>Real customer support.</strong> Reply to any email and a real person at
                  Petalique answers — usually inside an hour.
                </li>
                <li>
                  <strong>Secure checkout.</strong> Payments handled by Stripe. We never see your
                  card details.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subscription teaser ───────────────────────────────────────────── */}
      <section className="section-sm bg-paper">
        <div className="container">
          <div className="v2-subs-band">
            <div>
              <div className="marker">Subscriptions</div>
              <h2 className="h2" style={{ marginTop: 8, maxWidth: '20ch' }}>
                Fresh flowers, every week, without thinking about it.
              </h2>
              <p className="body-lg" style={{ marginTop: 12, maxWidth: '46ch' }}>
                Pause, skip or cancel from your account in two taps. One monthly invoice. Free
                delivery on every drop.
              </p>
              <p className="v2-subs-price">
                From ${cheapestPlan.perDelivery}/week · {cheapestPlan.name} arrangement
              </p>
              <div className="v2-subs-cta">
                <Link href="/subscriptions" className="btn">
                  See home plans
                </Link>
                <Link href="/corporate" className="btn btn-ghost">
                  For business
                </Link>
              </div>
            </div>
            <div className="v2-subs-media">
              <ProductImage
                slug="subscription-home"
                alt="Weekly flower subscription on a kitchen table"
                ratio="4/5"
                sizes="(max-width: 900px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ teaser ────────────────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">FAQ</div>
              <h2 className="h2" style={{ marginTop: 8 }}>
                Things people ask before ordering.
              </h2>
            </div>
          </header>
          <ul className="v2-faq-list">
            {FAQ_TEASER.map((f) => (
              <li key={f.q}>
                <details>
                  <summary>{f.q}</summary>
                  <p className="body">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="v2-section-foot">
            <Link href="/about#faq" className="link-underline">
              All questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Press ─────────────────────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="container">
          <PressLogos />
        </div>
      </section>
    </>
  );
}
