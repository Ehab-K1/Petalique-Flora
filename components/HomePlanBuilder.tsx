'use client';

import { useMemo, useState } from 'react';
import { HOME_TIERS, FREQUENCIES, monthlyEstimate, type FrequencyId } from '@/lib/plans';
import { money } from '@/lib/pricing';
import { Placeholder } from '@/components/Placeholder';
import { Reveal } from '@/components/Reveal';

const PERKS = [
  'Vessel swapped + restyled at every visit',
  'Free skip or pause any time — one tap',
  'Anniversary remembered; never re-asked',
  'Hand-tied at the atelier the morning of',
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
      <div className="card" style={{ borderColor: 'var(--sage)' }}>
        <h2 className="h2 serif-em">Lovely. You’re on the list.</h2>
        <p className="body-lg" style={{ marginTop: 12, maxWidth: '50ch' }}>
          A florist will confirm your first delivery within four working hours — and tell you what
          you’ll be receiving first.
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
              <span className="display" style={{ fontSize: 18 }}>{opt.name}</span>
              <span className="mono option-tile-price">{money(opt.perDelivery)} / delivery</span>
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
          <h3 className="h2" style={{ margin: '10px 0 6px' }}>
            {t.name}
          </h3>
          <p className="caption">{FREQUENCIES.find((f) => f.id === freq)!.name} delivery</p>

          <div className="plan-readout">
            <span className="display" style={{ fontSize: 44, letterSpacing: '-0.01em' }}>
              {money(total)}
            </span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sage-deep)' }}>
              / month, billed monthly
            </span>
          </div>

          <ul className="plan-perks">
            {PERKS.map((p) => (
              <li key={p}>
                <span className="ember">●</span> {p}
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

          <button type="submit" className="btn btn-block btn-sage btn-lg" style={{ marginTop: 18 }}>
            Start the plan
          </button>
          <p className="caption" style={{ marginTop: 12 }}>
            No charge today. A florist confirms within 4 working hours.
          </p>
        </div>
      </aside>
    </form>
  );
}

// Server-rendered wrapper used by the page below.
export function SubscriptionsHero() {
  return (
    <>
      <section className="page-head bg-cream">
        <div className="container">
          <div className="marker">04 — Subscriptions · Lived Spaces</div>
          <h1 className="h1 serif-em" style={{ marginTop: 10, maxWidth: '20ch' }}>
            Standing flowers, for the table you <em>live at</em>.
          </h1>
          <p className="body-lg maxch" style={{ marginTop: 14 }}>
            One arrangement, designed for your room, delivered the same morning each week. Skip a
            week any time. Cancel any time. The vessel is part of it.
          </p>
        </div>
      </section>

      <section className="section-sm bg-bone">
        <div className="container">
          <div className="subs-visual">
            <Reveal>
              <Placeholder label="Standing kitchen arrangement · 4:5 · morning" tone="sage" ratio="4 / 5" />
            </Reveal>
            <Reveal delay={80}>
              <div>
                <h2 className="h2" style={{ maxWidth: '20ch' }}>The most quietly loved service we offer.</h2>
                <p className="body-lg" style={{ marginTop: 14, maxWidth: '44ch' }}>
                  Our subscriptions are designed the same way our weddings are — composed for the
                  room, named after the moment. They’re also where our team comes to know your home.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
