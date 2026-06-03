import type { Metadata } from 'next';
import { WholesaleTable } from '@/components/WholesaleTable';
import { TradeAccountForm } from '@/components/TradeAccountForm';

export const metadata: Metadata = {
  title: 'Wholesale & trade',
  description:
    'Per-stem trade pricing on Canadian-grown and imported stems. Automatic volume breaks at 100/250/500. Net-30 with approved accounts.',
};

const TRADE_PROOF = [
  { k: 'Weekly availability', v: 'Sheets refresh every Sunday for the week ahead.' },
  { k: 'Reserved boxes', v: 'Approved accounts reserve stock 48 hours in advance.' },
  { k: 'Volume pricing', v: 'Automatic breaks at 100, 250 and 500 stems — applied at quote.' },
  { k: 'Net-30 terms', v: 'Standard for approved accounts. Longer terms on request.' },
];

export default function WholesalePage() {
  return (
    <>
      <section className="page-head bg-bone">
        <div className="container">
          <div className="marker">Wholesale & trade</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '22ch' }}>
            Per-stem trade pricing. Volume breaks built in.
          </h1>
          <p className="body-lg" style={{ marginTop: 14, maxWidth: '54ch' }}>
            A small, edited catalogue of what we grow with and what we&rsquo;re buying in this
            week. Public enough to plan against, gated enough to protect the good stock.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <WholesaleTable />
        </div>
      </section>

      <section className="section-sm bg-paper">
        <div className="container">
          <div className="cta-band" style={{ background: 'var(--bone)' }}>
            <div>
              <div className="marker">Trade accounts</div>
              <h2 className="h2" style={{ maxWidth: '24ch', marginTop: 8 }}>
                Open an account to reserve boxes and see live stock.
              </h2>
              <ul className="plan-perks" style={{ marginTop: 16 }}>
                {TRADE_PROOF.map((p) => (
                  <li key={p.k}>
                    <span className="accent">●</span> <strong>{p.k}.</strong> {p.v}
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
