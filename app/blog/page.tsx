import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Floral Journal — Petalique Flora",
  description: "Expert floral inspiration, wedding tips, and behind-the-scenes stories from the Petalique Flora atelier.",
};

const POSTS = [
  {
    slug: "south-asian-wedding-florals-guide",
    title: "A Complete Guide to South Asian Wedding Florals in the GTA",
    excerpt: "From mandap marigolds to modern rose cascades, we break down the floral traditions and modern interpretations for South Asian weddings in Toronto.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=90",
    category: "Weddings",
    date: "November 28, 2024",
    readTime: 8,
  },
  {
    slug: "winter-wedding-flowers-ontario",
    title: "Winter Wedding Flowers That Bloom in Ontario — Our Favourites",
    excerpt: "Planning a winter wedding in Ontario? Here are the most stunning cold-weather florals that photograph beautifully and hold up through the day.",
    image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=800&q=90",
    category: "Seasonal",
    date: "November 15, 2024",
    readTime: 6,
  },
  {
    slug: "how-to-choose-wedding-florist",
    title: "How to Choose a Wedding Florist in the GTA — 8 Questions to Ask",
    excerpt: "Finding the right wedding florist is one of the most important decisions of your planning journey. These are the questions every couple should ask.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=90",
    category: "Planning",
    date: "October 30, 2024",
    readTime: 5,
  },
  {
    slug: "mehndi-night-floral-decor",
    title: "Mehndi Night Floral Décor: How We Create the Perfect Vibe",
    excerpt: "Mehndi nights are colourful, joyful, and full of energy. Here's how we design florals that match the celebration's spirit while staying photogenic.",
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=90",
    category: "South Asian Weddings",
    date: "October 12, 2024",
    readTime: 7,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Header */}
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-16 border-b border-bone/40">
        <span className="section-tag">Floral Journal</span>
        <h1 className="font-serif text-display-xl text-charcoal">
          Stories from the Atelier
        </h1>
      </div>

      {/* Featured Post */}
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-12">
        <Link href={`/blog/${POSTS[0].slug}`} className="group grid lg:grid-cols-2 gap-8 mb-16">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={POSTS[0].image}
              alt={POSTS[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-label-sm text-champagne uppercase tracking-widest">{POSTS[0].category}</span>
              <span className="text-bone">·</span>
              <span className="font-sans text-label-sm text-smoke flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {POSTS[0].date}
              </span>
            </div>
            <h2 className="font-serif text-display-lg text-charcoal mb-4 group-hover:text-rosewood transition-colors">
              {POSTS[0].title}
            </h2>
            <p className="font-sans text-body-md text-smoke leading-relaxed mb-6">
              {POSTS[0].excerpt}
            </p>
            <div className="flex items-center gap-2 font-sans text-label-sm uppercase tracking-widest text-charcoal group-hover:text-rosewood transition-colors">
              Read Article <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.slice(1).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-sans text-label-sm text-champagne uppercase tracking-widest">{post.category}</span>
                <span className="font-sans text-label-sm text-smoke">{post.readTime} min read</span>
              </div>
              <h3 className="font-serif text-display-sm text-charcoal mb-2 group-hover:text-rosewood transition-colors">
                {post.title}
              </h3>
              <p className="font-sans text-body-sm text-smoke leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
