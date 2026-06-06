import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Wedding Planner Portal — Petalique Flora",
  description:
    "Dedicated portal for wedding planners and coordinators. Client management, mood boards, proposal builder, and exclusive trade pricing.",
};

const FEATURES = [
  { title: "Client Management", desc: "Manage all your clients, their projects, and wedding details in one organised dashboard." },
  { title: "Mood Board Builder", desc: "Collaborative mood boards you can share with clients for floral inspiration and approval." },
  { title: "Proposal Generator", desc: "Create professional, branded floral proposals with itemised pricing in minutes." },
  { title: "Budget Tracking", desc: "Track floral budgets across all your projects with real-time spend visibility." },
  { title: "Commission Earnings", desc: "Earn 10% commission on every client referral that completes a booking." },
  { title: "Priority Access", desc: "First access to new collections, seasonal florals, and exclusive design consultations." },
];

export default function PlannerLandingPage() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Planner Portal</span>
              <h1 className="font-serif text-display-2xl text-charcoal mb-6 leading-none">
                Your Partner in{" "}
                <em className="not-italic text-dusty-rose">Floral</em> Design
              </h1>
              <p className="font-sans text-body-lg text-smoke leading-relaxed mb-10">
                The Petalique Flora Planner Portal gives wedding coordinators and event planners
                a dedicated workspace to manage clients, create proposals, and collaborate
                seamlessly on floral design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/planner/register" className="btn-primary">
                  Apply for Access
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/planner/dashboard" className="btn-outline">
                  Sign In to Portal
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519167758481-83f29c8a4a60?w=900&q=90"
                  alt="Wedding planner portal"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-ivory">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-tag">Portal Features</span>
            <h2 className="font-serif text-display-xl text-charcoal">Everything You Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="p-7 border border-bone/40 hover:border-champagne/40 transition-colors duration-300">
                <div className="w-8 h-8 bg-champagne/15 flex items-center justify-center mb-4">
                  <span className="font-mono text-xs text-champagne">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-display-sm text-charcoal mb-3">{f.title}</h3>
                <p className="font-sans text-body-sm text-smoke leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission */}
      <section className="py-20 bg-rosewood">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-sans text-label-sm uppercase tracking-[0.25em] text-ivory/60 mb-4">Partner Benefit</p>
          <h2 className="font-serif text-display-xl text-ivory mb-4">Earn 10% Commission</h2>
          <p className="font-sans text-body-md text-ivory/70 mb-10">
            Every time a client you refer completes a floral booking with us, you earn
            a 10% commission — paid monthly to your account.
          </p>
          <Link href="/planner/register" className="inline-flex items-center gap-3 px-10 py-4 bg-ivory text-charcoal font-sans text-label-md uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-all duration-400">
            Apply Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
