'use client';

import { useMemo, useState } from 'react';
import { CORP_TIERS, FREQUENCIES, monthlyEstimate, type FrequencyId } from '@/lib/plans';
import { money } from '@/lib/pricing';

const PROOF = [
  'One monthly invoice, Net-30',
  'Account manager assigned within 48 hours',
  'Discreet, badge-friendly delivery to your reception',
  'Vessel hire included; styling done in-room',
];

export function CorporatePlanBuilder() {
  const [tier, setTier] = useState(CORP_TIERS[0].id);
  const [freq, setFreq] = useState<FrequencyId>('weekly');
  const [locations, setLocations] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const t = CORP_TIERS.find((x) => x.id === tier)!;
  const monthly = useMemo(() => monthlyEstimate(t.perDelivery, freq, locations), [t, freq, locations]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      kind: 'corporate',
      tier: t.name,
      frequency: freq,
      locations,
      monthly,
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
        <h2 className="h2 serif-em">Estimate sent.</h2>
        <p className="body-lg" style={{ marginTop: 12, maxWidth: '54ch' }}>
          A senior florist will be in touch within four working hours to confirm cadence, sign off
          on the brief, and route a first delivery the same week.
        </p>
      </div>
    );
  }

  return (
    <form className="plan-grid" onSubmit={submit}>
      <div>
        <h2 className="h3" style={{ marginBottom: 14 }}>Choose a tier</h2>
        <div className="grid gap-2">
          {CORP_TIERS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`option-tile ${tier === opt.id ? 'on' : ''}`}
              onClick={() => setTier(opt.id)}
            >
              <span className="display" style={{ fontSize: 18 }}>
                {opt.name}
              </span>
              <span className="mono option-tile-price">{money(opt.perDelivery)} / delivery</span>
              <span className="caption">{opt.desc}</span>
            </button>
          ))}
        </div>

        <h2 className="h3" style={{ marginTop: 'var(--s-6)', marginBottom: 14 }}>Cadence</h2>
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

        <h2 className="h3" style={{ marginTop: 'var(--s-6)', marginBottom: 14 }}>Locations</h2>
        <div className="locations">
          <button type="button" className="qty-btn" onClick={() => setLocations((l) => Math.max(1, l - 1))} aria-label="Fewer locations">–</button>
          <span className="display" style={{ fontSize: 32, minWidth: 64, textAlign: 'center' }}>{locations}</span>
          <button type="button" className="qty-btn" onClick={() => setLocations((l) => Math.min(40, l + 1))} aria-label="More locations">+</button>
          <span className="caption">site{locations === 1 ? '' : 's'} on this contract</span>
        </div>
      </div>

      <aside className="plan-summary">
        <div className="card" style={{ background: 'var(--paper)', borderColor: 'var(--sage)' }}>
          <div className="field-label" style={{ color: 'var(--sage-deep)' }}>Instant estimate</div>
          <h3 className="h2" style={{ margin: '10px 0 4px' }}>{t.name}</h3>
          <p className="caption">{FREQUENCIES.find((f) => f.id === freq)!.name} · {locations} location{locations === 1 ? '' : 's'}</p>

          <div className="plan-readout">
            <span className="display" style={{ fontSize: 48, letterSpacing: '-0.01em' }}>{money(monthly)}</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sage-deep)' }}>
              / month · Net-30 invoice
            </span>
          </div>

          <ul className="plan-perks">
            {PROOF.map((p) => (
              <li key={p}><span className="ember">●</span> {p}</li>
            ))}
          </ul>

          <div className="field" style={{ marginTop: 18 }}>
            <label htmlFor="company">Company</label>
            <input id="company" name="company" required autoComplete="organization" />
          </div>
          <div className="field-2" style={{ marginTop: 12 }}>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="role">Your role</label>
              <input id="role" name="role" placeholder="EA, GM, Office Manager…" />
            </div>
          </div>
          <div className="field-2" style={{ marginTop: 12 }}>
            <div className="field">
              <label htmlFor="email">Work email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="address">Primary delivery address</label>
            <input id="address" name="address" required />
          </div>

          <button type="submit" className="btn btn-block btn-sage btn-lg" style={{ marginTop: 18 }}>
            Route to a florist
          </button>
          <p className="caption" style={{ marginTop: 12 }}>
            A senior florist replies within 4 working hours. No card needed.
          </p>
        </div>
      </aside>
    </form>
  );
}
