import { ImageResponse } from "next/og";
import { posts } from "@/lib/posts";

export const alt = "V0IDL1NE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            display: "flex",
            background: "linear-gradient(90deg, #8800ff, #ff0088)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#8800ff",
            marginTop: 20,
          }}
        >
          {post ? `// ${post.category}` : "// V0IDL1NE"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#ffffff",
            maxWidth: 1000,
          }}
        >
          {post ? post.title : "V0IDL1NE"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 4,
            color: "#440088",
          }}
        >
          V0IDL1NE
        </div>
      </div>
    ),
    { ...size }
  );
}
