'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/cart';
import { money } from '@/lib/pricing';
import { SameDayCountdown } from '@/components/SameDayCountdown';

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => setMounted(true), []);

  if (!mounted) return <section className="section bg-bone"><div className="container" /></section>;

  if (lines.length === 0) {
    return (
      <section className="section bg-bone">
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <h1 className="h1">Nothing to check out.</h1>
          <Link href="/bouquets" className="btn" style={{ marginTop: 24 }}>
            Shop bouquets
          </Link>
        </div>
      </section>
    );
  }

  const sub = subtotal();

  async function pay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const contact = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines, contact }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // live Stripe Checkout
      } else if (data.orderId) {
        router.push(`/checkout/confirmed?order=${data.orderId}`);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section-sm bg-bone">
      <div className="container">
        <div className="marker">Checkout</div>
        <h1 className="h1" style={{ marginTop: 8, marginBottom: 'var(--s-6)' }}>
          Delivery details
        </h1>

        <form className="checkout-grid" onSubmit={pay}>
          <div className="checkout-form">
            <fieldset className="checkout-fieldset">
              <legend className="field-label">From you</legend>
              <div className="field-2">
                <div className="field">
                  <label htmlFor="senderName">Your name</label>
                  <input id="senderName" name="senderName" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="senderEmail">Email · for tracking</label>
                  <input id="senderEmail" name="senderEmail" type="email" required autoComplete="email" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="senderPhone">Your phone</label>
                <input id="senderPhone" name="senderPhone" type="tel" required autoComplete="tel" />
              </div>
            </fieldset>

            <fieldset className="checkout-fieldset">
              <legend className="field-label">To the recipient</legend>
              <div className="field-2">
                <div className="field">
                  <label htmlFor="recipientName">Recipient name</label>
                  <input id="recipientName" name="recipientName" required />
                </div>
                <div className="field">
                  <label htmlFor="recipientPhone">Recipient phone</label>
                  <input id="recipientPhone" name="recipientPhone" type="tel" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="address">Delivery address</label>
                <input id="address" name="address" required autoComplete="street-address" placeholder="Street, unit, city, postal code" />
              </div>
              <div className="field-2">
                <div className="field">
                  <label htmlFor="date">Delivery date</label>
                  <input id="date" name="date" type="date" required />
                </div>
                <div className="field">
                  <label htmlFor="window">Time window</label>
                  <select id="window" name="window" defaultValue="any">
                    <option value="any">Any time</option>
                    <option value="morning">Morning (9–12)</option>
                    <option value="afternoon">Afternoon (12–5)</option>
                    <option value="evening">Evening (5–9)</option>
                  </select>
                </div>
              </div>
              <label className="checkout-check">
                <input type="checkbox" name="leaveAtDoor" defaultChecked /> Leave a sealed box at the door
                if no answer (9-minute wait)
              </label>
            </fieldset>
          </div>

          <aside className="checkout-summary">
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 14 }}>
                {lines.length} {lines.length === 1 ? 'item' : 'items'}
              </h3>
              {lines.map((l) => (
                <div className="summary-row" key={l.id}>
                  <span className="caption">
                    {l.name} · {l.count} {l.colourName} × {l.qty}
                  </span>
                  <span className="mono" style={{ fontSize: 12 }}>
                    {money((l.unitPrice + l.addOns.reduce((a, x) => a + x.price, 0)) * l.qty)}
                  </span>
                </div>
              ))}
              <hr className="hairline" />
              <div className="summary-row">
                <span className="display" style={{ fontSize: 18 }}>
                  Total
                </span>
                <span className="display" style={{ fontSize: 22 }}>
                  {money(sub)}
                </span>
              </div>
              <button className="btn btn-block btn-lg" type="submit" disabled={busy} style={{ marginTop: 16 }}>
                {busy ? 'Taking you to pay…' : `Pay securely — ${money(sub)}`}
              </button>
              {error && <p className="caption err" style={{ marginTop: 10, color: '#b3261e' }}>{error}</p>}
              <div className="cart-secure-row" style={{ marginTop: 12 }} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span>SSL-encrypted · Powered by Stripe</span>
              </div>
              <div style={{ marginTop: 14 }}>
                <SameDayCountdown />
              </div>
              <p className="caption" style={{ marginTop: 10 }}>
                We never store card details.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}
