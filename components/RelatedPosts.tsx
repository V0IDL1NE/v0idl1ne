import Link from "next/link";
import { posts, type Post } from "@/lib/posts";

const s = {
  wrap: { marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(136,0,255,0.15)" },
  label: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem",
    color: "#440088",
    letterSpacing: "0.25em",
    marginBottom: "1rem",
  },
  item: {
    display: "block",
    padding: "0.9rem 0",
    borderBottom: "1px solid rgba(136,0,255,0.08)",
    textDecoration: "none",
  },
  cat: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    color: "#8800ff",
    letterSpacing: "0.2em",
    marginBottom: "0.3rem",
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#c8bedd",
    textTransform: "uppercase" as const,
  },
};

function scoreRelated(current: Post, candidate: Post): number {
  let score = 0;
  if (candidate.category === current.category) score += 2;
  score += candidate.tags.filter(t => current.tags.includes(t)).length;
  return score;
}

export default function RelatedPosts({ slug }: { slug: string }) {
  const current = posts.find(p => p.slug === slug);
  if (!current) return null;

  const related = posts
    .filter(p => p.slug !== slug)
    .map(p => ({ post: p, score: scoreRelated(current, p) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ post }) => post);

  if (related.length === 0) return null;

  return (
    <div style={s.wrap}>
      <div style={s.label}>// KEEP READING</div>
      {related.map(post => (
        <Link key={post.slug} href={`/blog/${post.slug}`} style={s.item}>
          <div style={s.cat}>// {post.category}</div>
          <div style={s.title}>{post.title}</div>
        </Link>
      ))}
    </div>
  );
}
