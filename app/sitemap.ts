import type { MetadataRoute } from "next";
import { posts, categories, categorySlug } from "@/lib/posts";
import { allExtras } from "@/lib/extras";

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

  const categoryRoutes: MetadataRoute.Sitemap = categories.slice(1).map(cat => ({
    url: `${SITE_URL}/category/${categorySlug(cat)}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const hubRoutes: MetadataRoute.Sitemap = ["/tools", "/guides", "/printables"].map(path => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const extraRoutes: MetadataRoute.Sitemap = allExtras.map(extra => ({
    url: `${SITE_URL}${extra.href}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...hubRoutes, ...extraRoutes, ...categoryRoutes, ...postRoutes];
}
