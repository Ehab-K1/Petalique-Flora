import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";

export const metadata: Metadata = {
  title: "Shop — Luxury Floral Collections",
  description:
    "Browse our curated collection of luxury bouquets, bridal arrangements, gift sets, and seasonal florals. Free delivery on orders over $150.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; filter?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Header */}
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-12 border-b border-bone/40">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="section-tag">Our Collections</span>
            <h1 className="font-serif text-display-xl text-charcoal">Shop</h1>
          </div>
          <p className="font-sans text-body-sm text-smoke max-w-sm">
            Every arrangement crafted by hand. Locally sourced where possible.
            Delivered with care.
          </p>
        </div>
      </div>

      {/* Shop Layout */}
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-56 flex-shrink-0">
            <ShopFilters activeCategory={params.category} />
          </aside>
          <main className="flex-1">
            <ShopGrid
              category={params.category}
              sort={params.sort}
              filter={params.filter}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
