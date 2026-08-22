import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Newsletter",
  robots: { index: false, follow: false },
};

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
  title: {
    fontFamily: "var(--font-condensed)",
    fontSize: "2.6rem",
    fontWeight: 900,
    color: "#fff",
    textTransform: "uppercase" as const,
    lineHeight: 0.95,
    marginBottom: "1.5rem",
  },
  p: { color: "#a090c0", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.2rem" },
  footerWrap: { marginTop: "4rem" },
};

export default async function ConfirmedPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;

  return (
    <>
      <header style={s.header}>
        <Logo />
        <Link href="/" style={s.backBtn}>← BACK TO V0IDL1NE</Link>
      </header>

      <main style={s.main}>
        {status === "ok" && (
          <>
            <h1 style={s.title}>You&apos;re in</h1>
            <p style={s.p}>Confirmed. Updates come whenever there's something worth saying, not on a schedule.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h1 style={s.title}>Link expired</h1>
            <p style={s.p}>That confirmation link is invalid or expired. Sign up again from the homepage to get a fresh one.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 style={s.title}>Something went wrong</h1>
            <p style={s.p}>Couldn't confirm that just now. Try signing up again in a bit.</p>
          </>
        )}
        {!status && (
          <>
            <h1 style={s.title}>Newsletter</h1>
            <p style={s.p}>Nothing to see here directly — sign up from the homepage.</p>
          </>
        )}
      </main>

      <div style={s.footerWrap}>
        <Footer />
      </div>
    </>
  );
}
