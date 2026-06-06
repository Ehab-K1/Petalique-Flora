"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (res?.error) {
        toast.error("Invalid email or password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Mobile logo */}
      <Link href="/" className="block lg:hidden mb-8">
        <span className="font-serif text-2xl text-charcoal">Petalique Flora</span>
      </Link>

      <h1 className="font-serif text-display-lg text-charcoal mb-2">Welcome back.</h1>
      <p className="font-sans text-body-sm text-smoke mb-10">
        Sign in to your account to manage orders and wishlist.
      </p>

      {/* Google */}
      <button
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-3 border border-bone/60 py-3.5 font-sans text-body-sm text-charcoal hover:border-charcoal/40 hover:bg-bone/20 transition-all duration-300 mb-6"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 divider-gold" />
        <span className="font-sans text-label-sm text-smoke uppercase tracking-widest">or</span>
        <div className="flex-1 divider-gold" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="field-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-luxury"
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="field-label">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-luxury pr-10"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-smoke hover:text-charcoal transition-colors"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-charcoal" />
            <span className="font-sans text-body-sm text-charcoal/70">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="font-sans text-label-sm text-smoke hover:text-rosewood transition-colors uppercase tracking-wider"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <p className="font-sans text-body-sm text-smoke text-center mt-8">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-rosewood hover:underline">
          Create one
        </Link>
      </p>

      <div className="mt-6 pt-6 border-t border-bone/40 flex flex-col gap-2">
        <Link
          href="/wholesale/register"
          className="font-sans text-label-sm text-smoke hover:text-charcoal text-center uppercase tracking-wider transition-colors"
        >
          Apply for Wholesale Account →
        </Link>
        <Link
          href="/planner/register"
          className="font-sans text-label-sm text-smoke hover:text-charcoal text-center uppercase tracking-wider transition-colors"
        >
          Apply for Planner Portal →
        </Link>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left: decorative */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=90')" }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <Link href="/" className="mb-auto">
            <span className="font-serif text-2xl text-ivory">Petalique Flora</span>
          </Link>
          <blockquote className="font-serif text-display-md text-ivory leading-tight italic mb-4">
            &ldquo;Every petal tells your story.&rdquo;
          </blockquote>
          <p className="font-sans text-label-sm text-ivory/40 uppercase tracking-[0.2em]">
            Luxury Floral Design · GTA
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <Suspense fallback={<div className="w-full max-w-md animate-pulse space-y-4"><div className="h-8 bg-bone rounded" /><div className="h-12 bg-bone rounded" /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
