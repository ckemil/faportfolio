import type { MetadataRoute } from "next";
import { projects, SITE_URL } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/playground`, changeFrequency: "monthly", priority: 0.6 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/portfolio/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
