'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { money } from '@/lib/pricing';
import { ProductImage } from '@/components/ProductImage';
import { SameDayCountdown } from '@/components/SameDayCountdown';
import { GuaranteeBadge } from '@/components/GuaranteeBadge';

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
            Your cart is empty.
          </h1>
          <p className="body-lg" style={{ marginBottom: 28 }}>
            Start with one of our bestsellers, or build a bouquet from scratch.
          </p>
          <div className="center gap-3" style={{ justifyContent: 'center' }}>
            <Link href="/bouquets" className="btn">
              Shop bouquets
            </Link>
            <Link href="/build" className="btn btn-ghost">
              Build your own
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
          Cart ({lines.length})
        </h1>

        <div className="cart-grid">
          <div className="cart-lines">
            {lines.map((l) => {
              const lineUnit = l.unitPrice + l.addOns.reduce((a, x) => a + x.price, 0);
              return (
                <div className="cart-line" key={l.id}>
                  <div className="cart-thumb">
                    <ProductImage slug={l.productSlug} alt={l.name} ratio="1/1" sizes="96px" />
                  </div>
                  <div className="cart-line-body">
                    <div className="between" style={{ alignItems: 'baseline', gap: 12 }}>
                      <h3 className="cart-line-name">{l.name}</h3>
                      <span className="cart-line-price">{money(lineUnit * l.qty)}</span>
                    </div>
                    <p className="caption" style={{ marginTop: 4 }}>
                      {l.count} stems · {l.colourName} · {l.wrap} · {l.bow}
                      {l.engraving ? ` · "${l.engraving}"` : ''}
                    </p>
                    {l.addOns.length > 0 && (
                      <p className="caption accent" style={{ marginTop: 2 }}>
                        + {l.addOns.map((a) => a.name).join(', ')}
                      </p>
                    )}
                    {l.message && (
                      <p className="cart-line-message">&ldquo;{l.message}&rdquo;</p>
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
            <div className="cart-summary-card">
              <h3 className="h3" style={{ marginBottom: 16 }}>
                Order summary
              </h3>
              <div className="summary-row">
                <span className="body">Subtotal</span>
                <span className="summary-amount">{money(sub)}</span>
              </div>
              <div className="summary-row">
                <span className="body">Delivery</span>
                <span className="caption">Calculated at checkout</span>
              </div>
              <hr className="hairline" />
              <div className="summary-row">
                <span className="summary-total-label">Total</span>
                <span className="summary-total">{money(sub)}</span>
              </div>
              <Link href="/checkout" className="btn btn-block btn-lg" style={{ marginTop: 18 }}>
                Secure checkout — {money(sub)}
              </Link>
              <div className="cart-secure-row" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span>SSL-encrypted · Powered by Stripe</span>
              </div>
              <div style={{ marginTop: 14 }}>
                <SameDayCountdown />
              </div>
            </div>

            <div className="cart-guarantee">
              <GuaranteeBadge size={56} />
              <div>
                <strong>Fresh-flower guarantee.</strong>
                <span className="caption">Not perfect? We remake it within 24 hours.</span>
              </div>
            </div>

            <Link href="/bouquets" className="link-underline cart-keep-shopping">
              ← Keep shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
