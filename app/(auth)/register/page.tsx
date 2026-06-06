"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type AccountType = "CUSTOMER" | "WHOLESALE" | "PLANNER";

const ACCOUNT_TYPES: { value: AccountType; label: string; desc: string; icon: string }[] = [
  { value: "CUSTOMER", label: "Personal", desc: "Shop, send gifts, track orders", icon: "🌸" },
  { value: "WHOLESALE", label: "Trade / Wholesale", desc: "Bulk orders & trade pricing", icon: "📦" },
  { value: "PLANNER", label: "Wedding Planner", desc: "Client management & proposals", icon: "💼" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("CUSTOMER");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: accountType }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Registration failed.");
        return;
      }
      // Auto sign in
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (accountType === "WHOLESALE") {
        router.push("/wholesale/register");
      } else if (accountType === "PLANNER") {
        router.push("/planner/register");
      } else {
        router.push("/account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Link href="/" className="block mb-8">
          <span className="font-serif text-2xl text-charcoal">Petalique Flora</span>
        </Link>

        <h1 className="font-serif text-display-lg text-charcoal mb-2">Create account.</h1>
        <p className="font-sans text-body-sm text-smoke mb-8">
          Already have an account?{" "}
          <Link href="/login" className="text-rosewood hover:underline">Sign in</Link>
        </p>

        {/* Account Type */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {ACCOUNT_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setAccountType(t.value)}
              className={`p-3 border text-center transition-all duration-200 ${
                accountType === t.value
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-bone/60 text-charcoal hover:border-charcoal/40"
              }`}
            >
              <div className="text-xl mb-1">{t.icon}</div>
              <p className="font-sans text-label-sm font-medium">{t.label}</p>
              <p className={`font-sans text-[10px] leading-snug mt-0.5 ${
                accountType === t.value ? "text-ivory/60" : "text-smoke"
              }`}>{t.desc}</p>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">First Name *</label>
              <input value={form.firstName} onChange={e => update("firstName", e.target.value)}
                className="field-luxury" placeholder="First name" required />
            </div>
            <div>
              <label className="field-label">Last Name *</label>
              <input value={form.lastName} onChange={e => update("lastName", e.target.value)}
                className="field-luxury" placeholder="Last name" required />
            </div>
          </div>
          <div>
            <label className="field-label">Email Address *</label>
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
              className="field-luxury" placeholder="your@email.com" required autoComplete="email" />
          </div>
          <div>
            <label className="field-label">Password *</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={e => update("password", e.target.value)}
                className="field-luxury pr-10"
                placeholder="Min. 8 characters"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-smoke hover:text-charcoal transition-colors p-1">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="field-label">Confirm Password *</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={e => update("confirmPassword", e.target.value)}
              className="field-luxury"
              placeholder="Confirm your password"
              required
            />
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="font-sans text-label-sm text-rosewood mt-1">Passwords do not match</p>
            )}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
                agreed ? "bg-charcoal border-charcoal" : "border-bone"
              }`}
            >
              {agreed && <Check className="w-2.5 h-2.5 text-ivory" />}
            </button>
            <span className="font-sans text-body-sm text-charcoal/70">
              I agree to the{" "}
              <Link href="/terms" className="text-rosewood hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-rosewood hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !agreed}
            className="btn-primary w-full disabled:opacity-40"
          >
            {loading ? "Creating account…" : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
