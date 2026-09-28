import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    viewTransition: true,
  },
  // Private pages: keep them out of search results even if someone links to them.
  async headers() {
    return ["/test/:path*", "/test", "/design", "/v0id", "/crypt"].map(source => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter", "remark-mdx-frontmatter"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
