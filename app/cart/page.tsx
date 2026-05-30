'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { money } from '@/lib/pricing';
import { Placeholder } from '@/components/Placeholder';
import { SameDayCountdown } from '@/components/SameDayCountdown';

export default function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <section className="section bg-bone"><div className="container" /></section>;
  }

  const sub = subtotal();

  if (lines.length === 0) {
    return (
      <section className="section bg-bone">
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <h1 className="h1" style={{ marginBottom: 14 }}>
            Your cart is quiet.
          </h1>
          <p className="body-lg" style={{ marginBottom: 28 }}>
            Nothing in it yet. Start with the ones we send most, or build something from scratch.
          </p>
          <div className="center gap-3" style={{ justifyContent: 'center' }}>
            <Link href="/bouquets" className="btn">
              Shop bouquets
            </Link>
            <Link href="/build" className="btn btn-ghost">
              Build a bouquet
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-sm bg-bone">
      <div className="container">
        <div className="marker">Your order</div>
        <h1 className="h1" style={{ marginTop: 8, marginBottom: 'var(--s-6)' }}>
          The cart
        </h1>

        <div className="cart-grid">
          <div className="cart-lines">
            {lines.map((l) => {
              const lineUnit = l.unitPrice + l.addOns.reduce((a, x) => a + x.price, 0);
              return (
                <div className="cart-line" key={l.id}>
                  <Placeholder label={`${l.count} · ${l.colourName}`} tone="blush" ratio="1 / 1" className="cart-thumb" />
                  <div className="cart-line-body">
                    <div className="between" style={{ alignItems: 'baseline', gap: 12 }}>
                      <h3 className="display" style={{ fontSize: 22 }}>
                        {l.name}
                      </h3>
                      <span className="display" style={{ fontSize: 18 }}>
                        {money(lineUnit * l.qty)}
                      </span>
                    </div>
                    <p className="caption" style={{ marginTop: 4 }}>
                      {l.count} stems · {l.colourName} · {l.wrap} · {l.bow}
                      {l.engraving ? ` · “${l.engraving}”` : ''}
                    </p>
                    {l.addOns.length > 0 && (
                      <p className="caption ember" style={{ marginTop: 2 }}>
                        + {l.addOns.map((a) => a.name).join(', ')}
                      </p>
                    )}
                    {l.message && (
                      <p className="display-italic muted" style={{ fontSize: 14, marginTop: 6 }}>
                        “{l.message}”
                      </p>
                    )}
                    <div className="cart-line-foot">
                      <div className="qty">
                        <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">
                          –
                        </button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">
                          +
                        </button>
                      </div>
                      <button className="link-underline" onClick={() => remove(l.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="cart-summary">
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 16 }}>
                Summary
              </h3>
              <div className="summary-row">
                <span className="body">Subtotal</span>
                <span className="display" style={{ fontSize: 18 }}>
                  {money(sub)}
                </span>
              </div>
              <div className="summary-row">
                <span className="body">Delivery</span>
                <span className="caption">Calculated at checkout</span>
              </div>
              <hr className="hairline" />
              <div className="summary-row">
                <span className="display" style={{ fontSize: 18 }}>
                  Total
                </span>
                <span className="display" style={{ fontSize: 22 }}>
                  {money(sub)}
                </span>
              </div>
              <Link href="/checkout" className="btn btn-block btn-lg" style={{ marginTop: 18 }}>
                Proceed to checkout
              </Link>
              <div style={{ marginTop: 14 }}>
                <SameDayCountdown />
              </div>
              <p className="caption" style={{ marginTop: 12 }}>
                Guest checkout · order tracking by SMS · re-bloom guarantee on every stem.
              </p>
            </div>
            <Link href="/bouquets" className="link-underline" style={{ display: 'inline-block', marginTop: 18 }}>
              ← Keep shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
