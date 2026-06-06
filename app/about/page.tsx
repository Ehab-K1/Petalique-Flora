import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, Clock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Petalique Flora — Our Story",
  description:
    "Petalique Flora is a luxury floral design house based in Mississauga, specialising in weddings, events, and gifting across the Greater Toronto Area since 2012.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Handcrafted",
    desc: "Every arrangement is built by hand, stem by stem, by our in-house design team. No shortcuts, no mass production.",
  },
  {
    icon: Leaf,
    title: "Premium Sourcing",
    desc: "We work with trusted growers across North America and Europe to source the most exceptional seasonal blooms.",
  },
  {
    icon: Clock,
    title: "On-Time, Always",
    desc: "12 years of on-time delivery and installation. Your event timeline is as sacred to us as it is to you.",
  },
  {
    icon: Award,
    title: "Culturally Fluent",
    desc: "Deep expertise in South Asian floral traditions — mandap, mehndi, walima — alongside Western wedding aesthetics.",
  },
];

const TEAM = [
  {
    name: "Zara Malik",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=90",
    bio: "With a background in fine arts and 12 years of floral design, Zara founded Petalique Flora with one vision: to bring editorial-level florals to every celebration.",
  },
  {
    name: "Priya Sharma",
    role: "Lead Wedding Florist",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=90",
    bio: "Priya specialises in South Asian wedding traditions and has designed florals for over 300 South Asian celebrations across the GTA.",
  },
  {
    name: "Aiden Cole",
    role: "Event Design & Production",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=90",
    bio: "Aiden leads large-scale event installations, working with hotels, corporate clients, and luxury venues across Ontario.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Hero editorial */}
      <section className="py-16 lg:py-24">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-tag">Our Story</span>
              <h1 className="font-serif text-display-2xl text-charcoal mb-6 leading-none">
                Born from a love of{" "}
                <em className="not-italic text-dusty-rose">craft.</em>
              </h1>
              <p className="font-sans text-body-xl text-charcoal/70 leading-relaxed mb-6">
                Petalique Flora was founded in Mississauga in 2012 with a single purpose:
                to bring the kind of floral artistry usually reserved for high-end editorial
                shoots and Parisian ateliers into the celebrations of everyday people.
              </p>
              <p className="font-sans text-body-md text-charcoal/60 leading-relaxed mb-10">
                Today, we&apos;re proud to be trusted by over 500 couples, dozens of corporate
                partners, and hundreds of families across the GTA — each one seeking
                something a little more intentional, a little more beautiful.
              </p>
              <Link href="/contact" className="btn-primary">
                Work With Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=90"
                  alt="Petalique Flora atelier"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-0 lg:-right-6 bg-charcoal p-6 max-w-[180px]">
                <p className="font-serif text-4xl text-ivory mb-1">12+</p>
                <p className="font-sans text-label-sm text-ivory/50 uppercase tracking-wider">Years of Craft</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Weddings Designed" },
              { value: "12+", label: "Years of Experience" },
              { value: "5.0★", label: "Average Google Rating" },
              { value: "5 Cities", label: "GTA Coverage" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-4xl lg:text-5xl text-ivory mb-2">{s.value}</p>
                <p className="font-sans text-label-sm text-ivory/40 uppercase tracking-[0.15em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-ivory">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-tag">Our Values</span>
            <h2 className="font-serif text-display-xl text-charcoal">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="p-8 border border-bone/40 hover:border-champagne/40 transition-colors duration-300">
                <v.icon className="w-5 h-5 text-champagne mb-5" />
                <h3 className="font-serif text-display-sm text-charcoal mb-3">{v.title}</h3>
                <p className="font-sans text-body-sm text-smoke leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-parchment">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-tag">The Team</span>
            <h2 className="font-serif text-display-xl text-charcoal">Meet the Designers</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-display-sm text-charcoal mb-1">{member.name}</h3>
                <p className="font-sans text-label-sm text-champagne uppercase tracking-widest mb-3">
                  {member.role}
                </p>
                <p className="font-sans text-body-sm text-smoke leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large editorial image */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f29c8a4a60?w=1600&q=90"
          alt="Petalique Flora studio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/50 flex items-center justify-center text-center px-6">
          <div>
            <p className="font-serif text-display-xl text-ivory mb-6 italic">
              &ldquo;We believe every celebration deserves flowers that feel like art.&rdquo;
            </p>
            <p className="font-sans text-label-sm text-ivory/40 uppercase tracking-[0.25em]">
              Zara Malik, Founder
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
