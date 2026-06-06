"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-lg w-full text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
        className="w-20 h-20 bg-champagne/15 flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle className="w-10 h-10 text-champagne" />
      </motion.div>

      <h1 className="font-serif text-display-xl text-charcoal mb-4">
        Order Confirmed
      </h1>
      {orderNumber && (
        <p className="font-mono text-label-md text-smoke mb-4 uppercase tracking-wider">
          {orderNumber}
        </p>
      )}
      <p className="font-sans text-body-md text-smoke leading-relaxed mb-10">
        Thank you for your order. A confirmation has been sent to your email. Our
        team will begin crafting your arrangement with care.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
        <div className="p-5 border border-bone/40 flex items-start gap-3">
          <Mail className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-sans text-body-sm font-medium text-charcoal mb-0.5">
              Confirmation Email
            </p>
            <p className="font-sans text-label-sm text-smoke">
              Check your inbox for order details and tracking.
            </p>
          </div>
        </div>
        <div className="p-5 border border-bone/40 flex items-start gap-3">
          <Package className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-sans text-body-sm font-medium text-charcoal mb-0.5">
              Crafted with Care
            </p>
            <p className="font-sans text-label-sm text-smoke">
              Your arrangement is made fresh on the delivery date.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/account" className="btn-outline">
          View My Orders
        </Link>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 pt-24">
      <Suspense fallback={<div className="w-20 h-20 animate-pulse bg-bone rounded-full mx-auto" />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
