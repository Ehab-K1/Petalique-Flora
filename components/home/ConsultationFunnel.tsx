"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users, DollarSign, Sparkles, Upload, CheckCircle } from "lucide-react";
import { BUDGET_RANGES } from "@/lib/constants";

type FormData = {
  type: string;
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  venue: string;
  guestCount: string;
  budget: string;
  vision: string;
};

const STEPS = [
  { id: 1, label: "Event Type" },
  { id: 2, label: "Your Details" },
  { id: 3, label: "Event Info" },
  { id: 4, label: "Vision" },
];

export function ConsultationFunnel() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    type: "",
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    venue: "",
    guestCount: "",
    budget: "",
    vision: "",
  });

  const update = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      // Show error
    } finally {
      setIsLoading(false);
    }
  };

  const canAdvance = () => {
    switch (step) {
      case 1: return !!form.type;
      case 2: return !!(form.name && form.email);
      case 3: return !!(form.weddingDate || form.venue);
      case 4: return true;
      default: return false;
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-rosewood">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <CheckCircle className="w-16 h-16 text-ivory mx-auto mb-6" />
            <h2 className="font-serif text-display-lg text-ivory mb-4">
              Your inquiry is received.
            </h2>
            <p className="font-sans text-body-md text-ivory/70 mb-8">
              We will review your vision and respond within 24 hours with a personalised
              proposal.
            </p>
            <p className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest">
              Check your email at {form.email}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-40 bg-charcoal overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-sans text-label-sm uppercase tracking-[0.25em] text-champagne block mb-4">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-display-xl text-ivory mb-4">
            Book a Consultation
          </h2>
          <p className="font-sans text-body-md text-ivory/50">
            Tell us about your vision and we will create something extraordinary.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex flex-col items-center gap-1.5 ${
                  step > s.id ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center text-sm font-sans transition-all duration-300 ${
                    s.id < step
                      ? "bg-champagne text-ivory"
                      : s.id === step
                      ? "bg-ivory text-charcoal"
                      : "bg-ivory/10 text-ivory/30"
                  }`}
                >
                  {s.id < step ? <CheckCircle className="w-4 h-4" /> : s.id}
                </div>
                <span
                  className={`font-sans text-label-sm hidden sm:block ${
                    s.id === step ? "text-ivory" : "text-ivory/30"
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-12 sm:w-20 mx-2 transition-colors duration-300 ${
                    step > s.id ? "bg-champagne" : "bg-ivory/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="bg-charcoal/50 border border-ivory/10 p-8 lg:p-12"
          >
            {step === 1 && (
              <div>
                <h3 className="font-serif text-display-sm text-ivory mb-8">
                  What brings you to us?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "WEDDING", label: "Wedding", icon: "💍", desc: "Bridal & ceremony" },
                    { value: "EVENT", label: "Event", icon: "🎊", desc: "Private & corporate" },
                    { value: "CORPORATE", label: "Corporate", icon: "🏢", desc: "Office & hotel" },
                    { value: "CUSTOM", label: "Custom", icon: "✨", desc: "Something unique" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => update("type", type.value)}
                      className={`p-5 border text-left transition-all duration-300 ${
                        form.type === type.value
                          ? "border-champagne bg-champagne/10"
                          : "border-ivory/10 hover:border-ivory/30"
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <p className="font-sans text-body-sm font-medium text-ivory mb-0.5">
                        {type.label}
                      </p>
                      <p className="font-sans text-label-sm text-ivory/40">
                        {type.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-serif text-display-sm text-ivory mb-8">
                  How should we reach you?
                </h3>
                <div>
                  <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full bg-transparent border-b border-ivory/20 pb-3 text-ivory font-sans placeholder:text-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-transparent border-b border-ivory/20 pb-3 text-ivory font-sans placeholder:text-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full bg-transparent border-b border-ivory/20 pb-3 text-ivory font-sans placeholder:text-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors"
                    placeholder="+1 (xxx) xxx-xxxx"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-serif text-display-sm text-ivory mb-8">
                  Tell us about your event.
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> Event Date
                    </label>
                    <input
                      type="date"
                      value={form.weddingDate}
                      onChange={(e) => update("weddingDate", e.target.value)}
                      className="w-full bg-transparent border-b border-ivory/20 pb-3 text-ivory font-sans focus:outline-none focus:border-champagne/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <Users className="w-3 h-3" /> Guest Count
                    </label>
                    <input
                      type="number"
                      value={form.guestCount}
                      onChange={(e) => update("guestCount", e.target.value)}
                      className="w-full bg-transparent border-b border-ivory/20 pb-3 text-ivory font-sans placeholder:text-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors"
                      placeholder="Approx. number of guests"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> Venue
                    </label>
                    <input
                      type="text"
                      value={form.venue}
                      onChange={(e) => update("venue", e.target.value)}
                      className="w-full bg-transparent border-b border-ivory/20 pb-3 text-ivory font-sans placeholder:text-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors"
                      placeholder="Venue name & city"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3" /> Floral Budget
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="w-full bg-charcoal border-b border-ivory/20 pb-3 text-ivory font-sans focus:outline-none focus:border-champagne/60 transition-colors appearance-none"
                    >
                      <option value="" className="bg-charcoal">Select range</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value} className="bg-charcoal">
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="font-serif text-display-sm text-ivory mb-2">
                  Describe your vision.
                </h3>
                <p className="font-sans text-body-sm text-ivory/50 mb-8">
                  Share any inspiration, colours, themes, or specific flowers you love.
                </p>
                <div>
                  <label className="font-sans text-label-sm text-ivory/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Your Vision
                  </label>
                  <textarea
                    value={form.vision}
                    onChange={(e) => update("vision", e.target.value)}
                    rows={5}
                    className="w-full bg-transparent border-b border-ivory/20 pb-3 text-ivory font-sans placeholder:text-ivory/20 focus:outline-none focus:border-champagne/60 transition-colors resize-none leading-relaxed"
                    placeholder="Describe the aesthetic, feeling, and story you want your florals to tell..."
                  />
                </div>
                <div className="border border-dashed border-ivory/20 p-6 text-center hover:border-ivory/40 transition-colors cursor-pointer">
                  <Upload className="w-5 h-5 text-ivory/30 mx-auto mb-2" />
                  <p className="font-sans text-body-sm text-ivory/50">
                    Upload inspiration images (optional)
                  </p>
                  <p className="font-sans text-label-sm text-ivory/30 mt-1">
                    PNG, JPG, PDF up to 10MB each
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="font-sans text-label-sm text-ivory/40 uppercase tracking-widest hover:text-ivory transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-ivory font-sans text-label-md uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-burnished-gold transition-colors duration-300"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center gap-3 px-8 py-4 bg-dusty-rose text-ivory font-sans text-label-md uppercase tracking-widest disabled:opacity-60 hover:bg-rosewood transition-colors duration-300"
            >
              {isLoading ? "Sending…" : "Submit Inquiry"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
