import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer — V0IDL1NE",
  description: "General information, not professional advice.",
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
  article: { padding: "2rem", maxWidth: "700px" },
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
  h3: {
    fontFamily: "var(--font-condensed)",
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#fff",
    textTransform: "uppercase" as const,
    margin: "2rem 0 0.8rem",
  },
};

export default function DisclaimerPage() {
  return (
    <>
      <header style={s.header}>
        <Logo />
        <Link href="/" style={s.backBtn}>← BACK TO V0IDL1NE</Link>
      </header>

      <article style={s.article}>
        <h1 style={s.title}>Disclaimer</h1>

        <p style={s.p}>
          This isn't legal advice. It isn't medical advice. It isn't financial, electrical, or automotive advice from
          a licensed professional who has actually looked at your specific situation. It's general information —
          the kind of stuff that should already be common knowledge, written in plain language, without a paywall
          or a credential in front of it.
        </p>

        <h3 style={s.h3}>Things vary</h3>
        <p style={s.p}>
          Laws vary by state and change over time. Electrical and building codes vary by jurisdiction. Medical
          situations vary by person, history, and severity. Financial advice depends on numbers specific to you.
          What's generally true is not guaranteed to be true for your specific case, your specific state, or the day
          you're reading this. Posts here are written to be accurate at the time they're published and reviewed for
          accuracy afterward, but "general and current" is not the same as "verified for your exact situation."
        </p>

        <h3 style={s.h3}>No liability</h3>
        <p style={s.p}>
          V0IDL1NE and whoever wrote a given post are not responsible for what you do with this information, for
          any outcome that results from acting on it, or for any inaccuracy that's slipped through despite the
          effort to get things right. Use your own judgment. If something here is wrong or out of date, use the{" "}
          <strong style={{ color: "#e0d8f0" }}>report inaccuracy</strong> button on that post — that's what it's for.
        </p>

        <h3 style={s.h3}>When to talk to an actual professional</h3>
        <p style={s.p}>
          For anything with real stakes — a criminal charge, a serious or worsening medical symptom, a major
          financial decision, electrical work beyond a simple like-for-like swap, a legal dispute with money or
          consequences attached — talk to a licensed professional in your state. Use this site to walk into that
          conversation informed, not to skip it entirely.
        </p>
      </article>

      <Footer />
    </>
  );
}
