"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { formatPrice } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Ivory Elegance Bouquet",
    slug: "ivory-elegance-bouquet",
    price: 185,
    comparePrice: 210,
    image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=600&q=90",
    category: "Luxury Bouquets",
    isNew: true,
  },
  {
    id: "2",
    name: "Rose Garden Collection",
    slug: "rose-garden-collection",
    price: 145,
    comparePrice: null,
    image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&q=90",
    category: "Seasonal",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Pampas & Protea Arch",
    slug: "pampas-protea-arch",
    price: 890,
    comparePrice: null,
    image: "https://images.unsplash.com/photo-1491677533189-49af044391ed?w=600&q=90",
    category: "Wedding Arch",
    isFeatured: true,
  },
  {
    id: "4",
    name: "Champagne Dreams",
    slug: "champagne-dreams",
    price: 165,
    comparePrice: 195,
    image: "https://images.unsplash.com/photo-1490750967868-88df5691cc71?w=600&q=90",
    category: "Bridal",
    isNew: false,
  },
];

function ProductCard({ product }: { product: (typeof FEATURED_PRODUCTS)[number] }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-bone/30 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="font-sans text-label-sm bg-ivory text-charcoal px-2 py-0.5 uppercase tracking-widest">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="font-sans text-label-sm bg-champagne text-ivory px-2 py-0.5 uppercase tracking-widest">
                Best Seller
              </span>
            )}
            {product.comparePrice && (
              <span className="font-sans text-label-sm bg-rosewood text-ivory px-2 py-0.5 uppercase tracking-widest">
                Sale
              </span>
            )}
          </div>

          {/* Actions */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="w-9 h-9 bg-ivory/90 flex items-center justify-center hover:bg-ivory transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? "fill-rosewood text-rosewood" : "text-charcoal"
                }`}
              />
            </button>
          </div>

          {/* Quick add */}
          <motion.div
            initial={false}
            animate={{ y: isHovered ? 0 : 16, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-3"
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-charcoal/90 text-ivory font-sans text-label-sm uppercase tracking-widest py-3 hover:bg-charcoal transition-colors backdrop-blur-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Quick Add
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div>
          <p className="font-sans text-label-sm text-smoke uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-serif text-display-sm text-charcoal mb-2 group-hover:text-rosewood transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-sans text-body-md text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="font-sans text-body-sm text-smoke line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SignatureCollection() {
  return (
    <section className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="section-tag">Featured</span>
            <h2 className="font-serif text-display-lg text-charcoal">
              Signature Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-label-sm uppercase tracking-widest text-charcoal/60 hover:text-charcoal transition-colors group"
          >
            View All Products
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
