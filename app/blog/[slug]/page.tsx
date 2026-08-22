import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";
import Logo from "@/components/Logo";
import PostActions from "@/components/PostActions";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
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
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  article: { padding: "2rem", maxWidth: "700px" },
  cat: {
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
    marginBottom: "1.5rem",
  },
  meta: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    color: "#440088",
    letterSpacing: "0.15em",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid rgba(136,0,255,0.15)",
  },
  footerWrap: { marginTop: "4rem" },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    url: `https://v0idl1ne.com/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "V0IDL1NE",
      url: "https://v0idl1ne.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://v0idl1ne.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
        <PostActions postTitle={post.title} postSlug={post.slug} />
        <RelatedPosts slug={post.slug} />
      </article>

      <div style={s.footerWrap}>
        <Footer />
      </div>
    </>
  );
}
