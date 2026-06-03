import type { Metadata } from 'next';
import { CorporatePlanBuilder } from '@/components/CorporatePlanBuilder';
import { ProductImage } from '@/components/ProductImage';

export const metadata: Metadata = {
  title: 'Corporate flowers',
  description:
    'Weekly flower deliveries for offices, hotels and restaurants across the GTA. One monthly invoice. Net-30 available.',
};

const SECTORS = [
  { n: 'Offices', d: 'Reception desks, executive floors, boardroom installs.' },
  { n: 'Hotels', d: 'Lobby compositions, suite refreshes, signature scent pairing.' },
  { n: 'Restaurants', d: 'Host stand, private dining room, seasonal table styling.' },
  { n: 'Retail & hospitality', d: 'Storefront moments, vitrine refreshes, opening installs.' },
];

const LOGOS = ['Plant & Pixel', 'Nordic Holdings', 'Bayview Hotel', 'House of Tula', 'Cumin & Co.'];

const STORIES = [
  { q: "It's the only thing on our reception we never have to think about.", a: 'Operations, Toronto law firm' },
  { q: 'Our guests notice them before they notice the front desk.', a: 'General Manager, boutique hotel' },
  { q: 'They arrive, swap the vessel, leave a card. Two minutes, every Monday.', a: 'EA, downtown HQ' },
];

export default function CorporatePage() {
  return (
    <>
      <section className="page-head bg-bone">
        <div className="container">
          <div className="marker">For business</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '22ch' }}>
            Reception flowers, handled. One monthly invoice.
          </h1>
          <p className="body-lg" style={{ marginTop: 14, maxWidth: '54ch' }}>
            A standing weekly or biweekly arrangement designed for your space. We deliver, swap
            the vessel, leave a card, and bill you once a month. Net-30 available.
          </p>
        </div>
      </section>

      <section className="section-sm bg-paper">
        <div className="container">
          <div className="corp-logos" aria-label="Some of the businesses we deliver to">
            <span className="corp-logos-label">Trusted by Toronto teams at</span>
            {LOGOS.map((l) => (
              <span key={l} className="corp-logo">{l}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <CorporatePlanBuilder />
        </div>
      </section>

      <section className="section-sm bg-paper">
        <div className="container">
          <header className="v2-section-head">
            <div>
              <div className="marker">Who we deliver to</div>
              <h2 className="h2" style={{ marginTop: 8, maxWidth: '20ch' }}>One design eye, every room.</h2>
            </div>
          </header>
          <div className="col-4">
            {SECTORS.map((s) => (
              <div className="card" key={s.n} style={{ height: '100%' }}>
                <div className="label">{s.n}</div>
                <p className="body">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <div className="corp-stories">
            <div>
              <ProductImage slug="corporate-lobby" alt="A weekly arrangement on a hotel reception desk" ratio="3/4" sizes="(max-width: 900px) 100vw, 480px" />
            </div>
            <div className="corp-stories-quotes">
              <div className="marker">What clients tell us</div>
              {STORIES.map((s) => (
                <blockquote key={s.q} className="corp-quote">
                  &ldquo;{s.q}&rdquo;
                  <footer>— {s.a}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
