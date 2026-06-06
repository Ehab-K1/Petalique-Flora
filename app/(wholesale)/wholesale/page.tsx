import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Package, TrendingUp, Users, Clock } from "lucide-react";
import { WHOLESALE_TIERS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Wholesale Trade Accounts — Petalique Flora",
  description:
    "Apply for a Petalique Flora trade account. Tiered pricing, bulk ordering, and dedicated account management for florists, event planners, and retailers.",
};

const TIER_COLORS: Record<string, string> = {
  BRONZE: "from-amber-900/20 to-amber-800/10 border-amber-900/30",
  SILVER: "from-zinc-400/20 to-zinc-300/10 border-zinc-400/30",
  GOLD: "from-champagne/20 to-champagne/10 border-champagne/30",
  PLATINUM: "from-slate-300/20 to-slate-200/10 border-slate-300/40",
};

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1462530260150-162092dbf011?w=1600&q=90"
          alt="Wholesale florals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 to-obsidian/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-9xl mx-auto px-6 lg:px-12 w-full">
            <p className="font-sans text-label-sm uppercase tracking-[0.3em] text-champagne mb-4">
              Trade Program
            </p>
            <h1 className="font-serif text-display-xl text-ivory mb-4 max-w-2xl">
              Wholesale Accounts for{" "}
              <em className="not-italic text-champagne">Trade Professionals</em>
            </h1>
            <p className="font-sans text-body-md text-ivory/60 max-w-lg mb-8">
              Exclusive pricing tiers, priority fulfillment, and dedicated account management
              for florists, event planners, hotels, and retailers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/wholesale/register" className="btn-gold">
                Apply for Account
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/wholesale/dashboard" className="btn-outline border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal">
                Sign In to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-ivory">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-tag">Why Partner With Us</span>
            <h2 className="font-serif text-display-lg text-charcoal">
              Built for Your Business
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Tiered Pricing",
                desc: "Save up to 38% off retail with volume-based tier pricing that grows with your business.",
              },
              {
                icon: Package,
                title: "Priority Fulfillment",
                desc: "Trade orders receive priority processing with guaranteed delivery windows.",
              },
              {
                icon: Users,
                title: "Dedicated Account Manager",
                desc: "Your own contact for quotes, custom orders, and account support.",
              },
              {
                icon: Clock,
                title: "Net-30 Terms",
                desc: "Qualified accounts receive flexible payment terms. Apply during registration.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="p-6 border border-bone/40 hover:border-champagne/40 transition-colors duration-300"
              >
                <b.icon className="w-5 h-5 text-champagne mb-4" />
                <h3 className="font-sans text-body-md font-medium text-charcoal mb-2">
                  {b.title}
                </h3>
                <p className="font-sans text-body-sm text-smoke leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 bg-parchment">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-tag">Pricing Tiers</span>
            <h2 className="font-serif text-display-lg text-charcoal mb-3">
              Trade Account Tiers
            </h2>
            <p className="font-sans text-body-md text-smoke">
              Tier assignment is based on monthly order volume.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(WHOLESALE_TIERS).map(([key, tier]) => (
              <div
                key={key}
                className={`relative p-6 bg-gradient-to-br border ${TIER_COLORS[key]} transition-all duration-300 hover:shadow-lg`}
              >
                <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-smoke mb-2">
                  Tier
                </p>
                <h3 className="font-serif text-3xl text-charcoal mb-1">{tier.name}</h3>
                <p className="font-sans text-display-sm text-charcoal font-medium mb-4">
                  {Math.round(tier.discount * 100)}% off
                </p>
                <div className="divider-gold mb-4" />
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-sans text-body-sm text-charcoal/70">
                    <Check className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                    Min. order: {formatPrice(tier.minOrder)}
                  </li>
                  <li className="flex items-center gap-2 font-sans text-body-sm text-charcoal/70">
                    <Check className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                    Priority fulfillment
                  </li>
                  <li className="flex items-center gap-2 font-sans text-body-sm text-charcoal/70">
                    <Check className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                    {key === "GOLD" || key === "PLATINUM" ? "Dedicated account manager" : "Email support"}
                  </li>
                  {(key === "PLATINUM") && (
                    <li className="flex items-center gap-2 font-sans text-body-sm text-charcoal/70">
                      <Check className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                      Net-30 payment terms
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="section-tag">Eligibility</span>
          <h2 className="font-serif text-display-lg text-charcoal mb-6">
            Who Can Apply?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              "Florists & Floral Studios",
              "Event Planners & Coordinators",
              "Wedding Venues",
              "Hotels & Hospitality",
              "Retailers & Boutiques",
              "Corporate Buyers",
            ].map((type) => (
              <div
                key={type}
                className="p-4 border border-bone/40 font-sans text-body-sm text-charcoal/70 flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                {type}
              </div>
            ))}
          </div>
          <p className="font-sans text-body-sm text-smoke mb-8">
            All applicants must provide a valid business registration or license.
            Applications are reviewed within 2 business days.
          </p>
          <Link href="/wholesale/register" className="btn-primary">
            Apply for Trade Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
