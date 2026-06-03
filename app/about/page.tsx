import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ } from '@/components/FAQ';
import { ReviewStars } from '@/components/ReviewStars';
import { GuaranteeBadge } from '@/components/GuaranteeBadge';
import { PressLogos } from '@/components/PressLogos';
import { ProductImage } from '@/components/ProductImage';
import { AGGREGATE } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'About Petalique',
  description:
    'A Toronto same-day flower delivery studio, founded in 2022. Real florists, real growers, real customer support. Backed by a fresh-flower guarantee.',
};

const FACTS = [
  { k: 'Founded', v: '2022, Toronto' },
  { k: 'Daily output', v: '40–120 bouquets' },
  { k: 'Same-day coverage', v: 'GTA · 25 km' },
  { k: 'Average rating', v: `${AGGREGATE.rating.toFixed(1)} ★ (${AGGREGATE.count.toLocaleString('en-CA')})` },
];

const TEAM = [
  {
    role: 'Lead florist',
    name: 'Hira Khan',
    bio: 'Eight years bridal, four years design. Sets the look for every arrangement that leaves the studio.',
  },
  {
    role: 'Studio florists',
    name: 'Four-person bench',
    bio: 'Hand-tie every bouquet to order. Nothing pre-built. Nothing stored.',
  },
  {
    role: 'Delivery team',
    name: 'In-house drivers',
    bio: 'Trained for clean handover, discreet SMS, and the nine-minute wait. Not a third-party courier.',
  },
  {
    role: 'Customer care',
    name: 'Direct line',
    bio: 'Replies on email + phone within an hour during studio hours. No bots, no offshore queue.',
  },
];

const GROWERS = [
  'Garden roses · highland Ecuador · cold-chained <36 hours',
  'Ranunculus + anemone · Niagara, ON · seasonal',
  'Hydrangea · The Netherlands · seasonal',
  'Eucalyptus + foliage · Markham, ON',
];

const PROMISES = [
  {
    h: 'Hand-tied this morning, not last week.',
    d: 'Every order is built to the buyer, not pulled from a fridge of finished bouquets. If we can\'t deliver it fresh, we don\'t take the order.',
  },
  {
    h: 'Real prices in the open.',
    d: 'No "from $X" then a $90 upsell at checkout. Stem count drives price, and the slider is on every PDP.',
  },
  {
    h: 'A real person answers.',
    d: 'Reply to any email and a Petalique team member responds — usually inside an hour during studio hours. No tickets, no chatbots.',
  },
  {
    h: 'Backed by the fresh-flower guarantee.',
    d: 'If a bouquet arrives less than perfect, send a photo within 24 hours and we remake it. No questions, no return shipping.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="page-head bg-bone">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="marker">About</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '22ch' }}>
            A small Toronto studio. Real flowers. Real same-day.
          </h1>
          <p className="body-lg" style={{ marginTop: 18, maxWidth: '54ch' }}>
            Petalique is a same-day flower delivery studio for the Greater Toronto Area. Four
            florists, two drivers, one promise: nothing leaves the bench that we wouldn&rsquo;t
            send to our own homes. If it does, we remake it.
          </p>
          <div className="about-facts">
            {FACTS.map((f) => (
              <div key={f.k} className="about-fact">
                <span className="about-fact-k">{f.k}</span>
                <span className="about-fact-v">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promises ──────────────────────────────────────────────────────── */}
      <section className="section bg-paper">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">What we promise</div>
              <h2 className="h1" style={{ marginTop: 8 }}>Four rules we don&rsquo;t bend.</h2>
            </div>
          </header>
          <div className="about-promises">
            {PROMISES.map((p, i) => (
              <div key={p.h} className="about-promise">
                <span className="about-promise-n">0{i + 1}</span>
                <h3 className="h3">{p.h}</h3>
                <p className="body">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <section className="section bg-bone" id="team">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">Team</div>
              <h2 className="h2" style={{ marginTop: 8 }}>The hands and the voices.</h2>
            </div>
            <p className="body" style={{ maxWidth: '46ch' }}>
              Eleven people, all in Toronto. No outsourced design, no franchise model. The same
              florists ship every order.
            </p>
          </header>
          <ul className="about-team-list">
            {TEAM.map((t) => (
              <li key={t.role} className="about-team-card">
                <div className="about-team-portrait">
                  <ProductImage slug={`team-${t.role.toLowerCase().replace(/\s+/g, '-')}`} alt={`${t.role} at Petalique`} ratio="1/1" sizes="160px" />
                </div>
                <div>
                  <div className="about-team-role">{t.role}</div>
                  <div className="about-team-name">{t.name}</div>
                  <p className="body">{t.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Growers ───────────────────────────────────────────────────────── */}
      <section className="section-sm bg-paper" id="growers">
        <div className="container">
          <div className="about-growers">
            <div>
              <div className="marker">Where the flowers come from</div>
              <h2 className="h2" style={{ marginTop: 8, maxWidth: '20ch' }}>Named growers, never mystery stems.</h2>
            </div>
            <ul className="about-growers-list">
              {GROWERS.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Guarantee ─────────────────────────────────────────────────────── */}
      <section className="section-sm bg-bone">
        <div className="container">
          <div className="about-guarantee">
            <GuaranteeBadge size={120} />
            <div>
              <h2 className="h2" style={{ maxWidth: '18ch' }}>The fresh-flower guarantee.</h2>
              <p className="body-lg" style={{ marginTop: 12, maxWidth: '54ch' }}>
                Send us a photo within 24 hours of delivery. If anything is wilted, damaged, or
                off-colour, we remake the bouquet and put it on the doorstep within 24 hours. No
                questions, no return shipping, no fine print.
              </p>
              <div style={{ marginTop: 22 }}>
                <Link href="/bouquets" className="btn">Shop bouquets</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews summary ───────────────────────────────────────────────── */}
      <section className="section-sm bg-paper">
        <div className="container">
          <div className="about-reviews-summary">
            <ReviewStars rating={AGGREGATE.rating} count={AGGREGATE.count} size={18} />
            <p className="body-lg" style={{ maxWidth: '46ch' }}>
              {AGGREGATE.count.toLocaleString('en-CA')} verified GTA buyers rate Petalique an
              average of {AGGREGATE.rating.toFixed(1)} out of 5.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="section bg-bone" id="faq">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">FAQ</div>
              <h2 className="h2" style={{ marginTop: 8 }}>Questions, answered.</h2>
            </div>
          </header>
          <FAQ />
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
