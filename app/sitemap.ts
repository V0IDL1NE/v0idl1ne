import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const SITE_URL = "https://v0idl1ne.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
