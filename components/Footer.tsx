import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { cutoffLabel } from '@/lib/sameday';

const COLS = [
  {
    h: 'Shop',
    links: [
      { href: '/bouquets', l: 'Bouquets' },
      { href: '/build', l: 'Build your own' },
      { href: '/subscriptions', l: 'Subscriptions' },
      { href: '/bouquets?occasion=anniversary', l: 'Anniversary' },
      { href: '/bouquets?occasion=sympathy', l: 'Sympathy' },
    ],
  },
  {
    h: 'For business',
    links: [
      { href: '/corporate', l: 'Corporate gifting' },
      { href: '/wholesale', l: 'Wholesale & trade' },
      { href: '/weddings', l: 'Weddings & events' },
    ],
  },
  {
    h: 'Petalique',
    links: [
      { href: '/about', l: 'About us' },
      { href: '/track', l: 'Track an order' },
      { href: '/about#faq', l: 'Help & FAQ' },
      { href: 'https://instagram.com/petalique_flora', l: 'Instagram', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark size={20} />
            <p className="body" style={{ marginTop: 18, maxWidth: '34ch', color: 'rgba(250,248,244,0.78)' }}>
              Same-day flower delivery across the Greater Toronto Area. Backed by a fresh-flower guarantee.
            </p>
            <div className="footer-newsletter">
              <div className="footer-label">Get $15 off your first order</div>
              <form className="footer-form" action="/api/inquiry" method="post">
                <input type="hidden" name="kind" value="newsletter" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  aria-label="Email for first-order offer"
                />
                <button className="btn btn-sm" type="submit">
                  Send my code
                </button>
              </form>
            </div>
          </div>

          <div className="footer-cols">
            {COLS.map((c) => (
              <div key={c.h} className="footer-col">
                <div className="footer-label">{c.h}</div>
                <ul>
                  {c.links.map((l) =>
                    'external' in l && l.external ? (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.l}
                        </a>
                      </li>
                    ) : (
                      <li key={l.href}>
                        <Link href={l.href}>{l.l}</Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-trust">
          <span>Same-day across the GTA · order by {cutoffLabel()}</span>
          <span>Fresh-flower guarantee</span>
          <span>Hand-tied in Toronto</span>
          <span>4.9 ★ · 1,127 reviews</span>
        </div>

        <div className="footer-payments" aria-label="Accepted payment methods">
          <span className="footer-payments-label">Secure checkout</span>
          <span className="pay-pill">Visa</span>
          <span className="pay-pill">Mastercard</span>
          <span className="pay-pill">Amex</span>
          <span className="pay-pill">Apple Pay</span>
          <span className="pay-pill">Google Pay</span>
          <span className="pay-pill pay-pill-stripe">Powered by Stripe</span>
        </div>

        <div className="footer-bottom">
          <span className="caption">© {new Date().getFullYear()} Petalique Flora · Toronto, Canada</span>
          <div className="center gap-4 footer-legal">
            <a href="https://instagram.com/petalique_flora" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <Link href="/about#faq">FAQ</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
