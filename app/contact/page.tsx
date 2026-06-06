"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, ArrowRight, CheckCircle } from "lucide-react";
import { BRAND, BUDGET_RANGES } from "@/lib/constants";
import toast from "react-hot-toast";

const EVENT_TYPES = [
  { value: "WEDDING", label: "Wedding Florals" },
  { value: "EVENT", label: "Event / Party" },
  { value: "CORPORATE", label: "Corporate" },
  { value: "CUSTOM", label: "Custom Arrangement" },
  { value: "WHOLESALE", label: "Wholesale Inquiry" },
  { value: "OTHER", label: "Other" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", type: "", budget: "", message: "",
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: form.type || "CUSTOM",
          vision: form.message,
        }),
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <span className="section-tag">Get In Touch</span>
          <h1 className="font-serif text-display-2xl text-charcoal mb-4">
            Let&apos;s Create Something{" "}
            <em className="not-italic text-dusty-rose">Beautiful</em>
          </h1>
          <p className="font-sans text-body-lg text-smoke max-w-xl">
            Whether you&apos;re planning a wedding, an event, or simply want to send something
            extraordinary — we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Left: Info */}
          <div>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-bone/60 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-1">Phone</p>
                  <a href={`tel:${BRAND.phone}`} className="font-sans text-body-md text-charcoal hover:text-rosewood transition-colors">
                    {BRAND.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-bone/60 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-1">Email</p>
                  <a href={`mailto:${BRAND.email}`} className="font-sans text-body-md text-charcoal hover:text-rosewood transition-colors">
                    {BRAND.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-bone/60 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-1">Location</p>
                  <p className="font-sans text-body-md text-charcoal">
                    Mississauga, Ontario, Canada
                  </p>
                  <p className="font-sans text-body-sm text-smoke mt-1">
                    Serving the entire Greater Toronto Area
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-bone/60 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-champagne" />
                </div>
                <div>
                  <p className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-1">Hours</p>
                  <p className="font-sans text-body-sm text-charcoal">Mon – Fri: 9am – 6pm</p>
                  <p className="font-sans text-body-sm text-charcoal">Saturday: 10am – 4pm</p>
                  <p className="font-sans text-body-sm text-charcoal/60">Sunday: By appointment</p>
                </div>
              </div>
            </div>

            {/* Serving */}
            <div className="border border-bone/40 p-6 mb-8">
              <p className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-4">Serving</p>
              <div className="flex flex-wrap gap-2">
                {["Mississauga", "Toronto", "Brampton", "Oakville", "Milton", "Burlington", "Vaughan"].map(city => (
                  <span key={city} className="font-sans text-body-sm text-charcoal/70 bg-bone/40 px-3 py-1">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-sans text-body-sm text-charcoal/70 hover:text-charcoal transition-colors"
            >
              <Instagram className="w-4 h-4 text-dusty-rose" />
              Follow @petaliqueflora on Instagram
            </a>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle className="w-12 h-12 text-champagne mb-5" />
                <h2 className="font-serif text-display-lg text-charcoal mb-3">
                  Message Received
                </h2>
                <p className="font-sans text-body-md text-smoke mb-6">
                  Thank you for reaching out. We&apos;ll reply to{" "}
                  <strong className="text-charcoal">{form.email}</strong> within 24 hours.
                </p>
                <Link href="/" className="btn-outline">Return Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-serif text-display-md text-charcoal mb-8">
                  Send a Message
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">Your Name *</label>
                    <input value={form.name} onChange={e => update("name", e.target.value)}
                      className="field-luxury" placeholder="Full name" required />
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)}
                      className="field-luxury" placeholder="+1 (xxx) xxx-xxxx" />
                  </div>
                </div>
                <div>
                  <label className="field-label">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
                    className="field-luxury" placeholder="your@email.com" required />
                </div>
                <div>
                  <label className="field-label">Inquiry Type</label>
                  <select value={form.type} onChange={e => update("type", e.target.value)}
                    className="field-luxury bg-transparent">
                    <option value="">Select type</option>
                    {EVENT_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Estimated Budget</label>
                  <select value={form.budget} onChange={e => update("budget", e.target.value)}
                    className="field-luxury bg-transparent">
                    <option value="">Select range</option>
                    {BUDGET_RANGES.map(b => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Message *</label>
                  <textarea value={form.message} onChange={e => update("message", e.target.value)}
                    rows={5} className="field-luxury resize-none"
                    placeholder="Tell us about your event, vision, or questions…" required />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                  {loading ? "Sending…" : "Send Message"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="font-sans text-label-sm text-smoke text-center">
                  We respond to all inquiries within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
