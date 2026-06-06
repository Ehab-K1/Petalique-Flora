import type { MetadataRoute } from "next";
import { LOCATIONS, CATEGORIES } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://petaliqueflora.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/weddings`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${BASE_URL}/events`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/wholesale`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/weddings/bridal-bouquets`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/weddings/arches`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/weddings/mandap`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/weddings/walima`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${BASE_URL}/weddings/mehndi`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${BASE_URL}/weddings/packages`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  const locationPages = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/shop/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...locationPages, ...categoryPages];
}
