import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Event Florals — Corporate, Private & Seasonal Events",
  description:
    "Professional floral design for corporate events, private celebrations, holiday installations, and religious occasions across the Greater Toronto Area.",
};

const EVENT_TYPES = [
  {
    title: "Corporate Events",
    href: "/events/corporate",
    price: "From $450",
    desc: "Branded floral installations for product launches, galas, conferences, and lobby displays. We design with your brand identity in mind.",
    image: "https://images.unsplash.com/photo-1487530811015-780f298a8aa8?w=800&q=90",
  },
  {
    title: "Private Celebrations",
    href: "/events/private",
    price: "From $650",
    desc: "Birthday parties, anniversaries, baby showers, and milestone events. Intimate or grand — we make every gathering extraordinary.",
    image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=90",
  },
  {
    title: "Holiday Installations",
    href: "/events/holiday",
    price: "From $800",
    desc: "Seasonal floral installations for retail spaces, lobbies, and private homes. Eid, Diwali, Christmas, New Year, and beyond.",
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=90",
  },
  {
    title: "Religious Ceremonies",
    href: "/events/religious",
    price: "From $500",
    desc: "Culturally sensitive floral design for Eid celebrations, Diwali, religious milestones, and community events.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=90",
  },
  {
    title: "Custom Events",
    href: "/contact",
    price: "Custom Quote",
    desc: "Have a unique vision? We work with you to design something completely bespoke. No event is too large or too intimate.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90",
  },
];

const PORTFOLIO = [
  "https://images.unsplash.com/photo-1487530811015-780f298a8aa8?w=700&q=90",
  "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=700&q=90",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=90",
  "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=700&q=90",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=90",
  "https://images.unsplash.com/photo-1462530260150-162092dbf011?w=700&q=90",
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] pt-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=90"
          alt="Event florals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 to-obsidian/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-label-sm uppercase tracking-[0.3em] text-champagne mb-5">
            Event Florals · GTA
          </p>
          <h1 className="font-serif text-display-2xl text-ivory mb-5 max-w-2xl">
            Florals That Define{" "}
            <em className="not-italic text-dusty-rose">The Room</em>
          </h1>
          <p className="font-sans text-body-lg text-ivory/60 max-w-xl mb-10">
            From intimate gatherings to large-scale corporate installations — every
            event deserves a floral experience that is remembered.
          </p>
          <Link href="/contact?type=event" className="btn-primary bg-ivory text-charcoal hover:bg-dusty-rose hover:text-ivory">
            Inquire About Your Event
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-24 lg:py-40 bg-cream">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-tag">Our Specialties</span>
            <h2 className="font-serif text-display-xl text-charcoal">
              Events We Design For
            </h2>
          </div>
          <div className="space-y-6">
            {EVENT_TYPES.map((ev, i) => (
              <Link
                key={ev.title}
                href={ev.href}
                className={`group grid lg:grid-cols-2 gap-0 overflow-hidden border border-bone/30 hover:border-champagne/40 transition-all duration-400 hover:shadow-lg ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="relative aspect-[16/9] lg:aspect-auto overflow-hidden">
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  />
                </div>
                <div className={`bg-ivory p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-3">
                    {ev.price}
                  </p>
                  <h3 className="font-serif text-display-md text-charcoal mb-4">
                    {ev.title}
                  </h3>
                  <p className="font-sans text-body-md text-smoke leading-relaxed mb-6">
                    {ev.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 font-sans text-label-sm uppercase tracking-widest text-charcoal group-hover:text-rosewood transition-colors">
                    Inquire Now
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 bg-parchment">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-tag">Portfolio</span>
            <h2 className="font-serif text-display-xl text-charcoal">Recent Events</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {PORTFOLIO.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group">
                <Image
                  src={src}
                  alt={`Event ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-colors duration-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Mail className="w-8 h-8 text-champagne mx-auto mb-6" />
          <h2 className="font-serif text-display-xl text-ivory mb-4">
            Tell Us About Your Event
          </h2>
          <p className="font-sans text-body-md text-ivory/50 mb-10">
            We respond to all event inquiries within 24 hours with initial ideas
            and a custom quote.
          </p>
          <Link href="/contact?type=event" className="btn-gold">
            Start Your Inquiry
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
