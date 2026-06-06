import Link from "next/link";
import { Instagram, Facebook, Heart } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-obsidian text-ivory/70">
      {/* Main footer */}
      <div className="max-w-9xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-6">
              <span className="font-serif text-2xl text-ivory tracking-wide">
                Petalique Flora
              </span>
            </Link>
            <p className="font-sans text-body-sm text-ivory/50 leading-relaxed mb-8 max-w-xs">
              Luxury wedding florals, event décor, and handcrafted floral gifting across the
              Greater Toronto Area. Designed with intention. Crafted with care.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ivory/40 hover:text-champagne transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ivory/40 hover:text-champagne transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ivory/40 hover:text-champagne transition-colors duration-300"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-6">
              Shop
            </p>
            <ul className="space-y-3">
              {[
                { label: "Luxury Bouquets", href: "/shop/luxury-bouquets" },
                { label: "Bridal Bouquets", href: "/shop/bridal-bouquets" },
                { label: "Gift Collections", href: "/shop/gift-collections" },
                { label: "Corporate Gifts", href: "/shop/corporate-gifts" },
                { label: "Seasonal", href: "/shop/seasonal-collections" },
                { label: "All Products", href: "/shop" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-body-sm text-ivory/50 hover:text-ivory/90 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-6">
              Services
            </p>
            <ul className="space-y-3">
              {[
                { label: "Wedding Florals", href: "/weddings" },
                { label: "Event Design", href: "/events" },
                { label: "Corporate", href: "/events/corporate" },
                { label: "Wholesale", href: "/wholesale" },
                { label: "Planner Portal", href: "/planner" },
                { label: "Consultation", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-body-sm text-ivory/50 hover:text-ivory/90 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Locations */}
          <div>
            <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-6">
              Connect
            </p>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="font-sans text-body-sm text-ivory/50 hover:text-ivory/90 transition-colors duration-200"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-sans text-body-sm text-ivory/50 hover:text-ivory/90 transition-colors duration-200"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="font-sans text-body-sm text-ivory/40">
                {BRAND.address}
              </li>
            </ul>
            <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-4">
              Serving
            </p>
            <ul className="space-y-2">
              {["Mississauga", "Toronto", "Brampton", "Oakville", "Milton"].map((city) => (
                <li key={city}>
                  <Link
                    href={`/locations/wedding-florist-${city.toLowerCase()}`}
                    className="font-sans text-body-sm text-ivory/40 hover:text-ivory/80 transition-colors duration-200"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-ivory/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="font-serif text-xl text-ivory mb-1">Stay in bloom.</p>
              <p className="font-sans text-body-sm text-ivory/50">
                Seasonal inspiration and exclusive offers delivered gently.
              </p>
            </div>
            <form className="flex gap-0 w-full max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-ivory/10 border border-ivory/20 px-4 py-3 font-sans text-body-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-champagne/60 transition-colors"
              />
              <button
                type="submit"
                className="px-6 bg-champagne text-ivory font-sans text-label-sm uppercase tracking-widest hover:bg-burnished-gold transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-9xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-label-sm text-ivory/30">
            © {new Date().getFullYear()} Petalique Flora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Shipping", href: "/shipping" },
              { label: "Returns", href: "/returns" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-label-sm text-ivory/30 hover:text-ivory/60 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-sans text-label-sm text-ivory/20 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-dusty-rose/60" /> in Mississauga, ON
          </p>
        </div>
      </div>
    </footer>
  );
}
