import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/components/shop/CartProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/shared/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://petaliqueflora.com"),
  title: {
    default: "Petalique Flora — Luxury Floral Design, GTA",
    template: "%s | Petalique Flora",
  },
  description:
    "Luxury wedding florals, event décor, and handcrafted floral gifting across the Greater Toronto Area. South Asian wedding specialists serving Mississauga, Toronto, Brampton, Oakville & Milton.",
  keywords: [
    "wedding florist GTA",
    "luxury wedding flowers Toronto",
    "South Asian wedding florist",
    "Mississauga wedding florist",
    "bridal bouquet GTA",
    "mandap florals",
    "event florist Toronto",
    "corporate flowers GTA",
  ],
  authors: [{ name: "Petalique Flora" }],
  creator: "Petalique Flora",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://petaliqueflora.com",
    siteName: "Petalique Flora",
    title: "Petalique Flora — Luxury Floral Design, GTA",
    description:
      "Luxury wedding florals, event décor, and handcrafted floral gifting across the Greater Toronto Area.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Petalique Flora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petalique Flora — Luxury Floral Design, GTA",
    description:
      "Luxury wedding florals, event décor, and handcrafted floral gifting across the Greater Toronto Area.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <body className="font-sans bg-cream text-charcoal antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#2C2C2C",
              color: "#F5F0E8",
              fontFamily: "var(--font-manrope)",
              fontSize: "0.8125rem",
              letterSpacing: "0.05em",
              borderRadius: "0",
              padding: "12px 16px",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
