// app/(shop)/checkout/page.tsx
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/shop/CartProvider";
import { formatPrice } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type CheckoutStep = "contact" | "shipping" | "payment";

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ShippingForm {
  line1: string;
  line2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  deliveryDate: string;
  giftMessage: string;
  deliveryNotes: string;
}

interface FormErrors {
  [key: string]: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CANADIAN_PROVINCES = [
  { code: "ON", name: "Ontario" },
  { code: "BC", name: "British Columbia" },
  { code: "AB", name: "Alberta" },
  { code: "QC", name: "Quebec" },
  { code: "MB", name: "Manitoba" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "PE", name: "Prince Edward Island" },
];

const STEPS: { id: CheckoutStep; label: string; step: number }[] = [
  { id: "contact", label: "Contact", step: 1 },
  { id: "shipping", label: "Shipping", step: 2 },
  { id: "payment", label: "Payment", step: 3 },
];

const TAX_RATE = 0.13;
const FREE_DELIVERY_THRESHOLD = 150;
const DELIVERY_FEE = 18;

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({
  currentStep,
  onStepClick,
  completedSteps,
}: {
  currentStep: CheckoutStep;
  onStepClick: (step: CheckoutStep) => void;
  completedSteps: Set<CheckoutStep>;
}) {
  return (
    <nav aria-label="Checkout progress" className="flex items-center gap-0 mb-12">
      {STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.has(step.id);
        const isClickable = isCompleted && !isActive;

        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable && !isActive}
              className={`flex items-center gap-3 group transition-all duration-300 ${
                isClickable ? "cursor-pointer" : "cursor-default"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  font-sans text-label-sm font-medium transition-all duration-500
                  ${
                    isActive
                      ? "bg-charcoal text-ivory"
                      : isCompleted
                      ? "bg-champagne text-ivory"
                      : "bg-bone text-smoke"
                  }
                `}
              >
                {isCompleted && !isActive ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.step
                )}
              </div>
              <span
                className={`font-sans text-label-md uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? "text-charcoal" : isCompleted ? "text-champagne" : "text-smoke"
                }`}
              >
                {step.label}
              </span>
            </button>
            {index < STEPS.length - 1 && (
              <div
                className={`mx-4 h-px w-12 transition-colors duration-500 ${
                  isCompleted ? "bg-champagne" : "bg-bone"
                }`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────

function OrderSummary({
  items,
  subtotal,
}: {
  items: ReturnType<typeof useCart>["items"];
  subtotal: number;
}) {
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + delivery + tax;

  return (
    <aside className="bg-ivory border border-bone/60 p-8 sticky top-28 self-start">
      <h2 className="font-serif text-display-sm text-charcoal mb-8">
        Order Summary
      </h2>

      {/* Items */}
      <ul className="space-y-5 mb-8 pb-8 border-b border-bone/60">
        {items.length === 0 ? (
          <li className="text-center py-4">
            <p className="font-sans text-body-sm text-smoke">Your cart is empty</p>
          </li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="flex gap-4">
              <div className="relative w-16 h-16 bg-bone/40 flex-shrink-0 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full bg-bone" />
                )}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal text-ivory font-sans text-[10px] flex items-center justify-center rounded-full">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-body-sm text-charcoal font-medium leading-tight truncate">
                  {item.name}
                </p>
                {item.options && Object.keys(item.options).length > 0 && (
                  <p className="font-sans text-label-sm text-smoke mt-0.5">
                    {Object.entries(item.options)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" · ")}
                  </p>
                )}
                {item.deliveryDate && (
                  <p className="font-sans text-label-sm text-champagne mt-0.5">
                    Delivery: {new Date(item.deliveryDate).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                  </p>
                )}
              </div>
              <p className="font-sans text-body-sm text-charcoal font-medium flex-shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))
        )}
      </ul>

      {/* Promo Code */}
      <div className="mb-8 pb-8 border-b border-bone/60">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Promo code"
            className="field-luxury flex-1 text-body-sm"
          />
          <button className="btn-outline px-5 py-2.5 text-label-sm">
            Apply
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="space-y-3 mb-8 pb-8 border-b border-bone/60">
        <div className="flex justify-between">
          <span className="font-sans text-body-sm text-smoke">Subtotal</span>
          <span className="font-sans text-body-sm text-charcoal">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-body-sm text-smoke">Delivery</span>
          <span className="font-sans text-body-sm text-charcoal">
            {delivery === 0 ? (
              <span className="text-champagne">Free</span>
            ) : (
              formatPrice(delivery)
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-body-sm text-smoke">HST (13%)</span>
          <span className="font-sans text-body-sm text-charcoal">{formatPrice(tax)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="font-serif text-display-sm text-charcoal">Total</span>
        <span className="font-serif text-display-sm text-charcoal">{formatPrice(total)}</span>
      </div>
      <p className="font-sans text-label-sm text-smoke">CAD, inclusive of all taxes</p>

      {subtotal < FREE_DELIVERY_THRESHOLD && subtotal > 0 && (
        <p className="mt-4 font-sans text-label-sm text-champagne text-center">
          Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery
        </p>
      )}

      {/* Trust signals */}
      <div className="mt-8 pt-6 border-t border-bone/60 space-y-3">
        {[
          { icon: "🔒", text: "Secure 256-bit SSL encryption" },
          { icon: "🌸", text: "Freshness guaranteed or remade free" },
          { icon: "📦", text: "Same-day delivery available" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <span className="text-base">{icon}</span>
            <span className="font-sans text-label-sm text-smoke">{text}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ─── Contact Step ─────────────────────────────────────────────────────────────

function ContactStep({
  form,
  errors,
  onChange,
  onNext,
}: {
  form: ContactForm;
  errors: FormErrors;
  onChange: (field: keyof ContactForm, value: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <h2 className="font-serif text-display-md text-charcoal mb-2">Contact Information</h2>
      <p className="font-sans text-body-sm text-smoke mb-10">
        We will use this to send your order confirmation and delivery updates.
      </p>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="field-label">First Name *</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              className="field-luxury"
              placeholder="Priya"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="field-label">Last Name *</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              className="field-luxury"
              placeholder="Sharma"
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="field-label">Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="field-luxury"
            placeholder="priya@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="field-label">Phone Number *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="field-luxury"
            placeholder="+1 (416) 555-0100"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.phone}</p>
          )}
          <p className="mt-2 font-sans text-label-sm text-smoke">
            For delivery coordination only. We never share your number.
          </p>
        </div>

        <div className="pt-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-champagne"
            />
            <span className="font-sans text-body-sm text-smoke group-hover:text-charcoal transition-colors">
              Keep me informed about seasonal collections, exclusive offers, and floral inspiration.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-12">
        <button onClick={onNext} className="btn-primary w-full sm:w-auto">
          Continue to Shipping
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Shipping Step ────────────────────────────────────────────────────────────

function ShippingStep({
  form,
  errors,
  onChange,
  onNext,
  onBack,
}: {
  form: ShippingForm;
  errors: FormErrors;
  onChange: (field: keyof ShippingForm, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="animate-fade-up">
      <h2 className="font-serif text-display-md text-charcoal mb-2">Shipping Address</h2>
      <p className="font-sans text-body-sm text-smoke mb-10">
        We deliver across the Greater Toronto Area — Mississauga, Toronto, Brampton, Oakville, and Milton.
      </p>

      <div className="space-y-8">
        <div>
          <label className="field-label">Street Address *</label>
          <input
            type="text"
            value={form.line1}
            onChange={(e) => onChange("line1", e.target.value)}
            className="field-luxury"
            placeholder="123 Rosewood Drive"
            autoComplete="address-line1"
          />
          {errors.line1 && (
            <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.line1}</p>
          )}
        </div>

        <div>
          <label className="field-label">Apt, Suite, Unit (optional)</label>
          <input
            type="text"
            value={form.line2}
            onChange={(e) => onChange("line2", e.target.value)}
            className="field-luxury"
            placeholder="Suite 200"
            autoComplete="address-line2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="field-label">City *</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="field-luxury"
              placeholder="Mississauga"
              autoComplete="address-level2"
            />
            {errors.city && (
              <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="field-label">Province *</label>
            <select
              value={form.province}
              onChange={(e) => onChange("province", e.target.value)}
              className="field-luxury bg-transparent appearance-none cursor-pointer"
            >
              <option value="">Select Province</option>
              {CANADIAN_PROVINCES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.province}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="field-label">Postal Code *</label>
            <input
              type="text"
              value={form.postalCode}
              onChange={(e) => onChange("postalCode", e.target.value.toUpperCase())}
              className="field-luxury font-mono"
              placeholder="L5B 3A1"
              autoComplete="postal-code"
              maxLength={7}
            />
            {errors.postalCode && (
              <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.postalCode}</p>
            )}
          </div>
          <div>
            <label className="field-label">Country</label>
            <input
              type="text"
              value="Canada"
              readOnly
              className="field-luxury opacity-60 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Delivery Date */}
        <div className="pt-4 pb-4 border-t border-bone/40">
          <span className="section-tag">Delivery Preferences</span>
          <div>
            <label className="field-label">Preferred Delivery Date *</label>
            <input
              type="date"
              value={form.deliveryDate}
              onChange={(e) => onChange("deliveryDate", e.target.value)}
              min={minDate}
              className="field-luxury font-mono"
            />
            {errors.deliveryDate && (
              <p className="mt-2 font-sans text-label-sm text-dusty-rose">{errors.deliveryDate}</p>
            )}
            <p className="mt-2 font-sans text-label-sm text-smoke">
              Same-day delivery available for orders placed before 10 AM. Next-day delivery guaranteed across GTA.
            </p>
          </div>
        </div>

        {/* Delivery Notes */}
        <div>
          <label className="field-label">Delivery Notes (optional)</label>
          <textarea
            value={form.deliveryNotes}
            onChange={(e) => onChange("deliveryNotes", e.target.value)}
            rows={2}
            className="field-luxury resize-none"
            placeholder="Gate code, specific time, buzzer number..."
          />
        </div>

        {/* Gift Message */}
        <div className="pt-4 pb-4 border-t border-bone/40">
          <span className="section-tag">Gift Message</span>
          <div>
            <label className="field-label">Personal Message (optional)</label>
            <textarea
              value={form.giftMessage}
              onChange={(e) => onChange("giftMessage", e.target.value)}
              rows={4}
              maxLength={280}
              className="field-luxury resize-none"
              placeholder="With love and warmth, this arrangement was crafted especially for you..."
            />
            <p className="mt-2 font-sans text-label-sm text-smoke text-right">
              {form.giftMessage.length}/280
            </p>
          </div>
          <p className="mt-1 font-sans text-label-sm text-smoke">
            A handwritten card on premium card stock will be included with your arrangement.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="btn-outline order-2 sm:order-1 w-full sm:w-auto"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-1">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button onClick={onNext} className="btn-primary order-1 sm:order-2 w-full sm:w-auto">
          Continue to Payment
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Payment Step ─────────────────────────────────────────────────────────────

function PaymentStep({
  subtotal,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  subtotal: number;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "google">("card");
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + delivery + tax;

  return (
    <div className="animate-fade-up">
      <h2 className="font-serif text-display-md text-charcoal mb-2">Payment</h2>
      <p className="font-sans text-body-sm text-smoke mb-10">
        All transactions are secured and encrypted with 256-bit SSL technology.
      </p>

      {/* Express Pay */}
      <div className="mb-10">
        <span className="section-tag">Express Checkout</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setPaymentMethod("apple")}
            className={`
              relative flex items-center justify-center gap-3 h-14 border transition-all duration-300
              ${
                paymentMethod === "apple"
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-bone/60 bg-white text-charcoal hover:border-charcoal/40"
              }
            `}
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="currentColor">
              <path d="M14.9 11.6c0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.1-2.9.9-3.6.9-.7 0-1.9-.9-3.1-.9-1.6 0-3.1.9-3.9 2.4C1 11.3 2 16 3.8 18.7c.9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9 1.6 0 2.1.9 3.6.9s2.5-1.3 3.4-2.7c1.1-1.5 1.5-3 1.5-3.1-.1-.1-2.5-1-2.5-3.7zM13.3 4.5c.7-.9 1.2-2.1 1.1-3.4-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.5-.6 3.2-1.4z" />
            </svg>
            <span className="font-sans text-label-md font-medium">Apple Pay</span>
          </button>

          <button
            onClick={() => setPaymentMethod("google")}
            className={`
              relative flex items-center justify-center gap-3 h-14 border transition-all duration-300
              ${
                paymentMethod === "google"
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-bone/60 bg-white text-charcoal hover:border-charcoal/40"
              }
            `}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.79h5.4a4.6 4.6 0 0 1-2 3.02v2.51h3.22c1.89-1.74 2.98-4.3 2.98-7.32z" fill="#4285F4" />
              <path d="M10 20c2.7 0 4.96-.89 6.61-2.43l-3.22-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H1.07v2.59A10 10 0 0 0 10 20z" fill="#34A853" />
              <path d="M4.4 11.91A6.06 6.06 0 0 1 4.08 10c0-.67.11-1.32.32-1.91V5.5H1.07A10.02 10.02 0 0 0 0 10c0 1.62.38 3.14 1.07 4.5l3.33-2.59z" fill="#FBBC04" />
              <path d="M10 3.97c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.97 9.97 0 0 0 10 0 10 10 0 0 0 1.07 5.5l3.33 2.59C5.19 5.73 7.4 3.97 10 3.97z" fill="#EA4335" />
            </svg>
            <span className="font-sans text-label-md font-medium">Google Pay</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="relative mb-10">
        <div className="divider-gold" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream px-4 font-sans text-label-sm text-smoke">
          or pay with card
        </span>
      </div>

      {/* Card Payment */}
      <button
        onClick={() => setPaymentMethod("card")}
        className={`w-full text-left transition-colors duration-300 mb-8 ${
          paymentMethod === "card" ? "" : "opacity-60 hover:opacity-80"
        }`}
      >
        <span className="section-tag">Card Details</span>
      </button>

      <div className="space-y-8">
        {/* Stripe Card Element Placeholder */}
        <div>
          <label className="field-label">Card Number</label>
          <div className="w-full border-b border-bone/60 pb-3 pt-1 flex items-center gap-3">
            <input
              type="text"
              className="flex-1 bg-transparent font-sans text-body-md text-charcoal placeholder:text-smoke/60 focus:outline-none font-mono"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            <div className="flex gap-2 items-center">
              {/* Visa */}
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="opacity-60">
                <rect width="32" height="20" rx="3" fill="#1A1F71" />
                <text x="4" y="14" fill="white" fontSize="9" fontWeight="bold" fontFamily="serif">VISA</text>
              </svg>
              {/* Mastercard */}
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="opacity-60">
                <rect width="28" height="20" rx="3" fill="#252525" />
                <circle cx="10" cy="10" r="6" fill="#EB001B" />
                <circle cx="18" cy="10" r="6" fill="#F79E1B" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="field-label">Expiry Date</label>
            <input
              type="text"
              className="field-luxury font-mono"
              placeholder="MM / YY"
              maxLength={7}
            />
          </div>
          <div>
            <label className="field-label">Security Code</label>
            <div className="relative">
              <input
                type="text"
                className="field-luxury font-mono pr-8"
                placeholder="CVC"
                maxLength={4}
              />
              <button className="absolute right-0 top-1 text-smoke hover:text-charcoal transition-colors" title="The 3 or 4 digit code on the back of your card">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
                  <text x="7" y="12" fill="currentColor" fontSize="10" fontWeight="bold">?</text>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="field-label">Name on Card</label>
          <input
            type="text"
            className="field-luxury"
            placeholder="PRIYA SHARMA"
            autoComplete="cc-name"
          />
        </div>

        {/* Billing same as shipping */}
        <label className="flex items-center gap-3 cursor-pointer group mt-2">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 accent-champagne"
          />
          <span className="font-sans text-body-sm text-smoke group-hover:text-charcoal transition-colors">
            Billing address same as shipping address
          </span>
        </label>
      </div>

      {/* Order Total Summary */}
      <div className="mt-10 p-6 bg-ivory border border-bone/60">
        <div className="flex justify-between items-center">
          <span className="font-sans text-body-sm text-smoke">Total due today</span>
          <span className="font-serif text-display-sm text-charcoal">{formatPrice(total)}</span>
        </div>
        <p className="font-sans text-label-sm text-smoke mt-1">
          Includes HST and {delivery === 0 ? "complimentary delivery" : `${formatPrice(delivery)} delivery`}
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="btn-outline order-2 sm:order-1 w-full sm:w-auto"
          disabled={isSubmitting}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-1">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="btn-gold order-1 sm:order-2 w-full sm:w-auto flex-1 sm:flex-none justify-center"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 5H3L2 10H14L13 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M5 5V4C5 2.9 5.9 2 7 2H9C10.1 2 11 2.9 11 4V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Place Order — {formatPrice(total)}
            </>
          )}
        </button>
      </div>

      <p className="mt-6 font-sans text-label-sm text-smoke text-center">
        By placing your order you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-charcoal transition-colors">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-charcoal transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("contact");
  const [completedSteps, setCompletedSteps] = useState<Set<CheckoutStep>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contact, setContact] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [shipping, setShipping] = useState<ShippingForm>({
    line1: "",
    line2: "",
    city: "",
    province: "ON",
    postalCode: "",
    country: "CA",
    deliveryDate: "",
    giftMessage: "",
    deliveryNotes: "",
  });

  const [contactErrors, setContactErrors] = useState<FormErrors>({});
  const [shippingErrors, setShippingErrors] = useState<FormErrors>({});

  const updateContact = useCallback((field: keyof ContactForm, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
    setContactErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const updateShipping = useCallback((field: keyof ShippingForm, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    setShippingErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const validateContact = useCallback((): boolean => {
    const errors: FormErrors = {};
    if (!contact.firstName.trim()) errors.firstName = "First name is required";
    if (!contact.lastName.trim()) errors.lastName = "Last name is required";
    if (!contact.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!contact.phone.trim()) errors.phone = "Phone number is required";
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }, [contact]);

  const validateShipping = useCallback((): boolean => {
    const errors: FormErrors = {};
    if (!shipping.line1.trim()) errors.line1 = "Street address is required";
    if (!shipping.city.trim()) errors.city = "City is required";
    if (!shipping.province) errors.province = "Province is required";
    if (!shipping.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    } else if (!/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(shipping.postalCode)) {
      errors.postalCode = "Enter a valid Canadian postal code";
    }
    if (!shipping.deliveryDate) errors.deliveryDate = "Please select a delivery date";
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  }, [shipping]);

  const handleContactNext = useCallback(() => {
    if (validateContact()) {
      setCompletedSteps((prev) => new Set([...prev, "contact"]));
      setCurrentStep("shipping");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [validateContact]);

  const handleShippingNext = useCallback(() => {
    if (validateShipping()) {
      setCompletedSteps((prev) => new Set([...prev, "shipping"]));
      setCurrentStep("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [validateShipping]);

  const handleShippingBack = useCallback(() => {
    setCurrentStep("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlePaymentBack = useCallback(() => {
    setCurrentStep("shipping");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStepClick = useCallback((step: CheckoutStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlePlaceOrder = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Stripe payment intent creation would go here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // On success: redirect to confirmation
      window.location.href = "/order-confirmation?status=success";
    } catch {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream pt-24 pb-24">
      {/* Header */}
      <div className="border-b border-bone/40 mb-0">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-display-sm text-charcoal tracking-tight">
            Petalique Flora
          </Link>
          <div className="flex items-center gap-2 text-smoke">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1" />
              <path d="M4 4V3a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-sans text-label-sm">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 lg:px-12 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 xl:gap-24">
          {/* Left Column */}
          <div>
            <StepIndicator
              currentStep={currentStep}
              onStepClick={handleStepClick}
              completedSteps={completedSteps}
            />

            {currentStep === "contact" && (
              <ContactStep
                form={contact}
                errors={contactErrors}
                onChange={updateContact}
                onNext={handleContactNext}
              />
            )}

            {currentStep === "shipping" && (
              <ShippingStep
                form={shipping}
                errors={shippingErrors}
                onChange={updateShipping}
                onNext={handleShippingNext}
                onBack={handleShippingBack}
              />
            )}

            {currentStep === "payment" && (
              <PaymentStep
                subtotal={subtotal}
                onBack={handlePaymentBack}
                onSubmit={handlePlaceOrder}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Right Column: Order Summary */}
          <OrderSummary items={items} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
