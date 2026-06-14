import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";
import Logo from "@/components/Logo";
import PostActions from "@/components/PostActions";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export const dynamicParams = false;

const s = {
  header: {
    borderBottom: "1px solid rgba(136,0,255,0.4)",
    padding: "1.2rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#000",
  },
  backBtn: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem",
    color: "#8800ff",
    letterSpacing: "0.2em",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  article: { padding: "2rem", maxWidth: "700px" },
  cat: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem",
    color: "#8800ff",
    letterSpacing: "0.3em",
    marginBottom: "1rem",
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "3rem",
    fontWeight: 900,
    color: "#fff",
    textTransform: "uppercase" as const,
    lineHeight: 0.95,
    marginBottom: "1.5rem",
  },
  meta: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    color: "#440088",
    letterSpacing: "0.15em",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid rgba(136,0,255,0.15)",
  },
  footer: {
    borderTop: "1px solid rgba(136,0,255,0.15)",
    padding: "1.5rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4rem",
  },
  footerLogo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "1rem",
    fontWeight: 900,
    letterSpacing: "0.2em",
    color: "#440088",
  },
  footerCopy: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.58rem",
    color: "#332844",
    letterSpacing: "0.15em",
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <>
      <header style={s.header}>
        <Logo />
        <Link href="/" style={s.backBtn}>← BACK TO V0IDL1NE</Link>
      </header>

      <article style={s.article}>
        <div style={s.cat}>// {post.category}</div>
        <h1 style={s.title}>{post.title}</h1>
        <div style={s.meta}>
          {post.readTime} — {post.tags.join(" — ")} — {post.difficulty}
        </div>
        <div className="pv-body">
          <Content />
        </div>
        <PostActions />
      </article>

      <footer style={s.footer}>
        <div style={s.footerLogo}>V0IDL1NE</div>
        <div style={s.footerCopy}>// NO CREDENTIALS. NO PAYWALL. NO BULLSHIT.</div>
      </footer>
    </>
  );
}
