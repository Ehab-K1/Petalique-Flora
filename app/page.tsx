import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { FiveLines } from '@/components/home/FiveLines';
import { Placeholder } from '@/components/Placeholder';
import { TrustBar } from '@/components/TrustBar';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { Parallax } from '@/components/motion/Parallax';
import { Magnetic } from '@/components/motion/Magnetic';
import { PRODUCTS, bestSellers } from '@/lib/catalog';

type Tone = 'blush' | 'ember' | 'sage' | 'cream' | 'aubergine';

const SIGNATURES: { n: string; d: string; tone: Tone; shot: string }[] = [
  {
    n: 'The Engraved Ribbon',
    d: 'Every bouquet ships with a silk ribbon, foil-stamped with two letters, a date, or a single word. The keepsake after the petals are gone.',
    tone: 'ember',
    shot: 'Foil-stamped silk ribbon · 3:2 · macro',
  },
  {
    n: 'The Quiet Box',
    d: 'Matte stone outer, ivory dust cover, a sealed wax stamp. Opens with one motion. Photographs without trying.',
    tone: 'aubergine',
    shot: 'Sealed window box, wax stamp · 3:2',
  },
  {
    n: 'The 9-Minute Doorstep',
    d: 'The driver waits up to nine minutes, sends a discreet SMS, then leaves a sealed box. Standard, not premium.',
    tone: 'sage',
    shot: 'Box at the door · 3:2 · dusk',
  },
];

export default function HomePage() {
  const sellers = [...bestSellers(), ...PRODUCTS.filter((p) => !p.bestSeller)].slice(0, 8);

  return (
    <>
      <Hero />

      {/* ── Dark manifesto bridge ─────────────────────────────────────────── */}
      <section className="section-sm bg-noir on-dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <p className="pull" style={{ maxWidth: '22ch', margin: '0 auto' }}>
            Flowers are how love <em style={{ color: '#d87888' }}>sounds out loud</em>.
          </p>
        </div>
      </section>

      {/* ── Trust band ─────────────────────────────────────────────────────── */}
      <section className="section-sm bg-bone">
        <div className="container">
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
                <TextReveal as="h2" className="h1" text="The ones we send most." />
                <p className="body-lg maxch" style={{ marginTop: 14 }}>
                  Rose-count led, priced in the open, same-day across the GTA. Choose a bouquet as it
                  is, or open it up and make it yours.
                </p>
              </div>
            </header>
          </Reveal>
          <div className="product-grid">
            {sellers.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ justifyContent: 'center', marginTop: 'var(--s-7)' }}>
            <Magnetic>
              <Link href="/bouquets" className="btn btn-ghost">
                See all bouquets
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ── Five lines, one signature ──────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              <span className="dot">●</span> Five lines · one signature
            </div>
            <TextReveal
              as="h2"
              className="h1"
              text="One house for the gift, the plan, the event and the trade order."
            />
          </Reveal>
          <div style={{ marginTop: 'var(--s-8)' }}>
            <FiveLines />
          </div>
        </div>
      </section>

      {/* ── Signature experiences (editorial zig-zag) ──────────────────────── */}
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
                <TextReveal as="h2" className="h1" text="Not just the flower — the *memory* of it." />
              </div>
            </header>
          </Reveal>

          <div className="signatures">
            {SIGNATURES.map((s, i) => (
              <div className={`signature-row ${i % 2 ? 'is-flipped' : ''}`} key={s.n}>
                <div className="signature-media">
                  <Parallax speed={0.16}>
                    <Placeholder label={s.shot} tone={s.tone} ratio="3 / 2" />
                  </Parallax>
                </div>
                <Reveal className="signature-copy" delay={80}>
                  <div className="mono signature-idx">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="h2" style={{ marginTop: 10 }}>
                    {s.n}
                  </h3>
                  <p className="body-lg" style={{ marginTop: 14, maxWidth: '44ch' }}>
                    {s.d}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────────────────────────────── */}
      <section className="section bg-aubergine on-dark">
        <div className="container">
          <div className="testimonial">
            <div className="eyebrow" style={{ color: 'rgba(239,232,221,0.55)', marginBottom: 22 }}>
              <span className="dot">●</span> A note we kept
            </div>
            <Reveal>
              <blockquote className="pull on-dark cine-quote">
                For Sana, the morning of. White anemones, almond branches, a knot of taupe silk. The
                driver waited at the door for nine minutes — she couldn&rsquo;t <em>stop looking</em>.
              </blockquote>
            </Reveal>
            <p
              className="mono"
              style={{
                marginTop: 28,
                color: 'rgba(239,232,221,0.55)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontSize: 11,
              }}
            >
              Amara &amp; Sana · wedding, June
            </p>
          </div>
        </div>
      </section>

      {/* ── Founder story ──────────────────────────────────────────────────── */}
      <section className="section bg-bone">
        <div className="container">
          <div className="founder">
            <div className="founder-media">
              <Parallax speed={0.2}>
                <Placeholder label="Founder at the market · 3:2 · morning light" tone="ember" ratio="3 / 2" />
              </Parallax>
            </div>
            <Reveal delay={80}>
              <div className="founder-copy">
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  <span className="dot">●</span> The house
                </div>
                <TextReveal
                  as="h2"
                  className="h2"
                  text="Founded by a family that knows weddings the way other families know *harvests*."
                />
                <p className="body-lg" style={{ marginTop: 20, maxWidth: '46ch' }}>
                  Petalique Flora is built on the belief that a bouquet, well-made, can hold a whole
                  room still for a second. One editorial eye, one standard of care, from a $90 gift to
                  a $90,000 install.
                </p>
                <div style={{ marginTop: 26 }}>
                  <Magnetic>
                    <Link href="/atelier" className="btn btn-ghost">
                      Meet the atelier
                    </Link>
                  </Magnetic>
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
              <TextReveal as="h2" className="h2" text="Make it a standing order." />
              <p className="body-lg" style={{ marginTop: 12, maxWidth: '44ch' }}>
                Weekly flowers for the home, the office, the lobby — one monthly invoice, paused any
                time. Our most quietly loved service.
              </p>
            </div>
            <div className="center gap-3 wrap">
              <Magnetic>
                <Link href="/subscriptions" className="btn btn-sage btn-lg">
                  Home subscriptions
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/corporate" className="btn btn-ghost btn-lg">
                  For business
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
