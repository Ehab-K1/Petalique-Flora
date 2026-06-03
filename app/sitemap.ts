import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://petalique.com';
  const now = new Date();
  const fixed: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/bouquets', priority: 0.9 },
    { path: '/build', priority: 0.85 },
    { path: '/quiz', priority: 0.75 },
    { path: '/subscriptions', priority: 0.85 },
    { path: '/corporate', priority: 0.85 },
    { path: '/wholesale', priority: 0.75 },
    { path: '/weddings', priority: 0.9 },
    { path: '/about', priority: 0.6 },
    { path: '/track', priority: 0.3 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
  ];
  return [
    ...fixed.map(({ path, priority }) => ({
      url: `${base}${path}`,
      lastModified: now,
      priority,
      changeFrequency: 'weekly' as const,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${base}/bouquets/${p.slug}`,
      lastModified: now,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    })),
  ];
}
