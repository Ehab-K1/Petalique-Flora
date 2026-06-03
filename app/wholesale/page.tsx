import type { Metadata } from 'next';
import { TradeShop } from '@/components/wholesale/TradeShop';
import { TradeAccountForm } from '@/components/TradeAccountForm';
import { Reveal } from '@/components/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { VOLUME_BREAKS } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Wholesale · trade supply',
  description:
    'Shop the trade catalogue by the stem and bunch with live per-unit pricing, minimums and automatic volume breaks. Build an order and request a quote. Net-30 with approved accounts.',
};

const TRADE_PROOF = [
  { k: 'Weekly availability', v: 'Sheets refreshed every Sunday for the week ahead.' },
  { k: 'Reserved boxes', v: 'Approved accounts can reserve stock 48 hours in advance.' },
  { k: 'Volume pricing', v: 'Automatic breaks at 100, 250 and 500 — applied per line.' },
  { k: 'Net-30 terms', v: 'Standard for approved accounts; longer terms on request.' },
];

export default function WholesalePage() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">06 — Wholesale · Trade</div>
          <TextReveal
            as="h1"
            className="h1 trade-hero-h1"
            text="Build a trade order by the *stem*."
          />
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            The catalogue we&rsquo;re cutting and buying this week — priced per unit, with minimums and
            automatic volume breaks. Build a box, see the number move, and send it to the trade desk.
          </p>
          <div className="trade-breaks2">
            {VOLUME_BREAKS.map((b) => (
              <div key={b.label} className="trade-break-chip">
                <span className="mono">{b.label}</span>
                <span className="trade-break-pct">{b.discount ? `−${Math.round(b.discount * 100)}%` : 'List'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <TradeShop />
        </div>
      </section>

      <section className="section-sm bg-cream">
        <div className="container">
          <div className="cta-band" style={{ background: 'var(--paper)' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                <span className="dot">●</span> Trade accounts
              </div>
              <Reveal>
                <h2 className="h2" style={{ maxWidth: '24ch' }}>
                  Open an account to unlock live stock and reserved boxes.
                </h2>
              </Reveal>
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
