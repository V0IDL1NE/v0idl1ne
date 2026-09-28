import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import type { Extra } from "@/lib/extras";
import PageShell from "@/components/PageShell";
import ShareBar from "@/components/ShareBar";

const INDEX: Record<Extra["kind"], { href: string; label: string }> = {
  TOOL: { href: "/tools", label: "TOOLS" },
  GUIDE: { href: "/guides", label: "SITUATION GUIDES" },
  PRINTABLE: { href: "/printables", label: "PRINTABLES" },
};

export function extraMetadata(extra: Extra): Metadata {
  return {
    title: extra.seoTitle,
    description: extra.description,
    alternates: { canonical: extra.href },
    openGraph: { title: extra.title, description: extra.description, url: extra.href, type: "website" },
    twitter: { card: "summary_large_image", title: extra.title, description: extra.description },
  };
}

const s = {
  item: { display: "block", padding: "0.9rem 0", borderBottom: "1px solid rgba(136,0,255,0.08)", textDecoration: "none" },
  cat: { fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#8800ff", letterSpacing: "0.2em", marginBottom: "0.3rem" },
  title: { fontFamily: "var(--font-condensed)", fontSize: "1.1rem", fontWeight: 700, color: "#c8bedd", textTransform: "uppercase" as const },
};

/* Page frame for a single tool / guide / printable: title, body, share card, and the posts behind it. */
export default function ExtraPage({ extra, children }: { extra: Extra; children: React.ReactNode }) {
  const index = INDEX[extra.kind];
  const related = extra.relatedPosts
    .map(slug => posts.find(p => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <PageShell eyebrow={index.label} eyebrowHref={index.href} title={extra.title} intro={extra.description}>
      {children}

      <ShareBar title={extra.title} tip={extra.description} path={extra.href} label="// SEND THIS TO SOMEONE WHO NEEDS IT" />

      {related.length > 0 && (
        <div className="no-print">
          <div className="section-label">{"// THE FULL BREAKDOWN"}</div>
          {related.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={s.item}>
              <div style={s.cat}>{"// "}{p.category}</div>
              <div style={s.title}>{p.title}</div>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}
