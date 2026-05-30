import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { PetalMark } from './PetalMark';
import { cutoffLabel } from '@/lib/sameday';

const COLS = [
  {
    h: 'Shop',
    links: [
      { href: '/bouquets', l: 'Bouquets' },
      { href: '/build', l: 'Build a bouquet' },
      { href: '/subscriptions', l: 'Subscriptions' },
      { href: '/bouquets?occasion=anniversary', l: 'Anniversary' },
      { href: '/bouquets?occasion=sympathy', l: 'Sympathy' },
    ],
  },
  {
    h: 'For business',
    links: [
      { href: '/corporate', l: 'Corporate & offices' },
      { href: '/wholesale', l: 'Wholesale / trade' },
      { href: '/weddings', l: 'Weddings & events' },
    ],
  },
  {
    h: 'House',
    links: [
      { href: '/atelier', l: 'Atelier & journal' },
      { href: '/atelier#care', l: 'Flower care' },
      { href: '/atelier#faq', l: 'FAQ' },
      { href: '/track', l: 'Track an order' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark size={30} />
            <p className="display-italic" style={{ fontSize: 19, marginTop: 18, maxWidth: '28ch' }}>
              For the moments worth dressing up for.
            </p>
            <div className="footer-newsletter">
              <div className="mono footer-label">15% off your first bouquet</div>
              <form className="footer-form" action="/api/inquiry" method="post">
                <input type="hidden" name="kind" value="newsletter" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  aria-label="Email for first-order offer"
                />
                <button className="btn btn-sm" type="submit">
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="footer-cols">
            {COLS.map((c) => (
              <div key={c.h} className="footer-col">
                <div className="mono footer-label">{c.h}</div>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-trust">
          <span className="mono">Same-day across the GTA · order by {cutoffLabel()}</span>
          <span className="mono">Re-bloom guarantee</span>
          <span className="mono">Grown with named growers</span>
          <span className="mono">4.97 ★ · 1,100+ moments</span>
        </div>

        <div className="footer-bottom">
          <div className="center gap-3">
            <PetalMark size={20} />
            <span className="caption">© {new Date().getFullYear()} Petalique Flora · Mississauga, Canada</span>
          </div>
          <div className="center gap-4 footer-legal">
            <a href="https://instagram.com/petalique_flora" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <Link href="/atelier#faq">FAQ</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
