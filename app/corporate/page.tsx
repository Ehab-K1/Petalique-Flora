import type { Metadata } from 'next';
import { CorporatePlanBuilder } from '@/components/CorporatePlanBuilder';
import { Placeholder } from '@/components/Placeholder';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Corporate · Offices, hotels, restaurants',
  description:
    'Editorial weekly arrangements for offices, hotels, restaurants and hospitality on a tidy monthly plan. One invoice. Net-30.',
};

const SECTORS = [
  { n: 'Offices', d: 'Reception desks, executive floors, boardroom installs.' },
  { n: 'Hotels', d: 'Lobby compositions, suite refreshes, signature scent pairing.' },
  { n: 'Restaurants', d: 'Host stand, private dining room, seasonal table styling.' },
  { n: 'Retail & hospitality', d: 'Storefront moments, vitrine refreshes, opening installs.' },
];

const STORIES = [
  { q: 'It’s the only thing on our reception we never have to think about.', a: 'Operations, Toronto law firm' },
  { q: 'Our guests notice them before they notice the front desk.', a: 'General Manager, boutique hotel' },
  { q: 'The cadence is dialled in. They arrive, swap the vessel, leave a card. That’s it.', a: 'EA, downtown HQ' },
];

export default function CorporatePage() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">05 — Corporate</div>
          <h1 className="h1 serif-em" style={{ marginTop: 10, maxWidth: '22ch' }}>
            Reception flowers, <em>handled</em>. One invoice. Quietly.
          </h1>
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            A standing weekly or biweekly arrangement designed for the room — your reception, your
            lobby, your private dining. We deliver, we restyle, we leave. You see the invoice once a
            month.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <CorporatePlanBuilder />
        </div>
      </section>

      <section className="section-sm bg-cream">
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 10 }}><span className="dot">●</span> Who we deliver to</div>
            <h2 className="h2" style={{ maxWidth: '22ch', marginBottom: 'var(--s-5)' }}>One eye, applied to every room.</h2>
          </Reveal>
          <div className="col-4">
            {SECTORS.map((s) => (
              <Reveal key={s.n}>
                <div className="card" style={{ height: '100%' }}>
                  <div className="label">{s.n}</div>
                  <p className="body">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <div className="founder">
            <Reveal>
              <Placeholder label="Hotel lobby install · 3:2 · evening light" tone="sage" ratio="3 / 2" />
            </Reveal>
            <Reveal delay={80}>
              <div>
                <div className="eyebrow"><span className="dot">●</span> What clients tell us</div>
                <div className="quotes">
                  {STORIES.map((s) => (
                    <blockquote key={s.q} className="display-italic" style={{ margin: '20px 0 0' }}>
                      “{s.q}”
                      <footer className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 8 }}>
                        — {s.a}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
