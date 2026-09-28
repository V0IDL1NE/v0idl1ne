import Link from "next/link";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const s = {
  header: {
    borderBottom: "1px solid rgba(136,0,255,0.4)",
    padding: "1.2rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap" as const,
    background: "#000",
  },
  backBtn: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    color: "#8800ff",
    letterSpacing: "0.2em",
    textDecoration: "none",
  },
  main: { padding: "2rem", maxWidth: "760px" },
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    color: "#8800ff",
    letterSpacing: "0.3em",
    marginBottom: "1rem",
    display: "inline-block",
    textDecoration: "none",
  },
  title: {
    fontFamily: "var(--font-condensed)",
    fontSize: "clamp(2.2rem, 8vw, 3rem)",
    fontWeight: 900,
    color: "#fff",
    textTransform: "uppercase" as const,
    lineHeight: 0.95,
    marginBottom: "1rem",
  },
  intro: {
    color: "#a090c0",
    lineHeight: 1.7,
    fontSize: "0.95rem",
    marginBottom: "2rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid rgba(136,0,255,0.15)",
  },
  footerWrap: { marginTop: "4rem" },
};

/* Shared frame for tool, guide, and printable pages: logo header, title block, footer. */
export default function PageShell({
  eyebrow,
  eyebrowHref,
  title,
  intro,
  backHref = "/",
  backLabel = "← BACK TO V0IDL1NE",
  children,
}: {
  eyebrow: string;
  eyebrowHref?: string;
  title: string;
  intro?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="no-print" style={s.header}>
        <Logo />
        <Link href={backHref} style={s.backBtn}>{backLabel}</Link>
      </header>

      <main style={s.main}>
        {eyebrowHref ? (
          <Link href={eyebrowHref} className="no-print" style={s.eyebrow}>{"// "}{eyebrow}</Link>
        ) : (
          <div className="no-print" style={s.eyebrow}>{"// "}{eyebrow}</div>
        )}
        <h1 className="print-title" style={s.title}>{title}</h1>
        {intro && <p className="no-print" style={s.intro}>{intro}</p>}
        {children}
      </main>

      <div className="no-print" style={s.footerWrap}>
        <Footer />
      </div>
    </>
  );
}
