"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function PlannerRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", website: "", portfolio: "",
    password: "", confirmPassword: "", agreeTerms: false,
  });

  const update = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/planner/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else toast.error("Registration failed. Please try again.");
    } catch {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-champagne mx-auto mb-6" />
          <h1 className="font-serif text-display-lg text-charcoal mb-4">Application Received</h1>
          <p className="font-sans text-body-md text-smoke mb-8">
            Thank you for applying to the Petalique Flora Planner Portal. We'll review your
            application and respond to <strong className="text-charcoal">{form.email}</strong> within 2 business days.
          </p>
          <Link href="/" className="btn-outline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-xl mx-auto px-6 py-16">
        <Link href="/planner" className="font-sans text-label-sm text-smoke uppercase tracking-widest hover:text-charcoal transition-colors mb-6 block">
          ← Back to Planner Portal
        </Link>
        <span className="section-tag">Planner Portal</span>
        <h1 className="font-serif text-display-lg text-charcoal mb-2">Apply for Access</h1>
        <p className="font-sans text-body-md text-smoke mb-10">
          Tell us about your business and we'll get you set up within 48 hours.
        </p>

        <form onSubmit={handleSubmit} className="bg-ivory border border-bone/40 p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">First Name *</label>
              <input value={form.firstName} onChange={e => update("firstName", e.target.value)}
                className="field-luxury" placeholder="First" required />
            </div>
            <div>
              <label className="field-label">Last Name *</label>
              <input value={form.lastName} onChange={e => update("lastName", e.target.value)}
                className="field-luxury" placeholder="Last" required />
            </div>
          </div>
          <div>
            <label className="field-label">Email Address *</label>
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
              className="field-luxury" placeholder="your@business.com" required />
          </div>
          <div>
            <label className="field-label">Phone</label>
            <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)}
              className="field-luxury" placeholder="+1 (xxx) xxx-xxxx" />
          </div>
          <div className="divider-gold" />
          <div>
            <label className="field-label">Planning Business Name *</label>
            <input value={form.businessName} onChange={e => update("businessName", e.target.value)}
              className="field-luxury" placeholder="Your business name" required />
          </div>
          <div>
            <label className="field-label">Website</label>
            <input type="url" value={form.website} onChange={e => update("website", e.target.value)}
              className="field-luxury" placeholder="https://yourbusiness.com" />
          </div>
          <div>
            <label className="field-label">Portfolio / Instagram</label>
            <input value={form.portfolio} onChange={e => update("portfolio", e.target.value)}
              className="field-luxury" placeholder="Portfolio URL or @instagram" />
          </div>
          <div className="divider-gold" />
          <div>
            <label className="field-label">Password *</label>
            <input type="password" value={form.password} onChange={e => update("password", e.target.value)}
              className="field-luxury" placeholder="Min. 8 characters" required />
          </div>
          <div>
            <label className="field-label">Confirm Password *</label>
            <input type="password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)}
              className="field-luxury" placeholder="Confirm password" required />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.agreeTerms as boolean}
              onChange={e => update("agreeTerms", e.target.checked)} className="mt-1 accent-charcoal" />
            <span className="font-sans text-body-sm text-charcoal/70">
              I agree to the <Link href="/terms" className="text-rosewood hover:underline">Terms</Link> and{" "}
              <Link href="/privacy" className="text-rosewood hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <button type="submit" disabled={loading || !(form.agreeTerms as boolean)} className="btn-primary w-full disabled:opacity-40">
            {loading ? "Submitting…" : "Submit Application"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
