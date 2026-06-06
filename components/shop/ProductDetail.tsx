"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Star,
  ChevronDown,
  Plus,
  Minus,
  Share2,
  Calendar,
} from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  shortDesc: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isGiftable: boolean;
  requiresDeliveryDate: boolean;
  variants: Array<{ id: string; name: string; price: number; options: Record<string, string> }>;
  faqs: Array<{ q: string; a: string }>;
}

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id || "");
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "reviews">("details");
  const { addItem } = useCart();

  const variant = product.variants.find((v) => v.id === selectedVariant);
  const price = variant?.price ?? product.price;

  const handleAddToCart = () => {
    addItem({
      id: uuidv4(),
      productId: product.id,
      variantId: selectedVariant || undefined,
      name: product.name + (variant ? ` — ${variant.name}` : ""),
      slug: product.slug,
      price,
      quantity: qty,
      image: product.images[0],
      options: variant?.options,
      deliveryDate: deliveryDate || undefined,
      giftMessage: giftMessage || undefined,
    });
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10">
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/shop/${product.category.toLowerCase().replace(" ", "-")}` },
            { label: product.name, href: "#" },
          ].map((item, i, arr) => (
            <span key={item.label} className="flex items-center gap-2">
              {i < arr.length - 1 ? (
                <Link
                  href={item.href}
                  className="font-sans text-label-sm text-smoke hover:text-charcoal transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-sans text-label-sm text-charcoal uppercase tracking-wider">
                  {item.label}
                </span>
              )}
              {i < arr.length - 1 && (
                <span className="text-smoke/40">/</span>
              )}
            </span>
          ))}
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden bg-bone/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-ivory/80 backdrop-blur-sm px-3 py-1.5">
                <span className="font-sans text-label-sm text-charcoal/60">Hover to zoom</span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square overflow-hidden transition-all duration-200 ${
                      i === activeImage ? "ring-2 ring-charcoal" : "ring-1 ring-bone/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Category & Title */}
            <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-display-lg text-charcoal mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
                ))}
              </div>
              <span className="font-sans text-body-sm text-smoke">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl text-charcoal">{formatPrice(price)}</span>
              {product.comparePrice && (
                <span className="font-sans text-body-md text-smoke line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {product.comparePrice && (
                <span className="font-sans text-label-sm bg-rosewood/10 text-rosewood px-2 py-0.5 uppercase tracking-wider">
                  Save {formatPrice(product.comparePrice - price)}
                </span>
              )}
            </div>

            <p className="font-sans text-body-md text-charcoal/70 leading-relaxed mb-8">
              {product.shortDesc}
            </p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <p className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-3">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-4 py-2 font-sans text-body-sm border transition-all duration-200 ${
                        selectedVariant === v.id
                          ? "border-charcoal bg-charcoal text-ivory"
                          : "border-bone/60 text-charcoal hover:border-charcoal/40"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Date */}
            {product.requiresDeliveryDate && (
              <div className="mb-6">
                <label className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-3 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Delivery Date
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                  className="w-full border border-bone/60 px-4 py-3 font-sans text-body-sm text-charcoal bg-transparent focus:outline-none focus:border-charcoal/40 transition-colors"
                />
              </div>
            )}

            {/* Gift Message */}
            {product.isGiftable && (
              <div className="mb-6">
                <label className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-3 block">
                  Gift Message (Optional)
                </label>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  rows={2}
                  placeholder="A personalised message for your recipient..."
                  className="w-full border border-bone/60 px-4 py-3 font-sans text-body-sm text-charcoal placeholder:text-smoke/50 bg-transparent focus:outline-none focus:border-charcoal/40 transition-colors resize-none"
                />
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-bone/60">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-bone/30 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-10 text-center font-sans text-body-md">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-12 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-bone/30 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-3 bg-charcoal text-ivory font-sans text-label-md uppercase tracking-widest py-3 hover:bg-rosewood transition-colors duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-12 h-12 flex items-center justify-center border border-bone/60 text-charcoal/60 hover:text-rosewood hover:border-rosewood/40 transition-all"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? "fill-rosewood text-rosewood" : ""}`}
                />
              </button>
            </div>

            {/* Shipping perks */}
            <div className="border border-bone/40 p-4 space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-sans text-body-sm font-medium text-charcoal">
                    Free delivery over $150
                  </p>
                  <p className="font-sans text-label-sm text-smoke">
                    GTA-wide. Same-day available before 11am.
                  </p>
                </div>
              </div>
              <div className="divider-gold" />
              <div className="flex items-start gap-3">
                <RotateCcw className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-sans text-body-sm font-medium text-charcoal">
                    Satisfaction Guarantee
                  </p>
                  <p className="font-sans text-label-sm text-smoke">
                    Not happy? We&apos;ll make it right within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-bone/40 mb-6">
                {(["details", "care", "reviews"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-sans text-label-sm uppercase tracking-widest pb-3 mr-6 border-b-2 transition-all duration-200 ${
                      activeTab === tab
                        ? "border-charcoal text-charcoal"
                        : "border-transparent text-smoke hover:text-charcoal"
                    }`}
                  >
                    {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === "details" && (
                    <div className="prose-luxury text-charcoal/70 leading-relaxed text-body-md space-y-4 font-sans">
                      {product.description.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}

                      <div className="mt-6 space-y-3">
                        <h4 className="font-sans text-label-sm uppercase tracking-widest text-smoke">
                          Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-sans text-label-sm bg-bone/60 text-charcoal/70 px-3 py-1 uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "care" && (
                    <ul className="space-y-4 font-sans text-body-sm text-charcoal/70">
                      {[
                        "Trim stems at a 45° angle before placing in water",
                        "Change water every 2 days",
                        "Keep away from direct sunlight and heat sources",
                        "Avoid placing near fruits which emit ethylene gas",
                        "Remove any leaves below the waterline to prevent bacteria",
                      ].map((tip) => (
                        <li key={tip} className="flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-champagne mt-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === "reviews" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-6 p-4 bg-bone/30">
                        <div className="text-center">
                          <p className="font-serif text-5xl text-charcoal">{product.rating}.0</p>
                          <div className="flex gap-1 justify-center mt-1">
                            {Array.from({ length: product.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-champagne text-champagne" />
                            ))}
                          </div>
                          <p className="font-sans text-label-sm text-smoke mt-1">
                            {product.reviewCount} reviews
                          </p>
                        </div>
                      </div>
                      <p className="font-sans text-body-sm text-smoke text-center">
                        Reviews coming soon. Be the first to share your experience.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* FAQs */}
              {activeTab === "details" && product.faqs.length > 0 && (
                <div className="mt-8 border-t border-bone/40 pt-8">
                  <h4 className="font-sans text-label-sm uppercase tracking-widest text-smoke mb-4">
                    FAQs
                  </h4>
                  <div className="space-y-2">
                    {product.faqs.map((faq, i) => (
                      <div key={i} className="border border-bone/40">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className="font-sans text-body-sm font-medium text-charcoal">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-smoke transition-transform ${
                              openFaq === i ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-4 font-sans text-body-sm text-charcoal/70 leading-relaxed">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
