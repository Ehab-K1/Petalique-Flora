import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/shop/ProductDetail";

// Mock product data (will be replaced by DB/Sanity)
const MOCK_PRODUCTS: Record<string, {
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
}> = {
  "ivory-elegance-bouquet": {
    id: "1",
    name: "Ivory Elegance Bouquet",
    slug: "ivory-elegance-bouquet",
    price: 185,
    comparePrice: 210,
    shortDesc: "A refined composition of white garden roses, ivory lisianthus, and trailing eucalyptus.",
    description: `The Ivory Elegance Bouquet is a masterclass in restraint and refinement. Built around garden-fresh white roses at full bloom, accented with delicate ivory lisianthus and cascading strands of silver eucalyptus, this arrangement embodies quiet luxury.

Each bouquet is assembled by hand on the day of delivery, ensuring the freshest possible arrangement arrives at your door.

Wrapped in our signature hand-torn parchment paper and tied with a hand-dyed silk ribbon in our signature Bone colourway.`,
    images: [
      "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=900&q=90",
      "https://images.unsplash.com/photo-1490750967868-88df5691cc71?w=900&q=90",
      "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=900&q=90",
    ],
    category: "Luxury Bouquets",
    tags: ["roses", "white", "luxury", "gift"],
    rating: 5,
    reviewCount: 42,
    inStock: true,
    isGiftable: true,
    requiresDeliveryDate: true,
    variants: [
      { id: "v1", name: "Standard (12 stems)", price: 185, options: { Size: "Standard" } },
      { id: "v2", name: "Grande (24 stems)", price: 295, options: { Size: "Grande" } },
      { id: "v3", name: "Petite (6 stems)", price: 95, options: { Size: "Petite" } },
    ],
    faqs: [
      {
        q: "How long will these flowers last?",
        a: "With proper care, your bouquet will remain beautiful for 5-7 days. We recommend trimming stems daily and keeping away from direct sunlight.",
      },
      {
        q: "Can I customise the colours?",
        a: "Absolutely. Contact us for bespoke colour requests. We accommodate special orders with 72 hours notice.",
      },
      {
        q: "Do you offer same-day delivery?",
        a: "Same-day delivery is available for orders placed before 11am within the GTA. Additional charges apply.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS[slug];
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [{ url: product.images[0], width: 1200, height: 900 }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS[slug];

  if (!product) notFound();

  return <ProductDetail product={product} />;
}

export function generateStaticParams() {
  return Object.keys(MOCK_PRODUCTS).map((slug) => ({ slug }));
}
