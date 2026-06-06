import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const LOCATION_DATA: Record<string, {
  hero: string;
  headline: string;
  description: string;
  services: string[];
  venues: string[];
  schema: object;
}> = {
  "wedding-florist-mississauga": {
    hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=90",
    headline: "Luxury Wedding Florist in Mississauga",
    description: "Petalique Flora is Mississauga's premier wedding florist, serving couples across Erin Mills, Port Credit, Meadowvale, and surrounding communities. From intimate ceremonies to grand South Asian celebrations at Mississauga's finest venues.",
    services: ["Bridal Bouquets", "Mandap Florals", "Wedding Arches", "Reception Centrepieces", "Mehndi Décor", "Car Décor", "Full Wedding Packages"],
    venues: ["Royal Ambassador", "Grand Cinnamon Banquet Hall", "Pearson Convention Centre", "Mississauga Convention Centre", "Carmen Banquet Hall"],
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Petalique Flora — Wedding Florist Mississauga",
      "description": "Luxury wedding florist in Mississauga. South Asian wedding specialists.",
      "address": { "@type": "PostalAddress", "addressLocality": "Mississauga", "addressRegion": "ON", "addressCountry": "CA" },
      "telephone": "+16475550123",
      "url": "https://petaliqueflora.com/locations/wedding-florist-mississauga",
    },
  },
  "wedding-florist-toronto": {
    hero: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=90",
    headline: "Luxury Wedding Florist in Toronto",
    description: "Serving Toronto's most prestigious wedding venues with bespoke floral design. Petalique Flora brings editorial-level wedding florals to the heart of the city.",
    services: ["Bridal Bouquets", "Ceremony Florals", "Reception Design", "Wedding Arches", "Corporate Events", "Luxury Gift Delivery"],
    venues: ["The Carlu", "Casa Loma", "Arcadian Court", "Old Mill Toronto", "Bellvue Manor", "The King Edward Hotel"],
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Petalique Flora — Wedding Florist Toronto",
      "description": "Luxury wedding florist serving Toronto.",
      "address": { "@type": "PostalAddress", "addressLocality": "Toronto", "addressRegion": "ON", "addressCountry": "CA" },
      "telephone": "+16475550123",
      "url": "https://petaliqueflora.com/locations/wedding-florist-toronto",
    },
  },
  "wedding-florist-brampton": {
    hero: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=90",
    headline: "Luxury Wedding Florist in Brampton",
    description: "Petalique Flora serves Brampton's diverse wedding community with specialised South Asian wedding florals and luxury event design. Trusted by Brampton families for mandap florals, mehndi décor, and full wedding packages.",
    services: ["Mandap Florals", "Walima Décor", "Mehndi Night Florals", "Bridal Bouquets", "Reception Design", "Full Wedding Packages"],
    venues: ["La Paloma Banquet Hall", "Pearson Convention Centre", "Brampton Convention Centre", "Chateau Le Jardin", "Novotel Brampton"],
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Petalique Flora — Wedding Florist Brampton",
      "description": "South Asian wedding florist in Brampton.",
      "address": { "@type": "PostalAddress", "addressLocality": "Brampton", "addressRegion": "ON", "addressCountry": "CA" },
      "telephone": "+16475550123",
      "url": "https://petaliqueflora.com/locations/wedding-florist-brampton",
    },
  },
  "wedding-florist-oakville": {
    hero: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=90",
    headline: "Luxury Wedding Florist in Oakville",
    description: "Serving Oakville's most prestigious wedding venues with bespoke luxury florals. Petalique Flora designs for Oakville's refined aesthetic — elegant, editorial, and timeless.",
    services: ["Luxury Bouquets", "Garden Wedding Florals", "Ceremony Arches", "Reception Design", "Corporate Florals", "Gift Delivery"],
    venues: ["Paletta Mansion", "Fifteen Restaurant", "The Abbey", "Glen Abbey Golf Club", "Oakville Conference & Banquet Centre"],
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Petalique Flora — Wedding Florist Oakville",
      "description": "Luxury wedding florist in Oakville.",
      "address": { "@type": "PostalAddress", "addressLocality": "Oakville", "addressRegion": "ON", "addressCountry": "CA" },
      "telephone": "+16475550123",
      "url": "https://petaliqueflora.com/locations/wedding-florist-oakville",
    },
  },
  "wedding-florist-milton": {
    hero: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1600&q=90",
    headline: "Luxury Wedding Florist in Milton",
    description: "Bringing luxury floral design to Milton's growing wedding community. Petalique Flora serves Milton and Halton Hills with the same editorial-level craft as the city.",
    services: ["Bridal Bouquets", "Ceremony Florals", "Centrepieces", "Wedding Packages", "Gift Delivery"],
    venues: ["The Gathering Place", "Milton Banquet Hall", "Mattamy National Cycling Centre"],
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Petalique Flora — Wedding Florist Milton",
      "description": "Luxury wedding florist serving Milton and Halton Hills.",
      "address": { "@type": "PostalAddress", "addressLocality": "Milton", "addressRegion": "ON", "addressCountry": "CA" },
      "telephone": "+16475550123",
      "url": "https://petaliqueflora.com/locations/wedding-florist-milton",
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = LOCATION_DATA[slug];
  if (!data) return { title: "Not Found" };
  const loc = LOCATIONS.find(l => l.slug === slug);
  return {
    title: data.headline,
    description: data.description,
    openGraph: {
      title: data.headline,
      description: data.description,
      images: [{ url: data.hero }],
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = LOCATION_DATA[slug];
  const loc = LOCATIONS.find(l => l.slug === slug);

  if (!data || !loc) notFound();

  return (
    <div className="min-h-screen bg-cream">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema) }}
      />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[450px] overflow-hidden">
        <Image src={data.hero} alt={data.headline} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 to-obsidian/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-24">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-champagne" />
            <span className="font-sans text-label-sm uppercase tracking-[0.25em] text-champagne">
              {loc.city}, Ontario
            </span>
          </div>
          <h1 className="font-serif text-display-xl text-ivory mb-5 max-w-2xl">{data.headline}</h1>
          <Link href="/contact?type=wedding" className="btn-primary bg-ivory text-charcoal hover:bg-dusty-rose hover:text-ivory">
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="section-tag">{loc.city} Wedding Florist</span>
              <h2 className="font-serif text-display-lg text-charcoal mb-5">
                Serving {loc.city} With Excellence
              </h2>
              <p className="font-sans text-body-lg text-smoke leading-relaxed mb-8">{data.description}</p>
              <h3 className="font-sans text-label-sm uppercase tracking-[0.2em] text-smoke mb-4">Services We Offer in {loc.city}</h3>
              <ul className="space-y-2 mb-8">
                {data.services.map(s => (
                  <li key={s} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-champagne flex-shrink-0" />
                    <span className="font-sans text-body-md text-charcoal/80">{s}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact?type=wedding" className="btn-primary">
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <h3 className="font-sans text-label-sm uppercase tracking-[0.2em] text-smoke mb-4">
                Venues We&apos;ve Worked At in {loc.city}
              </h3>
              <div className="space-y-2 mb-10">
                {data.venues.map(v => (
                  <div key={v} className="flex items-center gap-3 py-3 border-b border-bone/40">
                    <span className="w-1 h-1 rounded-full bg-champagne flex-shrink-0" />
                    <span className="font-sans text-body-sm text-charcoal/70">{v}</span>
                  </div>
                ))}
              </div>

              <div className="bg-bone/30 p-6">
                <p className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-3">
                  Also Serving Nearby
                </p>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.filter(l => l.slug !== slug).map(l => (
                    <Link
                      key={l.slug}
                      href={`/locations/${l.slug}`}
                      className="font-sans text-body-sm text-charcoal/70 hover:text-rosewood transition-colors border border-bone px-3 py-1 hover:border-dusty-rose/40"
                    >
                      {l.city}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="font-serif text-display-xl text-ivory mb-4">
            Ready to start your {loc.city} wedding floral journey?
          </h2>
          <p className="font-sans text-body-md text-ivory/50 mb-8">
            Book a complimentary design consultation. We&apos;ll come to you.
          </p>
          <Link href="/contact?type=wedding" className="btn-gold">
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return LOCATIONS.map(loc => ({ slug: loc.slug }));
}
