'use client';

import { useState } from 'react';

const TYPES = ['Studio florist', 'Event planner', 'Hotel / restaurant', 'Retail boutique', 'Other'];

export function TradeAccountForm() {
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'wholesale', ...Object.fromEntries(form.entries()) }),
    });
    setDone(true);
  }

  if (done) {
    return (
      <div className="card">
        <h3 className="h3">Application received.</h3>
        <p className="body" style={{ marginTop: 8, maxWidth: '46ch' }}>
          We review trade applications within two working days. Once approved, your account unlocks
          live stock and reserved boxes for next-day pickup or delivery.
        </p>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={submit}>
      <div className="field-label">Trade account application</div>
      <h3 className="h3" style={{ margin: '10px 0 14px' }}>Open an account</h3>

      <div className="field-2">
        <div className="field">
          <label htmlFor="t-business">Business name</label>
          <input id="t-business" name="business" required autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="t-type">Business type</label>
          <select id="t-type" name="type" required>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="field-2" style={{ marginTop: 12 }}>
        <div className="field">
          <label htmlFor="t-contact">Your name</label>
          <input id="t-contact" name="contact" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="t-email">Work email</label>
          <input id="t-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="field-2" style={{ marginTop: 12 }}>
        <div className="field">
          <label htmlFor="t-phone">Phone</label>
          <input id="t-phone" name="phone" type="tel" />
        </div>
        <div className="field">
          <label htmlFor="t-vol">Expected weekly spend</label>
          <select id="t-vol" name="volume">
            <option>Under $500</option>
            <option>$500 – $1,500</option>
            <option>$1,500 – $5,000</option>
            <option>$5,000+</option>
          </select>
        </div>
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="t-website">Website or Instagram</label>
        <input id="t-website" name="website" placeholder="https://" />
      </div>

      <button type="submit" className="btn btn-block btn-lg" style={{ marginTop: 18 }}>
        Submit application
      </button>
      <p className="caption" style={{ marginTop: 10 }}>Reviewed within 2 working days. Net-30 available once approved.</p>
    </form>
  );
}
