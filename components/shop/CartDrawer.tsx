"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import { SHIPPING_RATES, TAX_RATE } from "@/lib/constants";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  const shipping = subtotal >= SHIPPING_RATES.FREE_THRESHOLD ? 0 : SHIPPING_RATES.STANDARD;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-obsidian/40 z-50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-50 flex flex-col shadow-[−4px_0_32px_rgba(0,0,0,0.08)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-bone/40">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-charcoal/60" />
                <span className="font-sans text-label-md uppercase tracking-[0.15em] text-charcoal">
                  Your Selection
                </span>
                {items.length > 0 && (
                  <span className="font-sans text-label-sm text-smoke">
                    ({items.length} {items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-charcoal/50 hover:text-charcoal transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-bone/60 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-smoke" />
                  </div>
                  <p className="font-serif text-display-sm text-charcoal mb-2">
                    Your cart is empty
                  </p>
                  <p className="font-sans text-body-sm text-smoke mb-8">
                    Discover our curated floral collections
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-outline text-sm"
                  >
                    Browse Shop
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 flex-shrink-0 bg-bone/40 relative overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl">🌸</span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-sans text-body-sm font-medium text-charcoal leading-tight">
                                {item.name}
                              </p>
                              {item.options && Object.keys(item.options).length > 0 && (
                                <p className="font-sans text-label-sm text-smoke mt-0.5">
                                  {Object.entries(item.options)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(" · ")}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-smoke/60 hover:text-rosewood transition-colors flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Qty */}
                            <div className="flex items-center border border-bone/80">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-bone/40 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-sans text-body-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-bone/40 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="font-sans text-body-sm font-medium text-charcoal">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-bone/40 space-y-4">
                {/* Shipping notice */}
                {shipping > 0 && (
                  <div className="bg-bone/40 px-4 py-3">
                    <p className="font-sans text-label-sm text-charcoal/70 text-center">
                      Add {formatPrice(SHIPPING_RATES.FREE_THRESHOLD - subtotal)} more for{" "}
                      <span className="text-rosewood">free shipping</span>
                    </p>
                  </div>
                )}

                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between font-sans text-body-sm text-charcoal/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-sans text-body-sm text-charcoal/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-sans text-body-sm text-charcoal/70">
                    <span>Estimated HST (13%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="divider-gold my-2" />
                  <div className="flex justify-between font-sans text-body-md font-medium text-charcoal">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full flex items-center justify-center gap-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full font-sans text-label-sm text-smoke/70 hover:text-charcoal text-center uppercase tracking-widest transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
