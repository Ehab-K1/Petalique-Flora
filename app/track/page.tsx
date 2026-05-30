'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SameDayCountdown } from '@/components/SameDayCountdown';

const STAGES = [
  { k: 'Order received', d: 'The atelier has your order and confirmed it.' },
  { k: 'Hand-tied', d: 'A florist is making your bouquet right now.' },
  { k: 'Out with the driver', d: 'Sealed and on the road. SMS tracking on its way.' },
  { k: 'Delivered', d: '9-minute doorstep handover complete.' },
];

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [shown, setShown] = useState<typeof STAGES | null>(null);
  const [busy, setBusy] = useState(false);

  function check(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId || !phone) return;
    setBusy(true);
    setTimeout(() => {
      setShown(STAGES);
      setBusy(false);
    }, 700);
  }

  return (
    <section className="section-sm bg-bone">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="marker">Tracking</div>
        <h1 className="h1 serif-em" style={{ marginTop: 8, maxWidth: '20ch' }}>
          Where is it now?
        </h1>
        <p className="body-lg" style={{ marginTop: 12, marginBottom: 'var(--s-5)' }}>
          Look up any order by ID and the phone number on file. We also send SMS updates the moment
          the driver leaves the atelier.
        </p>

        <form className="card" onSubmit={check}>
          <div className="field-2">
            <div className="field">
              <label htmlFor="oid">Order ID</label>
              <input id="oid" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="PF-…" required />
            </div>
            <div className="field">
              <label htmlFor="ph">Phone on file</label>
              <input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" required />
            </div>
          </div>
          <button className="btn" type="submit" style={{ marginTop: 16 }} disabled={busy}>
            {busy ? 'Looking…' : 'Find my order'}
          </button>
          <p className="caption" style={{ marginTop: 12 }}>
            Don’t have the order ID? Reply to your confirmation email — a person reads them.
          </p>
        </form>

        {shown && (
          <div className="card" style={{ marginTop: 'var(--s-5)' }}>
            <div className="field-label">Order {orderId.toUpperCase()}</div>
            <div className="track-stages">
              {shown.map((s, i) => (
                <div key={s.k} className={`track-stage ${i < 2 ? 'done' : i === 2 ? 'active' : ''}`}>
                  <span className="track-dot" />
                  <div>
                    <div className="display" style={{ fontSize: 18 }}>{s.k}</div>
                    <p className="caption" style={{ marginTop: 2 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <SameDayCountdown />
            </div>
          </div>
        )}

        <p className="caption" style={{ marginTop: 'var(--s-5)' }}>
          Need to reach a person?{' '}
          <Link href="/atelier#faq" className="link-underline">FAQ</Link> · or message the concierge.
        </p>
      </div>
    </section>
  );
}
