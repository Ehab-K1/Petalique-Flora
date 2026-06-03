'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Wordmark } from './Wordmark';
import { useCart } from '@/store/cart';

const LINKS = [
  { href: '/bouquets', label: 'Bouquets' },
  { href: '/build', label: 'Build a bouquet' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/corporate', label: 'Corporate' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/atelier', label: 'Atelier' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const count = useCart((s) => s.count());

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  // Scroll-aware nav: shrink + solidify past the fold, hide on scroll-down,
  // reveal on scroll-up. Stays visible whenever the drawer is open.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 240 && y > last && !open);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="container nav-inner">
        <Wordmark href="/" size={24} />

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
          <Link href="/cart" className="nav-cart" aria-label={`Cart, ${mounted ? count : 0} items`}>
            Cart
            <span className="nav-cart-count">{mounted ? count : 0}</span>
          </Link>
          <Link href="/bouquets" className="btn btn-sm nav-cta">
            Send flowers
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
