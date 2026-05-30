import Link from 'next/link';
import { Placeholder } from '@/components/Placeholder';
import { TrustBar } from '@/components/TrustBar';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { PetalMark } from '@/components/PetalMark';
import { PRODUCTS, bestSellers } from '@/lib/catalog';

const LINES = [
  { k: '01', n: 'Weddings & Events', d: 'Bouquets, ceremony & reception florals, installations and décor.', entry: 'Consult-led', cta: 'Book a consult', href: '/weddings' },
  { k: '02', n: 'Gifting', d: 'Named bouquets and gift boxes, same-day across the GTA.', entry: 'From $90', cta: 'Send flowers', href: '/bouquets' },
  { k: '03', n: 'Corporate & Subscriptions', d: 'Weekly arrangements for offices, lobbies, hotels & restaurants — one monthly fee.', entry: 'From $240/mo', cta: 'Start a plan', href: '/corporate' },
  { k: '04', n: 'Wholesale', d: 'Fresh stems by the bunch or box for florists, planners & studios.', entry: 'Trade pricing', cta: 'Open an account', href: '/wholesale' },
  { k: '05', n: 'Lived Spaces', d: 'Standing home arrangements and seasonal styling for the table you live at.', entry: 'From $120', cta: 'Style my space', href: '/subscriptions' },
];

const SIGNATURES = [
  { n: 'The Engraved Ribbon', d: 'Every bouquet ships with a silk ribbon, foil-stamped with two letters, a date, or a single word. The keepsake after the petals are gone.' },
  { n: 'The Quiet Box', d: 'Matte stone outer, ivory dust cover, a sealed wax stamp. Opens with one motion. Photographs without trying.' },
  { n: 'The 9-Minute Doorstep', d: 'The driver waits up to nine minutes, sends a discreet SMS, then leaves a sealed box. Standard, not premium.' },
];

export default function HomePage() {
  const sellers = [...bestSellers(), ...PRODUCTS.filter((p) => !p.bestSeller)].slice(0, 8);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow" style={{ marginBottom: 22 }}>
                <span className="dot">●</span> Canadian luxury floral house
              </div>
              <h1 className="h-hero serif-em">
                For the moments worth <em>dressing&nbsp;up</em> for.
              </h1>
              <p className="body-lg hero-lede">
                A Canadian floral house for gifting, weekly subscriptions, weddings and wholesale —
                designed with an editorial eye and delivered with a family’s warmth.
              </p>
              <div className="hero-cta-row">
                <Link href="/bouquets" className="btn btn-lg">
                  Shop bouquets
                </Link>
                <Link href="/subscriptions" className="btn btn-lg btn-ghost">
                  Weekly flowers
                </Link>
              </div>
            </div>
            <div className="hero-media">
              <Placeholder
                label="Bouquet of the week · 4:5 portrait · single window light"
                tone="blush"
                ratio="4 / 5"
              />
            </div>
          </div>
          <TrustBar />
        </div>
      </section>

      {/* ── Best sellers ───────────────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <Reveal>
            <header className="section-head">
              <div>
                <div className="marker">01 — Gifting</div>
                <div className="eyebrow" style={{ marginTop: 8 }}>
                  <span className="dot">●</span> Named arrangements
                </div>
              </div>
              <div>
                <h2 className="h1">The ones we send most.</h2>
                <p className="body-lg maxch">
                  Rose-count led, priced in the open, same-day across the GTA. Choose a bouquet as it
                  is, or open it up and make it yours.
                </p>
              </div>
            </header>
          </Reveal>
          <Reveal delay={80}>
            <div className="product-grid">
              {sellers.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Reveal>
          <div className="center" style={{ justifyContent: 'center', marginTop: 'var(--s-7)' }}>
            <Link href="/bouquets" className="btn btn-ghost">
              See all bouquets
            </Link>
          </div>
        </div>
      </section>

      {/* ── Five lines, one signature ──────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              <span className="dot">●</span> Five lines · one signature
            </div>
            <h2 className="h1" style={{ maxWidth: '16ch', marginBottom: 'var(--s-7)' }}>
              One trusted house for the gift, the plan, the event and the trade order.
            </h2>
          </Reveal>
          <div className="lines-band">
            {LINES.map((b, i) => (
              <Reveal key={b.k} delay={i * 60}>
                <Link href={b.href} className="line-item">
                  <span className="mono line-k">{b.k}</span>
                  <span className="display line-n">{b.n}</span>
                  <span className="caption line-d">{b.d}</span>
                  <span className="mono line-entry">{b.entry}</span>
                  <span className="link-underline line-cta">{b.cta} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature experiences ──────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <Reveal>
            <header className="section-head">
              <div>
                <div className="marker">02 — What we own</div>
                <div className="eyebrow" style={{ marginTop: 8 }}>
                  <span className="dot">●</span> The gap is the moment
                </div>
              </div>
              <div>
                <h2 className="h1">Not just the flower — the memory of it.</h2>
              </div>
            </header>
          </Reveal>
          <div className="col-3">
            {SIGNATURES.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="card card-hover" style={{ height: '100%' }}>
                  <PetalMark size={22} />
                  <h3 className="h3" style={{ marginTop: 16 }}>
                    {s.n}
                  </h3>
                  <p className="body" style={{ marginTop: 8 }}>
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────────────────────────────── */}
      <section className="section bg-aubergine on-dark">
        <div className="container">
          <Reveal>
            <div className="testimonial">
              <div className="eyebrow" style={{ color: 'rgba(239,232,221,0.55)', marginBottom: 20 }}>
                <span className="dot">●</span> A note we kept
              </div>
              <blockquote className="pull on-dark">
                “For Sana, the morning of. White anemones, almond branches, a knot of taupe silk. The
                driver waited at the door for nine minutes — she couldn’t <em>stop looking</em>.”
              </blockquote>
              <p className="mono" style={{ marginTop: 24, color: 'rgba(239,232,221,0.55)', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: 11 }}>
                Amara & Sana · wedding, June
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Founder story ──────────────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <div className="founder">
            <Reveal>
              <Placeholder label="Founder at the market · 3:2 · morning light" tone="ember" ratio="3 / 2" />
            </Reveal>
            <Reveal delay={80}>
              <div className="founder-copy">
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  <span className="dot">●</span> The house
                </div>
                <h2 className="h2 serif-em">
                  Founded by a family that knows weddings the way other families know{' '}
                  <em>harvests</em>.
                </h2>
                <p className="body-lg" style={{ marginTop: 20, maxWidth: '46ch' }}>
                  Petalique Flora is built on the belief that flowers are how love sounds out loud —
                  and that a bouquet, well-made, can hold a whole room still for a second. One
                  editorial eye, one standard of care, from a $90 gift to a $90,000 install.
                </p>
                <div style={{ marginTop: 26 }}>
                  <Link href="/atelier" className="btn btn-ghost">
                    Meet the atelier
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Recurring revenue CTA ──────────────────────────────────────────── */}
      <section className="section-sm bg-cream">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2 className="h2" style={{ maxWidth: '20ch' }}>
                Make it a standing order.
              </h2>
              <p className="body-lg" style={{ marginTop: 12, maxWidth: '44ch' }}>
                Weekly flowers for the home, the office, the lobby — one monthly invoice, paused any
                time. Our most quietly loved service.
              </p>
            </div>
            <div className="center gap-3 wrap">
              <Link href="/subscriptions" className="btn btn-sage btn-lg">
                Home subscriptions
              </Link>
              <Link href="/corporate" className="btn btn-ghost btn-lg">
                For business
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
