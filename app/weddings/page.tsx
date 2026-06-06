import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Wedding Florals — GTA Wedding Florist",
  description:
    "Bespoke wedding florals crafted for South Asian & Western celebrations across the Greater Toronto Area. Mandap florals, bridal bouquets, ceremony arches, and full floral packages.",
};

const WEDDING_SERVICES = [
  {
    title: "Bridal Bouquets",
    href: "/weddings/bridal-bouquets",
    price: "From $195",
    desc: "Handcrafted bouquets designed around your dress, colour story, and personality.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=90",
  },
  {
    title: "Wedding Arches",
    href: "/weddings/arches",
    price: "From $890",
    desc: "Dramatic ceremony arches and floral installations that set the scene.",
    image: "https://images.unsplash.com/photo-1491677533189-49af044391ed?w=800&q=90",
  },
  {
    title: "Mandap Florals",
    href: "/weddings/mandap",
    price: "From $2,400",
    desc: "Traditional mandap designs elevated with luxury flowers and contemporary artistry.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=90",
  },
  {
    title: "Walima Florals",
    href: "/weddings/walima",
    price: "From $1,800",
    desc: "Opulent table and room décor for your walima celebration.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=90",
  },
  {
    title: "Mehndi Décor",
    href: "/weddings/mehndi",
    price: "From $1,200",
    desc: "Vibrant, joyful floral installations for mehndi nights that photograph beautifully.",
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=90",
  },
  {
    title: "Reception Florals",
    href: "/weddings/reception",
    price: "From $2,800",
    desc: "Centrepieces, head table florals, and sweetheart table designs.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90",
  },
  {
    title: "Car Décor",
    href: "/weddings/car-decor",
    price: "From $250",
    desc: "Floral car decorations for the bridal party arrival and grand exit.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=90",
  },
  {
    title: "Bedroom Décor",
    href: "/weddings/bedroom-decor",
    price: "From $380",
    desc: "Romantic bridal suite arrangements for an unforgettable first night.",
    image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=90",
  },
  {
    title: "Luxury Packages",
    href: "/weddings/packages",
    price: "From $4,500",
    desc: "Full-service wedding floral packages curated from consultation to final petal.",
    image: "https://images.unsplash.com/photo-1519167758481-83f29c8a4a60?w=800&q=90",
    featured: true,
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "Consultation", desc: "We meet to understand your vision, palette, and venue." },
  { n: "02", title: "Design Proposal", desc: "A detailed floral proposal with mood board and itemised quote." },
  { n: "03", title: "Deposit & Design", desc: "Secure your date with a deposit while we source your flowers." },
  { n: "04", title: "Wedding Day", desc: "Our team arrives hours early to install every detail flawlessly." },
];

export default function WeddingsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=90"
          alt="Luxury wedding florals"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/20 to-obsidian/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-label-sm uppercase tracking-[0.3em] text-champagne mb-6 animate-fade-in">
            Wedding Florals · Greater Toronto Area
          </p>
          <h1 className="font-serif text-display-2xl text-ivory mb-6 max-w-3xl leading-none">
            Where Love Blooms{" "}
            <em className="not-italic text-dusty-rose">in Full</em>
          </h1>
          <p className="font-sans text-body-lg text-ivory/60 max-w-xl mb-10">
            Handcrafted florals for South Asian and Western weddings across the GTA.
            Every bloom chosen. Every detail considered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact?type=wedding" className="btn-primary bg-ivory text-charcoal hover:bg-dusty-rose hover:text-ivory">
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/weddings/packages" className="btn-outline border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory">
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* South Asian Specialist Banner */}
      <section className="py-10 bg-rosewood">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-ivory/60 mb-1">
                Specialists In
              </p>
              <p className="font-serif text-xl text-ivory">
                South Asian Wedding Florals — Mandap · Mehndi · Walima · Nikah
              </p>
            </div>
            <Link
              href="/contact?type=wedding"
              className="btn-outline border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal flex-shrink-0"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-40 bg-cream">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-tag">Services</span>
            <h2 className="font-serif text-display-xl text-charcoal mb-4">
              Everything Your Day Requires
            </h2>
            <p className="font-sans text-body-md text-smoke max-w-xl mx-auto">
              From a single bridal bouquet to a full floral transformation — we design it all.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WEDDING_SERVICES.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className={`group relative overflow-hidden ${
                  service.featured ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-sans text-label-sm text-champagne uppercase tracking-widest mb-1">
                      {service.price}
                    </p>
                    <h3 className="font-serif text-display-sm text-ivory mb-2">
                      {service.title}
                    </h3>
                    <p className="font-sans text-body-sm text-ivory/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-h-0 group-hover:max-h-20 overflow-hidden transition-all">
                      {service.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-ivory/70 group-hover:text-ivory transition-colors">
                      <span className="font-sans text-label-sm uppercase tracking-widest">Learn More</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-sans text-label-sm uppercase tracking-[0.25em] text-champagne block mb-4">Our Process</span>
            <h2 className="font-serif text-display-xl text-ivory">
              From Vision to Reality
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="text-center">
                <span className="font-mono text-5xl text-ivory/10 block mb-4">{step.n}</span>
                <h3 className="font-serif text-xl text-ivory mb-3">{step.title}</h3>
                <p className="font-sans text-body-sm text-ivory/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-ivory">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Why Petalique</span>
              <h2 className="font-serif text-display-xl text-charcoal mb-6">
                Trusted by 500+ GTA Couples
              </h2>
              <ul className="space-y-4">
                {[
                  "12+ years of luxury wedding experience",
                  "Specialists in South Asian wedding traditions",
                  "GTA-wide service: Mississauga, Toronto, Brampton, Oakville, Milton",
                  "Same design team from consultation to wedding day",
                  "5.0 star average across 200+ verified reviews",
                  "Full-service: design, sourcing, installation, and breakdown",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-body-md text-charcoal/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=90"
                  alt="Wedding florals detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-charcoal text-ivory p-6 max-w-[200px] hidden lg:block">
                <p className="font-serif text-3xl mb-1">500+</p>
                <p className="font-sans text-label-sm text-ivory/50 uppercase tracking-wider">Weddings Designed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-dusty-rose">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-display-xl text-ivory mb-4">
            Begin Your Wedding Story
          </h2>
          <p className="font-sans text-body-md text-ivory/70 mb-10">
            Consultations are complimentary. We&apos;d love to hear about your vision.
          </p>
          <Link href="/contact?type=wedding" className="inline-flex items-center gap-3 px-12 py-5 bg-ivory text-charcoal font-sans text-label-md uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-all duration-400">
            Book Your Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
