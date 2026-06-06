"use client";

import { useRouter, usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "bestsellers", label: "Best Sellers" },
];

const PRICE_RANGES = [
  { value: "0-100", label: "Under $100" },
  { value: "100-200", label: "$100 – $200" },
  { value: "200-500", label: "$200 – $500" },
  { value: "500-plus", label: "$500+" },
];

export function ShopFilters({ activeCategory }: { activeCategory?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-smoke mb-4">
          Collections
        </p>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setParam("category", "")}
              className={cn(
                "w-full text-left font-sans text-body-sm py-2 transition-colors",
                !activeCategory ? "text-charcoal font-medium" : "text-smoke hover:text-charcoal"
              )}
            >
              All Products
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => setParam("category", cat.slug)}
                className={cn(
                  "w-full text-left font-sans text-body-sm py-2 transition-colors",
                  activeCategory === cat.slug
                    ? "text-charcoal font-medium"
                    : "text-smoke hover:text-charcoal"
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider-gold" />

      {/* Price */}
      <div>
        <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-smoke mb-4">
          Price Range
        </p>
        <ul className="space-y-1">
          {PRICE_RANGES.map((range) => (
            <li key={range.value}>
              <label className="flex items-center gap-2.5 cursor-pointer py-1 group">
                <input
                  type="checkbox"
                  className="accent-charcoal w-3.5 h-3.5"
                />
                <span className="font-sans text-body-sm text-smoke group-hover:text-charcoal transition-colors">
                  {range.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider-gold" />

      {/* Filters */}
      <div>
        <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-smoke mb-4">
          Filter
        </p>
        <ul className="space-y-1">
          {[
            { value: "in-stock", label: "In Stock" },
            { value: "on-sale", label: "On Sale" },
            { value: "giftable", label: "Gift-Ready" },
            { value: "same-day", label: "Same Day Delivery" },
          ].map((f) => (
            <li key={f.value}>
              <label className="flex items-center gap-2.5 cursor-pointer py-1 group">
                <input
                  type="checkbox"
                  className="accent-charcoal w-3.5 h-3.5"
                />
                <span className="font-sans text-body-sm text-smoke group-hover:text-charcoal transition-colors">
                  {f.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
