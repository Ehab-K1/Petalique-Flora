import type { Metadata } from 'next';
import { WholesaleTable } from '@/components/WholesaleTable';
import { TradeAccountForm } from '@/components/TradeAccountForm';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Wholesale · trade supply',
  description:
    'A clean trade catalogue with weekly availability, per-stem pricing, minimums and automatic volume breaks. Net-30 with approved trade accounts.',
};

const TRADE_PROOF = [
  { k: 'Weekly availability', v: 'Sheets refreshed every Sunday for the week ahead.' },
  { k: 'Reserved boxes', v: 'Approved accounts can reserve stock 48 hours in advance.' },
  { k: 'Volume pricing', v: 'Automatic breaks at 100, 250 and 500 stems — applied at quote.' },
  { k: 'Net-30 terms', v: 'Standard for approved accounts; longer terms on request.' },
];

export default function WholesalePage() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">06 — Wholesale · Trade</div>
          <h1 className="h1 serif-em" style={{ marginTop: 10, maxWidth: '20ch' }}>
            Stems by the bunch or box — for the <em>trade</em>.
          </h1>
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            A small, edited catalogue of what we grow with and what we’re buying in this week. Public
            enough to plan against; gated enough to protect margin and reserve the good stock.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <Reveal>
            <WholesaleTable />
          </Reveal>
        </div>
      </section>

      <section className="section-sm bg-cream">
        <div className="container">
          <div className="cta-band" style={{ background: 'var(--paper)' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                <span className="dot">●</span> Trade accounts
              </div>
              <h2 className="h2" style={{ maxWidth: '24ch' }}>Open an account to see live stock and reserve boxes.</h2>
              <ul className="plan-perks" style={{ marginTop: 16 }}>
                {TRADE_PROOF.map((p) => (
                  <li key={p.k}>
                    <span className="ember">●</span> <strong>{p.k}.</strong> {p.v}
                  </li>
                ))}
              </ul>
            </div>
            <TradeAccountForm />
          </div>
        </div>
      </section>
    </>
  );
}
