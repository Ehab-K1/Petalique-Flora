"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Ivory Elegance Bouquet",
    slug: "ivory-elegance-bouquet",
    price: 185,
    comparePrice: 210,
    image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=600&q=90",
    category: "luxury-bouquets",
    rating: 5,
    reviewCount: 42,
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Rose Garden Collection",
    slug: "rose-garden-collection",
    price: 145,
    image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&q=90",
    category: "luxury-bouquets",
    rating: 5,
    reviewCount: 67,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Blush Bridal Cascade",
    slug: "blush-bridal-cascade",
    price: 295,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=90",
    category: "bridal-bouquets",
    rating: 5,
    reviewCount: 28,
    inStock: true,
  },
  {
    id: "4",
    name: "Champagne Dreams",
    slug: "champagne-dreams",
    price: 165,
    comparePrice: 195,
    image: "https://images.unsplash.com/photo-1490750967868-88df5691cc71?w=600&q=90",
    category: "bridal-bouquets",
    rating: 4,
    reviewCount: 19,
    inStock: true,
  },
  {
    id: "5",
    name: "Garden Party Gift Box",
    slug: "garden-party-gift-box",
    price: 120,
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=600&q=90",
    category: "gift-collections",
    rating: 5,
    reviewCount: 34,
    inStock: true,
  },
  {
    id: "6",
    name: "Corporate Desk Arrangement",
    slug: "corporate-desk-arrangement",
    price: 85,
    image: "https://images.unsplash.com/photo-1487530811015-780f298a8aa8?w=600&q=90",
    category: "corporate-gifts",
    rating: 5,
    reviewCount: 21,
    inStock: true,
  },
  {
    id: "7",
    name: "Pampas & Protea Arch",
    slug: "pampas-protea-arch",
    price: 890,
    image: "https://images.unsplash.com/photo-1491677533189-49af044391ed?w=600&q=90",
    category: "wedding-packages",
    rating: 5,
    reviewCount: 8,
    inStock: false,
  },
  {
    id: "8",
    name: "Autumn Harvest Bouquet",
    slug: "autumn-harvest-bouquet",
    price: 135,
    image: "https://images.unsplash.com/photo-1462530260150-162092dbf011?w=600&q=90",
    category: "seasonal-collections",
    rating: 5,
    reviewCount: 15,
    isNew: true,
    inStock: true,
  },
];

export function ShopGrid({
  category,
  sort,
  filter,
}: {
  category?: string;
  sort?: string;
  filter?: string;
}) {
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  let products = ALL_PRODUCTS;
  if (category) {
    products = products.filter((p) => p.category === category);
  }
  if (filter === "same-day") {
    products = products.filter((p) => p.inStock);
  }

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-sans text-body-sm text-smoke">
          {products.length} products
        </p>
        <select className="font-sans text-body-sm text-charcoal bg-transparent border border-bone/60 px-3 py-2 focus:outline-none focus:border-charcoal/40">
          <option>Featured</option>
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Best Sellers</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={`/product/${product.slug}`}>
              <div className="relative aspect-[3/4] overflow-hidden bg-bone/30 mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="font-sans text-[10px] bg-ivory text-charcoal px-2 py-0.5 uppercase tracking-widest">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="font-sans text-[10px] bg-champagne text-ivory px-2 py-0.5 uppercase tracking-widest">
                      Best Seller
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="font-sans text-[10px] bg-charcoal/70 text-ivory px-2 py-0.5 uppercase tracking-widest">
                      Sold Out
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const next = new Set(wishlist);
                    next.has(product.id) ? next.delete(product.id) : next.add(product.id);
                    setWishlist(next);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 bg-ivory/90 flex items-center justify-center transition-all duration-300 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      wishlist.has(product.id)
                        ? "fill-rosewood text-rosewood"
                        : "text-charcoal"
                    }`}
                  />
                </button>

                {/* Quick Add */}
                {product.inStock && (
                  <motion.div
                    initial={false}
                    animate={{
                      y: hoveredId === product.id ? 0 : 16,
                      opacity: hoveredId === product.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-0 left-0 right-0 p-2"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          id: uuidv4(),
                          productId: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          quantity: 1,
                          image: product.image,
                        });
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-charcoal/90 text-ivory font-sans text-[10px] uppercase tracking-widest py-2.5 hover:bg-charcoal backdrop-blur-sm transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Quick Add
                    </button>
                  </motion.div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: product.rating }).map((_, j) => (
                    <Star key={j} className="w-2.5 h-2.5 fill-champagne text-champagne" />
                  ))}
                  <span className="font-sans text-[10px] text-smoke ml-1">
                    ({product.reviewCount})
                  </span>
                </div>
                <h3 className="font-sans text-body-sm font-medium text-charcoal mb-1 group-hover:text-rosewood transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-body-sm text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="font-sans text-label-sm text-smoke line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
