"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Weddings",
    subtitle: "Bridal · Ceremony · Reception",
    href: "/weddings",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=90",
    span: "lg:col-span-2 lg:row-span-2",
    size: "large",
  },
  {
    title: "Events",
    subtitle: "Corporate · Private · Seasonal",
    href: "/events",
    image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=700&q=90",
    span: "lg:col-span-1",
    size: "medium",
  },
  {
    title: "Corporate",
    subtitle: "Offices · Hotels · Lobbies",
    href: "/events/corporate",
    image: "https://images.unsplash.com/photo-1487530811015-780f298a8aa8?w=700&q=90",
    span: "lg:col-span-1",
    size: "medium",
  },
  {
    title: "Gifting",
    subtitle: "Bouquets · Boxes · Subscriptions",
    href: "/shop/gift-collections",
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=700&q=90",
    span: "lg:col-span-1",
    size: "medium",
  },
  {
    title: "Wholesale",
    subtitle: "Trade Accounts · Bulk Orders",
    href: "/wholesale",
    image: "https://images.unsplash.com/photo-1462530260150-162092dbf011?w=700&q=90",
    span: "lg:col-span-2",
    size: "wide",
  },
];

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group overflow-hidden ${cat.span}`}
    >
      <Link href={cat.href} className="block h-full">
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            cat.size === "large"
              ? "h-[560px] lg:h-full"
              : cat.size === "wide"
              ? "h-[280px]"
              : "h-[280px]"
          }`}
        >
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/10 to-transparent" />
        </div>

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-1">
            {cat.subtitle}
          </p>
          <div className="flex items-end justify-between">
            <h3
              className={`font-serif text-ivory leading-none ${
                cat.size === "large" ? "text-display-lg" : "text-display-sm"
              }`}
            >
              {cat.title}
            </h3>
            <div className="flex items-center justify-center w-10 h-10 border border-ivory/30 text-ivory opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-ivory/60 group-hover:bg-ivory/10">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryGrid() {
  return (
    <section className="py-24 lg:py-32 bg-parchment">
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="section-tag">Explore</span>
            <h2 className="font-serif text-display-lg text-charcoal">
              What We Create
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-label-sm uppercase tracking-widest text-charcoal/60 hover:text-charcoal transition-colors group"
          >
            View All
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:auto-rows-[280px]">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
