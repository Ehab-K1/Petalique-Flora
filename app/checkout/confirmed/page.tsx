'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/store/cart';
import { PetalMark } from '@/components/PetalMark';

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
        <PetalMark size={40} center="var(--aubergine)" />
        <div className="eyebrow" style={{ color: 'rgba(239,232,221,0.6)', justifyContent: 'center', marginTop: 22 }}>
          <span className="dot">●</span> Order confirmed
        </div>
        <h1 className="h1 on-dark serif-em" style={{ margin: '14px 0 18px' }}>
          It’s in <em>our hands</em> now.
        </h1>
        <p className="body-lg" style={{ color: 'rgba(239,232,221,0.82)', maxWidth: '46ch', margin: '0 auto' }}>
          We’ll text the tracking to your phone the moment it leaves the atelier. Your driver waits up
          to nine minutes at the door.
        </p>

        <div className="confirm-order mono">Order {order}</div>

        <p className="display-italic" style={{ fontSize: 22, color: 'var(--bone)', marginTop: 30 }}>
          “Thank you for trusting us with it. — signed, the florist who made it.”
        </p>

        <div className="center gap-3 wrap" style={{ justifyContent: 'center', marginTop: 34 }}>
          <Link href="/subscriptions" className="btn">
            Send this weekly
          </Link>
          <Link href="/track" className="btn btn-ghost">
            Track this order
          </Link>
        </div>
        <p className="caption" style={{ color: 'rgba(239,232,221,0.5)', marginTop: 26 }}>
          A receipt is on its way to your email. Reply to it any time — a person reads it.
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
