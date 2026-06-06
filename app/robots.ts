import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://petaliqueflora.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/account", "/wholesale/dashboard", "/planner/dashboard"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
