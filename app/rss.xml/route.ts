import { posts } from "@/lib/posts";

export const dynamic = "force-static";

const SITE_URL = "https://v0idl1ne.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = posts
    .map(post => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(post.excerpt)}</description>
    <category>${escapeXml(post.category)}</category>
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>V0IDL1NE — Public Record</title>
  <link>${SITE_URL}</link>
  <description>Practical knowledge that should be common. No credentials, no paywall, no bullshit.</description>
  <language>en-us</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
