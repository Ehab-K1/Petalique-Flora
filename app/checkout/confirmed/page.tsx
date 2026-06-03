'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/store/cart';

function Confirmed() {
  const params = useSearchParams();
  const order = params.get('order') ?? 'PF-XXXX';
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="section bg-aubergine on-dark confirm">
      <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: 'rgba(250,248,244,0.7)', justifyContent: 'center' }}>
          <span className="dot">●</span> Order confirmed
        </div>
        <h1 className="h1 on-dark" style={{ margin: '14px 0 18px' }}>
          Your order is in. We&rsquo;ve got it from here.
        </h1>
        <p className="body-lg" style={{ color: 'rgba(250,248,244,0.82)', maxWidth: '50ch', margin: '0 auto' }}>
          A receipt is on its way to your email. You&rsquo;ll get a text the moment your driver
          leaves the studio, and another when they&rsquo;re at the door.
        </p>

        <div className="confirm-order">Order {order}</div>

        <div className="center gap-3 wrap" style={{ justifyContent: 'center', marginTop: 34 }}>
          <Link href="/track" className="btn">
            Track this order
          </Link>
          <Link href="/subscriptions" className="btn btn-ghost">
            Make it weekly
          </Link>
        </div>
        <p className="caption" style={{ color: 'rgba(250,248,244,0.55)', marginTop: 26 }}>
          Need to change something? Reply to your receipt — a real person reads it.
        </p>
      </div>
    </section>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<section className="section bg-aubergine on-dark"><div className="container" /></section>}>
      <Confirmed />
    </Suspense>
  );
}
