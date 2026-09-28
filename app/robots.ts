import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/test", "/design", "/v0id", "/crypt"],
    },
    sitemap: "https://v0idl1ne.com/sitemap.xml",
  };
}
