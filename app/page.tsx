"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { posts, categories } from "@/lib/posts";

/* ── Inline SVG triangle (reused in splash + nav) ── */
function Triangle({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size * 1.1}>
      <line x1="20" y1="44" x2="0" y2="4" stroke="#8800ff" strokeWidth="1.5" />
      <line x1="20" y1="44" x2="40" y2="4" stroke="#8800ff" strokeWidth="1.5" />
      <line x1="0" y1="4" x2="40" y2="4" stroke="#8800ff" strokeWidth="1.5" />
      <line x1="20" y1="4" x2="20" y2="44" stroke="#6600cc" strokeWidth="1" />
      <line x1="5" y1="19" x2="35" y2="19" stroke="#6600cc" strokeWidth="1" />
    </svg>
  );
}

/* ── Modals ── */
type ModalType = "submit" | "report" | null;

function Modals({ open, onClose }: { open: ModalType; onClose: () => void }) {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    if (!open) { setSubmitSuccess(false); setReportSuccess(false); }
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("modal-overlay")) onClose();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onClose]);

  function submitReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setReportSuccess(true);
  }

  function submitInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitSuccess(true);
  }

  return (
    <>
      {/* REPORT MODAL */}
      <div className={`modal-overlay${open === "report" ? " open" : ""}`}>
        <div className="modal-box">
          <span className="modal-close" onClick={onClose}>[ CLOSE ]</span>
          {reportSuccess ? (
            <div className="modal-success">
              <div className="modal-success-icon">▽</div>
              <div className="modal-success-text">FLAG RECEIVED<br /><br />This post has been flagged for review.<br />Once email is connected it'll land in the queue.</div>
            </div>
          ) : (
            <form onSubmit={submitReport}>
              <div className="modal-title">Report Inaccuracy</div>
              <div className="modal-sub">// FLAG THIS POST FOR REVIEW</div>
              <label className="modal-label">WHAT'S WRONG</label>
              <textarea className="modal-textarea" placeholder="Describe the inaccuracy or what needs to be corrected..." required />
              <label className="modal-label">YOUR SOURCE (optional)</label>
              <input className="modal-input" type="text" placeholder="Link or reference supporting your correction" />
              <div className="modal-actions">
                <button type="submit" className="modal-submit">SUBMIT FLAG</button>
                <button type="button" className="modal-cancel" onClick={onClose}>CANCEL</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* SUBMIT MODAL */}
      <div className={`modal-overlay${open === "submit" ? " open" : ""}`}>
        <div className="modal-box">
          <span className="modal-close" onClick={onClose}>[ CLOSE ]</span>
          {submitSuccess ? (
            <div className="modal-success">
              <div className="modal-success-icon">▽</div>
              <div className="modal-success-text">SUBMISSION RECEIVED<br /><br />If it checks out it gets published.<br />Once email is connected it'll land in the queue.</div>
            </div>
          ) : (
            <form onSubmit={submitInfo}>
              <div className="modal-title">Submit Information</div>
              <div className="modal-sub">// KNOWLEDGE THEY FORGOT TO GIVE YOU</div>
              <label className="modal-label">CATEGORY</label>
              <select className="modal-select" defaultValue="">
                <option value="" disabled>SELECT A CATEGORY</option>
                {["ELECTRICAL","LEGAL","HEALTH","HOME","FINANCE","OTHER"].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <label className="modal-label">TITLE / TOPIC</label>
              <input className="modal-input" type="text" placeholder="What's the knowledge?" required />
              <label className="modal-label">THE INFORMATION</label>
              <textarea className="modal-textarea" style={{ minHeight: 130 }} placeholder="Write it out. Be specific. Include why most people don't know this." required />
              <label className="modal-label">YOUR SOURCE (optional)</label>
              <input className="modal-input" type="text" placeholder="Link, code, law number, anything that backs it up" />
              <div className="modal-actions">
                <button type="submit" className="modal-submit">SUBMIT</button>
                <button type="button" className="modal-cancel" onClick={onClose}>CANCEL</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Styles ── */
const s = {
  /* nav */
  navLogo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" as const },
  navName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.15em",
    color: "#fff", textShadow: "0 0 20px #8800ff",
  },
  navLinks: { display: "flex", gap: "1.5rem" },
  navLink: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem", color: "#6a5f80",
    textDecoration: "none", letterSpacing: "0.15em",
    cursor: "pointer" as const, transition: "color 0.2s",
    background: "none", border: "none", padding: 0,
  },
  /* splash */
  splashLogo: { display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "1.5rem", zIndex: 1 },
  splashName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "5rem", fontWeight: 900, letterSpacing: "0.2em",
    color: "#fff", textShadow: "0 0 60px rgba(136,0,255,0.8), 0 0 120px rgba(136,0,255,0.3)",
    lineHeight: 1,
  },
  splashSub: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.7rem", color: "#6a5f80", letterSpacing: "0.35em", textAlign: "center" as const,
  },
  /* content */
  cats: {
    padding: "1rem 2rem", borderBottom: "1px solid rgba(136,0,255,0.1)",
    display: "flex", gap: "0.5rem", flexWrap: "wrap" as const, background: "#000",
  },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr" },
  mainCol: { borderRight: "1px solid rgba(136,0,255,0.1)", padding: "2rem" },
  sideCol: { padding: "1.5rem" },
  featured: {
    border: "1px solid rgba(136,0,255,0.25)", marginBottom: "2rem",
    cursor: "pointer" as const, background: "rgba(136,0,255,0.02)",
    transition: "border-color 0.2s", textDecoration: "none", display: "block",
  },
  featInner: { padding: "1.5rem" },
  featTag: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#8800ff", letterSpacing: "0.25em", marginBottom: "0.8rem" },
  featTitle: {
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2.2rem", fontWeight: 900,
    color: "#fff", lineHeight: 1, marginBottom: "0.8rem", textTransform: "uppercase" as const,
  },
  featExcerpt: { fontSize: "0.85rem", color: "#6a5f80", lineHeight: 1.6, marginBottom: "1rem" },
  featMeta: {
    fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem",
    color: "#440088", letterSpacing: "0.15em", display: "flex", gap: "1.5rem",
  },
  postItem: { borderBottom: "1px solid rgba(136,0,255,0.08)", padding: "1.2rem 0", textDecoration: "none", display: "block" },
  postCat: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#8800ff", letterSpacing: "0.2em", marginBottom: "0.4rem" },
  postTitle: {
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.3rem", fontWeight: 700,
    color: "#e0d8f0", textTransform: "uppercase" as const, lineHeight: 1, marginBottom: "0.4rem", transition: "color 0.2s",
  },
  postExcerpt: { fontSize: "0.78rem", color: "#4a4060", lineHeight: 1.5 },
  sideSection: { marginBottom: "2rem" },
  sideLabel: {
    fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#440088",
    letterSpacing: "0.25em", borderBottom: "1px solid rgba(136,0,255,0.1)",
    paddingBottom: "0.5rem", marginBottom: "1rem",
  },
  sideItem: { padding: "0.7rem 0", borderBottom: "1px solid rgba(136,0,255,0.05)", textDecoration: "none", display: "block" },
  sideTitle: {
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700,
    color: "#c8bedd", textTransform: "uppercase" as const, transition: "color 0.2s",
  },
  sideMeta: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "#440088", letterSpacing: "0.1em", marginTop: 2 },
  signal: { background: "rgba(136,0,255,0.06)", border: "1px solid rgba(136,0,255,0.2)", padding: "1rem", marginBottom: "1.5rem" },
  signalLabel: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#440088", letterSpacing: "0.2em", marginBottom: "0.6rem" },
  signalText: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#6a5f80", lineHeight: 1.6, letterSpacing: "0.05em" },
  submitBlock: {
    border: "1px solid rgba(136,0,255,0.2)", padding: "1rem", marginBottom: "1.5rem",
    background: "rgba(136,0,255,0.03)", cursor: "pointer" as const, transition: "border-color 0.2s",
  },
  submitLabel: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#8800ff", letterSpacing: "0.25em", marginBottom: "0.5rem" },
  submitDesc: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#4a4060", lineHeight: 1.5 },
  footer: {
    borderTop: "1px solid rgba(136,0,255,0.15)", padding: "1.5rem 2rem",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  footerLogo: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.2em", color: "#440088" },
  footerCopy: { fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "#332844", letterSpacing: "0.15em" },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [navVisible, setNavVisible] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  const featured = posts[0];
  const rest = posts.slice(1);
  const filtered = activeCategory === "ALL" ? rest : rest.filter(p => p.category === activeCategory);
  const recentSide = posts.slice(0, 3);
  const catCounts = categories.slice(1).map(cat => ({ cat, count: posts.filter(p => p.category === cat).length }));

  useEffect(() => {
    const onScroll = () => {
      const h = splashRef.current?.offsetHeight ?? window.innerHeight;
      setNavVisible(window.scrollY > h * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function filterCat(cat: string) {
    setActiveCategory(cat);
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* STICKY NAV */}
      <nav className={`site-nav${navVisible ? " visible" : ""}`}>
        <div style={s.navLogo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Triangle size={24} />
          <div style={s.navName}>V<span style={{ color: "#aa44ff" }}>0</span>IDL<span style={{ color: "#aa44ff" }}>1</span>NE</div>
        </div>
        <div style={s.navLinks}>
          {categories.slice(1).map(cat => (
            <button key={cat} style={s.navLink} onClick={() => filterCat(cat)}
              onMouseEnter={e => (e.currentTarget.style.color = "#aa44ff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6a5f80")}
            >{cat}</button>
          ))}
          <button style={{ ...s.navLink, color: "#8800ff" }} onClick={() => setModal("submit")}
            onMouseEnter={e => (e.currentTarget.style.color = "#aa44ff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8800ff")}
          >SUBMIT INFO</button>
        </div>
      </nav>

      {/* SPLASH */}
      <div id="splash" ref={splashRef}>
        <div style={s.splashLogo}>
          <div style={{ filter: "drop-shadow(0 0 20px rgba(136,0,255,0.6))", zIndex: 1 }}>
            <Triangle size={80} />
          </div>
          <div style={s.splashName}>
            V<span style={{ color: "#aa44ff" }}>0</span>IDL<span style={{ color: "#aa44ff" }}>1</span>NE
          </div>
          <div style={s.splashSub}>KNOWLEDGE THEY FORGOT TO GIVE YOU</div>
        </div>
        <div className="scroll-hint">
          <span className="scroll-hint-text">SCROLL</span>
          <div className="scroll-hint-arrow" />
        </div>
      </div>

      {/* CONTENT */}
      <div id="content">
        {/* category filter */}
        <div style={s.cats}>
          {categories.map(cat => (
            <div key={cat} onClick={() => setActiveCategory(cat)} style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.65rem", letterSpacing: "0.15em",
              padding: "0.3rem 0.8rem",
              border: `1px solid ${activeCategory === cat ? "#8800ff" : "rgba(136,0,255,0.2)"}`,
              color: activeCategory === cat ? "#aa44ff" : "#6a5f80",
              cursor: "pointer",
              background: activeCategory === cat ? "rgba(136,0,255,0.05)" : "transparent",
              transition: "all 0.2s",
            }}>{cat}</div>
          ))}
        </div>

        {/* grid */}
        <div style={s.grid}>
          <div style={s.mainCol}>
            {/* featured */}
            {(activeCategory === "ALL" || activeCategory === featured.category) && (
              <Link href={`/blog/${featured.slug}`} style={s.featured}
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
            )}

            {/* post list */}
            {filtered.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={s.postItem}
                onMouseEnter={e => { (e.currentTarget.querySelector(".pt") as HTMLElement).style.color = "#aa44ff"; }}
                onMouseLeave={e => { (e.currentTarget.querySelector(".pt") as HTMLElement).style.color = "#e0d8f0"; }}
              >
                <div style={s.postCat}>// {post.category}</div>
                <div className="pt" style={s.postTitle}>{post.title}</div>
                <p style={s.postExcerpt}>{post.excerpt}</p>
              </Link>
            ))}
          </div>

          {/* sidebar */}
          <div style={s.sideCol}>
            <div style={s.signal}>
              <div style={s.signalLabel}>// SIGNAL</div>
              <p style={s.signalText}>
                This is not advice. This is <span style={{ color: "#8800ff" }}>information</span>. What you do with it is yours. No credentials, no agenda — just the stuff that should already be public knowledge.
              </p>
            </div>

            {/* submit block */}
            <div style={s.submitBlock} onClick={() => setModal("submit")}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#8800ff")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(136,0,255,0.2)")}
            >
              <div style={s.submitLabel}>// SUBMIT INFORMATION</div>
              <p style={s.submitDesc}>Know something that should be here? Submit it. If it checks out, it gets published.</p>
            </div>

            <div style={s.sideSection}>
              <div style={s.sideLabel}>// RECENT</div>
              {recentSide.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={s.sideItem}
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
                <div key={cat} style={{ ...s.sideItem, cursor: "pointer" }} onClick={() => setActiveCategory(cat)}
                  onMouseEnter={e => { (e.currentTarget.querySelector(".st2") as HTMLElement).style.color = "#aa44ff"; }}
                  onMouseLeave={e => { (e.currentTarget.querySelector(".st2") as HTMLElement).style.color = "#c8bedd"; }}
                >
                  <div className="st2" style={s.sideTitle}>{cat}</div>
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
      </div>

      <Modals open={modal} onClose={() => setModal(null)} />
    </>
  );
}
