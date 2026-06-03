'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Wordmark } from './Wordmark';
import { ReviewStars } from './ReviewStars';
import { useCart } from '@/store/cart';
import { AGGREGATE } from '@/lib/reviews';

const LINKS = [
  { href: '/bouquets', label: 'Bouquets' },
  { href: '/build', label: 'Build your own' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/corporate', label: 'Corporate' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const count = useCart((s) => s.count());

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Wordmark href="/" size={18} />

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${pathname.startsWith(l.href) ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <span className="nav-rating" aria-hidden="true">
            <ReviewStars rating={AGGREGATE.rating} count={AGGREGATE.count} size={12} />
          </span>
          <Link href="/cart" className="nav-cart" aria-label={`Cart, ${mounted ? count : 0} items`}>
            Cart
            <span className="nav-cart-count">{mounted ? count : 0}</span>
          </Link>
          <Link href="/bouquets" className="btn btn-sm nav-cta">
            Shop now
          </Link>
          <button
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-drawer">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-drawer-link">
              {l.label}
            </Link>
          ))}
          <Link href="/cart" className="nav-drawer-link">
            Cart ({mounted ? count : 0})
          </Link>
        </div>
      )}
    </header>
  );
}
