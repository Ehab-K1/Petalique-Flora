import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './components.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Concierge } from '@/components/Concierge';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Petalique Flora — Canadian luxury floral house',
    template: '%s · Petalique Flora',
  },
  description:
    'A Canadian luxury floral house for gifting, weekly subscriptions, weddings and wholesale. Same-day across the GTA. For the moments worth dressing up for.',
  keywords: [
    'luxury florist Toronto',
    'GTA flower delivery',
    'wedding florist Mississauga',
    'corporate flowers',
    'flower subscription',
    'wholesale flowers',
  ],
  openGraph: {
    title: 'Petalique Flora — Canadian luxury floral house',
    description: 'For the moments worth dressing up for. Same-day across the GTA.',
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
    <html
      lang="en"
      data-palette="orchard"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
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
