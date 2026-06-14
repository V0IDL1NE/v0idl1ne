"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";
import { posts, categories } from "@/lib/posts";

const s = {
  header: {
    borderBottom: "1px solid rgba(136,0,255,0.4)",
    padding: "1.2rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#000",
    position: "relative" as const,
    overflow: "hidden",
  },
  nav: { display: "flex", gap: "1.5rem" },
  navLink: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.7rem",
    color: "#6a5f80",
    textDecoration: "none",
    letterSpacing: "0.15em",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  hero: {
    padding: "5rem 2rem 3rem",
    position: "relative" as const,
    overflow: "hidden",
    borderBottom: "1px solid rgba(136,0,255,0.15)",
  },
  heroTag: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem",
    color: "#8800ff",
    letterSpacing: "0.3em",
    marginBottom: "1rem",
  },
  heroTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "4.5rem",
    fontWeight: 900,
    lineHeight: 0.9,
    color: "#fff",
    letterSpacing: "0.02em",
    marginBottom: "1.5rem",
    textTransform: "uppercase" as const,
  },
  heroDesc: {
    fontSize: "1rem",
    color: "#6a5f80",
    maxWidth: "500px",
    lineHeight: 1.6,
    fontWeight: 300,
  },
  cats: {
    padding: "1rem 2rem",
    borderBottom: "1px solid rgba(136,0,255,0.1)",
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap" as const,
  },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr" },
  mainCol: { borderRight: "1px solid rgba(136,0,255,0.1)", padding: "2rem" },
  sideCol: { padding: "1.5rem" },
  featured: {
    border: "1px solid rgba(136,0,255,0.25)",
    marginBottom: "2rem",
    cursor: "pointer",
    background: "rgba(136,0,255,0.02)",
    transition: "border-color 0.2s",
    textDecoration: "none",
    display: "block",
  },
  featInner: { padding: "1.5rem" },
  featTag: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    color: "#8800ff",
    letterSpacing: "0.25em",
    marginBottom: "0.8rem",
  },
  featTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "2.2rem",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
    marginBottom: "0.8rem",
    textTransform: "uppercase" as const,
  },
  featExcerpt: { fontSize: "0.85rem", color: "#6a5f80", lineHeight: 1.6, marginBottom: "1rem" },
  featMeta: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    color: "#440088",
    letterSpacing: "0.15em",
    display: "flex",
    gap: "1.5rem",
  },
  postItem: {
    borderBottom: "1px solid rgba(136,0,255,0.08)",
    padding: "1.2rem 0",
    textDecoration: "none",
    display: "block",
  },
  postCat: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    color: "#8800ff",
    letterSpacing: "0.2em",
    marginBottom: "0.4rem",
  },
  postTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#e0d8f0",
    textTransform: "uppercase" as const,
    lineHeight: 1,
    marginBottom: "0.4rem",
    transition: "color 0.2s",
  },
  postExcerpt: { fontSize: "0.78rem", color: "#4a4060", lineHeight: 1.5 },
  sideSection: { marginBottom: "2rem" },
  sideLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    color: "#440088",
    letterSpacing: "0.25em",
    borderBottom: "1px solid rgba(136,0,255,0.1)",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  sideItem: {
    padding: "0.7rem 0",
    borderBottom: "1px solid rgba(136,0,255,0.05)",
    textDecoration: "none",
    display: "block",
  },
  sideTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#c8bedd",
    textTransform: "uppercase" as const,
    transition: "color 0.2s",
  },
  sideMeta: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.58rem",
    color: "#440088",
    letterSpacing: "0.1em",
    marginTop: "2px",
  },
  signal: {
    background: "rgba(136,0,255,0.06)",
    border: "1px solid rgba(136,0,255,0.2)",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  signalLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    color: "#440088",
    letterSpacing: "0.2em",
    marginBottom: "0.6rem",
  },
  signalText: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem",
    color: "#6a5f80",
    lineHeight: 1.6,
    letterSpacing: "0.05em",
  },
  footer: {
    borderTop: "1px solid rgba(136,0,255,0.15)",
    padding: "1.5rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const featured = posts[0];
  const rest = posts.slice(1);
  const filtered = activeCategory === "ALL" ? rest : rest.filter(p => p.category === activeCategory);
  const recentSide = posts.slice(0, 3);

  const catCounts = categories.slice(1).map(cat => ({
    cat,
    count: posts.filter(p => p.category === cat).length,
  }));

  return (
    <>
      <header style={s.header}>
        <Logo />
        <nav style={s.nav}>
          {categories.slice(1).map(cat => (
            <span
              key={cat}
              style={s.navLink}
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={e => (e.currentTarget.style.color = "#aa44ff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6a5f80")}
            >
              {cat}
            </span>
          ))}
        </nav>
      </header>

      <section style={s.hero}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "300px", background: "radial-gradient(ellipse at 50% 100%,rgba(136,0,255,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={s.heroTag}>// PUBLIC RECORD — ISSUE 001</div>
        <h1 style={s.heroTitle}>
          The stuff<br />they never<br /><em style={{ color: "#8800ff", fontStyle: "normal" }}>taught you</em>
        </h1>
        <p style={s.heroDesc}>
          Practical knowledge that should be common. Electrical, legal, health, home — no credentials required, no paywall, no bullshit.
        </p>
      </section>

      <div style={s.cats}>
        {categories.map(cat => (
          <div
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              padding: "0.3rem 0.8rem",
              border: `1px solid ${activeCategory === cat ? "#8800ff" : "rgba(136,0,255,0.2)"}`,
              color: activeCategory === cat ? "#aa44ff" : "#6a5f80",
              cursor: "pointer",
              background: activeCategory === cat ? "rgba(136,0,255,0.05)" : "transparent",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </div>
        ))}
      </div>

      <div style={s.grid}>
        <div style={s.mainCol}>
          <Link
            href={`/blog/${featured.slug}`}
            style={s.featured}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#8800ff")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(136,0,255,0.25)")}
          >
            <div style={s.featInner}>
              <div style={s.featTag}>// {featured.category}</div>
              <div style={s.featTitle}>{featured.title}</div>
              <p style={s.featExcerpt}>{featured.excerpt}</p>
              <div style={s.featMeta}>
                <span>{featured.readTime}</span>
                {featured.tags.map(t => <span key={t}>{t}</span>)}
                <span>{featured.difficulty}</span>
              </div>
            </div>
          </Link>

          <div>
            {filtered.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={s.postItem}
                onMouseEnter={e => { (e.currentTarget.querySelector(".pt") as HTMLElement).style.color = "#aa44ff"; }}
                onMouseLeave={e => { (e.currentTarget.querySelector(".pt") as HTMLElement).style.color = "#e0d8f0"; }}
              >
                <div style={s.postCat}>// {post.category}</div>
                <div className="pt" style={s.postTitle}>{post.title}</div>
                <p style={s.postExcerpt}>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        <div style={s.sideCol}>
          <div style={s.signal}>
            <div style={s.signalLabel}>// SIGNAL</div>
            <p style={s.signalText}>
              This is not advice. This is <span style={{ color: "#8800ff" }}>information</span>. What you do with it is yours. No credentials, no agenda — just the stuff that should already be public knowledge.
            </p>
          </div>

          <div style={s.sideSection}>
            <div style={s.sideLabel}>// RECENT</div>
            {recentSide.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={s.sideItem}
                onMouseEnter={e => { (e.currentTarget.querySelector(".st") as HTMLElement).style.color = "#aa44ff"; }}
                onMouseLeave={e => { (e.currentTarget.querySelector(".st") as HTMLElement).style.color = "#c8bedd"; }}
              >
                <div className="st" style={s.sideTitle}>{post.title}</div>
                <div style={s.sideMeta}>{post.category} — {post.readTime}</div>
              </Link>
            ))}
          </div>

          <div style={s.sideSection}>
            <div style={s.sideLabel}>// CATEGORIES</div>
            {catCounts.map(({ cat, count }) => (
              <div
                key={cat}
                style={{ ...s.sideItem, cursor: "pointer" }}
                onClick={() => setActiveCategory(cat)}
              >
                <div style={s.sideTitle}>{cat}</div>
                <div style={s.sideMeta}>{count} POST{count !== 1 ? "S" : ""}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={s.footer}>
        <div style={s.footerLogo}>V0IDL1NE</div>
        <div style={s.footerCopy}>// NO CREDENTIALS. NO PAYWALL. NO BULLSHIT.</div>
      </footer>
    </>
  );
}
