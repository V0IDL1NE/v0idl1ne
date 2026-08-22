import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, categories, categorySlug, categoryFromSlug } from "@/lib/posts";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return categories.slice(1).map(c => ({ slug: categorySlug(c) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return {};

  const count = posts.filter(p => p.category === category).length;
  return {
    title: category,
    description: `${count} post${count !== 1 ? "s" : ""} on ${category.toLowerCase()} — practical knowledge that should be common. No credentials, no paywall, no bullshit.`,
  };
}

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
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    color: "#8800ff",
    letterSpacing: "0.2em",
    textDecoration: "none",
  },
  main: { padding: "2rem", maxWidth: "700px" },
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    color: "#8800ff",
    letterSpacing: "0.3em",
    marginBottom: "1rem",
  },
  title: {
    fontFamily: "var(--font-condensed)",
    fontSize: "3rem",
    fontWeight: 900,
    color: "#fff",
    textTransform: "uppercase" as const,
    lineHeight: 0.95,
    marginBottom: "0.5rem",
  },
  count: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    color: "#440088",
    letterSpacing: "0.15em",
    marginBottom: "2rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid rgba(136,0,255,0.15)",
  },
  postItem: { borderBottom: "1px solid rgba(136,0,255,0.08)", padding: "1.2rem 0", textDecoration: "none", display: "block" },
  postTitle: {
    fontFamily: "var(--font-condensed)", fontSize: "1.3rem", fontWeight: 700,
    color: "#e0d8f0", textTransform: "uppercase" as const, lineHeight: 1, marginBottom: "0.4rem",
  },
  postExcerpt: { fontSize: "0.78rem", color: "#4a4060", lineHeight: 1.5 },
  footerWrap: { marginTop: "4rem" },
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const categoryPosts = posts.filter(p => p.category === category);

  return (
    <>
      <header style={s.header}>
        <Logo />
        <Link href="/" style={s.backBtn}>← BACK TO V0IDL1NE</Link>
      </header>

      <main style={s.main}>
        <div style={s.eyebrow}>// CATEGORY</div>
        <h1 style={s.title}>{category}</h1>
        <div style={s.count}>{categoryPosts.length} POST{categoryPosts.length !== 1 ? "S" : ""}</div>

        {categoryPosts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={s.postItem}>
            <div style={s.postTitle}>{post.title}</div>
            <p style={s.postExcerpt}>{post.excerpt}</p>
          </Link>
        ))}
      </main>

      <div style={s.footerWrap}>
        <Footer />
      </div>
    </>
  );
}
