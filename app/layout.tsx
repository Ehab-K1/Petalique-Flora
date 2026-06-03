import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import './components.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Concierge } from '@/components/Concierge';

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Petalique Flora — Same-day flower delivery across the GTA',
    template: '%s · Petalique Flora',
  },
  description:
    'Order by 2pm for same-day delivery across the Greater Toronto Area. Hand-tied bouquets, weekly subscriptions, weddings and corporate gifts. Backed by a fresh-flower guarantee.',
  keywords: [
    'same-day flower delivery Toronto',
    'GTA flower delivery',
    'Toronto florist',
    'wedding florist Mississauga',
    'corporate flowers Toronto',
    'flower subscription Toronto',
  ],
  openGraph: {
    title: 'Petalique Flora — Same-day flower delivery across the GTA',
    description:
      'Order by 2pm for same-day delivery. Hand-tied bouquets, backed by a fresh-flower guarantee.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Petalique Flora',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Concierge />
      </body>
    </html>
  );
}
