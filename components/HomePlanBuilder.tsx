'use client';

import { useMemo, useState } from 'react';
import { HOME_TIERS, FREQUENCIES, monthlyEstimate, type FrequencyId } from '@/lib/plans';
import { money } from '@/lib/pricing';
import { ProductImage } from '@/components/ProductImage';

const PERKS = [
  'Free delivery on every drop',
  'Pause or skip any week — one tap',
  'Cancel any time, no questions',
  'Hand-tied the morning of your delivery',
];

export function HomePlanBuilder() {
  const [tier, setTier] = useState(HOME_TIERS[1].id);
  const [freq, setFreq] = useState<FrequencyId>('weekly');
  const [start, setStart] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = HOME_TIERS.find((x) => x.id === tier)!;
  const total = useMemo(() => monthlyEstimate(t.perDelivery, freq), [t, freq]);

  async function startPlan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      kind: 'subscription',
      tier: t.name,
      frequency: freq,
      perDelivery: t.perDelivery,
      monthly: total,
      start,
      ...Object.fromEntries(form.entries()),
    };
    await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card" style={{ borderColor: 'var(--accent)' }}>
        <h2 className="h2">You&rsquo;re on the list.</h2>
        <p className="body-lg" style={{ marginTop: 12, maxWidth: '50ch' }}>
          A florist will confirm your first delivery within four working hours and tell you
          exactly what you&rsquo;ll be receiving.
        </p>
      </div>
    );
  }

  return (
    <form className="plan-grid" onSubmit={startPlan}>
      <div>
        <h2 className="h3" style={{ marginBottom: 14 }}>Choose a size</h2>
        <div className="grid gap-2">
          {HOME_TIERS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`option-tile ${tier === opt.id ? 'on' : ''}`}
              onClick={() => setTier(opt.id)}
            >
              <span className="display" style={{ fontSize: 18, fontWeight: 500 }}>{opt.name}</span>
              <span className="option-tile-price">{money(opt.perDelivery)} / delivery</span>
              <span className="caption">{opt.desc}</span>
            </button>
          ))}
        </div>

        <h2 className="h3" style={{ marginTop: 'var(--s-6)', marginBottom: 14 }}>How often?</h2>
        <div className="flex wrap gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip chip-sage"
              data-active={freq === f.id}
              onClick={() => setFreq(f.id)}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="field" style={{ marginTop: 'var(--s-5)' }}>
          <label htmlFor="start">Start week</label>
          <input id="start" name="start" type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
        </div>
      </div>

      <aside className="plan-summary">
        <div className="card" style={{ background: 'var(--paper)' }}>
          <div className="field-label">Your plan</div>
          <h3 className="h2" style={{ margin: '10px 0 6px' }}>{t.name}</h3>
          <p className="caption">{FREQUENCIES.find((f) => f.id === freq)!.name} delivery</p>

          <div className="plan-readout">
            <span className="display" style={{ fontSize: 44, letterSpacing: '-0.01em' }}>
              {money(total)}
            </span>
            <span className="plan-readout-unit">/ month, billed monthly</span>
          </div>

          <ul className="plan-perks">
            {PERKS.map((p) => (
              <li key={p}>
                <span className="accent">●</span> {p}
              </li>
            ))}
          </ul>

          <div className="field" style={{ marginTop: 18 }}>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" required autoComplete="name" />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="address">Address</label>
            <input id="address" name="address" placeholder="Street, unit, city, postal code" required />
          </div>

          <button type="submit" className="btn btn-block btn-lg" style={{ marginTop: 18 }}>
            Start my plan
          </button>
          <p className="caption" style={{ marginTop: 12 }}>
            No charge today. A florist confirms within 4 working hours.
          </p>
        </div>
      </aside>
    </form>
  );
}

export function SubscriptionsHero() {
  return (
    <>
      <section className="page-head bg-bone">
        <div className="container">
          <div className="marker">Subscriptions</div>
          <h1 className="h1" style={{ marginTop: 10, maxWidth: '20ch' }}>
            Fresh flowers, every week. Without thinking about it.
          </h1>
          <p className="body-lg" style={{ marginTop: 14, maxWidth: '54ch' }}>
            One arrangement, designed for your room, delivered the same morning each week. Pause
            any time. Cancel any time. From $45 per delivery.
          </p>
        </div>
      </section>

      <section className="section-sm bg-paper">
        <div className="container">
          <div className="subs-visual">
            <ProductImage slug="subscription-home" alt="A weekly arrangement on a kitchen counter" ratio="4/5" sizes="(max-width: 900px) 100vw, 480px" />
            <div>
              <h2 className="h2" style={{ maxWidth: '22ch' }}>The most quietly loved thing we make.</h2>
              <p className="body-lg" style={{ marginTop: 14, maxWidth: '46ch' }}>
                Subscriptions are designed the way our weddings are — composed for the room,
                hand-tied that morning, swapped in your vessel so nothing ever lingers past its
                peak.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
