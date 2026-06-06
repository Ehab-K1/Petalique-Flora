"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Upload, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function WholesaleRegisterPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    website: "",
    taxNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    notes: "",
    agreeTerms: false,
  });

  const update = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/wholesale/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-champagne mx-auto mb-6" />
          <h1 className="font-serif text-display-lg text-charcoal mb-4">
            Application Received
          </h1>
          <p className="font-sans text-body-md text-smoke mb-8">
            Thank you for applying for a Petalique Flora trade account. We will review your
            application and respond within 2 business days at{" "}
            <strong className="text-charcoal">{form.email}</strong>.
          </p>
          <Link href="/" className="btn-outline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/wholesale"
            className="font-sans text-label-sm text-smoke uppercase tracking-widest hover:text-charcoal transition-colors mb-6 block"
          >
            ← Back to Wholesale
          </Link>
          <span className="section-tag">Trade Program</span>
          <h1 className="font-serif text-display-lg text-charcoal mb-2">
            Apply for Account
          </h1>
          <p className="font-sans text-body-md text-smoke">
            Complete your application to access trade pricing and the wholesale portal.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          {["Business Info", "Account Setup", "Documentation"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 flex items-center justify-center text-sm font-sans border transition-colors ${
                  i + 1 < step
                    ? "bg-champagne border-champagne text-ivory"
                    : i + 1 === step
                    ? "bg-charcoal border-charcoal text-ivory"
                    : "border-bone/60 text-smoke"
                }`}
              >
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span
                className={`font-sans text-label-sm hidden sm:block ${
                  i + 1 === step ? "text-charcoal" : "text-smoke"
                }`}
              >
                {s}
              </span>
              {i < 2 && <div className="w-8 h-px bg-bone/60 mx-1" />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-ivory border border-bone/40 p-8 lg:p-10 space-y-6">
          {step === 1 && (
            <>
              <h2 className="font-serif text-display-sm text-charcoal">Business Information</h2>
              <div>
                <label className="field-label">Business Name *</label>
                <input
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  className="field-luxury"
                  placeholder="Your business or studio name"
                />
              </div>
              <div>
                <label className="field-label">Business Type *</label>
                <select
                  value={form.businessType}
                  onChange={(e) => update("businessType", e.target.value)}
                  className="field-luxury bg-transparent"
                >
                  <option value="">Select type</option>
                  {["Florist / Floral Studio", "Event Planner", "Wedding Venue", "Hotel / Hospitality", "Retailer / Boutique", "Corporate Buyer"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">Website</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  className="field-luxury"
                  placeholder="https://yourbusiness.com"
                />
              </div>
              <div>
                <label className="field-label">Business HST / Tax Number</label>
                <input
                  value={form.taxNumber}
                  onChange={(e) => update("taxNumber", e.target.value)}
                  className="field-luxury"
                  placeholder="Registered business number"
                />
              </div>
              <div>
                <label className="field-label">Additional Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={3}
                  className="field-luxury resize-none"
                  placeholder="Tell us about your business and floral needs..."
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-serif text-display-sm text-charcoal">Account Setup</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="field-label">First Name *</label>
                  <input
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="field-luxury"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="field-label">Last Name *</label>
                  <input
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="field-luxury"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div>
                <label className="field-label">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="field-luxury"
                  placeholder="your@business.com"
                />
              </div>
              <div>
                <label className="field-label">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="field-luxury"
                  placeholder="+1 (xxx) xxx-xxxx"
                />
              </div>
              <div>
                <label className="field-label">Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="field-luxury"
                  placeholder="Minimum 8 characters"
                />
              </div>
              <div>
                <label className="field-label">Confirm Password *</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className="field-luxury"
                  placeholder="Confirm password"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-serif text-display-sm text-charcoal">Documentation</h2>
              <p className="font-sans text-body-sm text-smoke">
                Please upload your business license or registration document. This helps us
                verify your trade account application.
              </p>

              <div className="border-2 border-dashed border-bone p-8 text-center cursor-pointer hover:border-champagne/60 transition-colors">
                <Upload className="w-6 h-6 text-smoke mx-auto mb-3" />
                <p className="font-sans text-body-sm text-charcoal font-medium mb-1">
                  Upload Business License
                </p>
                <p className="font-sans text-label-sm text-smoke">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>

              <div className="bg-bone/40 p-4">
                <h3 className="font-sans text-body-sm font-medium text-charcoal mb-2">
                  Review Summary
                </h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-smoke">Business</dt>
                    <dd className="text-charcoal">{form.businessName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-smoke">Contact</dt>
                    <dd className="text-charcoal">{form.firstName} {form.lastName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-smoke">Email</dt>
                    <dd className="text-charcoal">{form.email}</dd>
                  </div>
                </dl>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                  className="mt-1 accent-charcoal"
                />
                <span className="font-sans text-body-sm text-charcoal/70">
                  I agree to the{" "}
                  <Link href="/terms" className="text-rosewood hover:underline">
                    Wholesale Terms & Conditions
                  </Link>{" "}
                  and understand that my account is subject to approval.
                </span>
              </label>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="font-sans text-label-sm text-smoke uppercase tracking-widest hover:text-charcoal transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && (!form.businessName || !form.businessType)}
              className="btn-primary disabled:opacity-40"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!form.agreeTerms || isLoading}
              className="btn-primary disabled:opacity-40"
            >
              {isLoading ? "Submitting…" : "Submit Application"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
