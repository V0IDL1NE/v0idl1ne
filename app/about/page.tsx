import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About V0IDL1NE: Who Writes This, How It's Checked, How Corrections Work",
  description: "V0IDL1NE is an independent, free, no-paywall public record of practical knowledge. How posts are researched, sourced, reviewed, and corrected.",
  alternates: { canonical: "/about" },
};

const p = { color: "#a090c0", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.2rem" };
const h2 = {
  fontFamily: "var(--font-condensed)",
  fontSize: "1.4rem",
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase" as const,
  margin: "2.2rem 0 0.8rem",
};
const a = { color: "#aa44ff" };

export default function AboutPage() {
  return (
    <PageShell eyebrow="ABOUT" title="About V0IDL1NE">
      <p style={p}>
        V0IDL1NE is a public record of the practical stuff nobody sits you down and teaches: what your landlord can and
        can&apos;t do, what to say when you&apos;re pulled over, how to read a pay stub, why a breaker trips, how to cut a
        hospital bill. It&apos;s free, there&apos;s no paywall, and there&apos;s no account to make.
      </p>
      <p style={p}>
        It&apos;s an independent, one-person project — not a law firm, clinic, bank, or licensed contractor, and not
        funded by any company in the fields it covers.
      </p>

      <h2 style={h2}>How posts are written</h2>
      <p style={p}>
        Every post starts from the question a real person would actually ask, then gets checked against primary sources
        wherever they exist — the statute, the federal regulation, the agency that enforces it (the FTC, CFPB, FDA,
        HUD, NHTSA and so on), or the code body (like the National Electrical Code). Each post lists its sources at the
        bottom and shows when it was last reviewed.
      </p>
      <p style={p}>
        Where rules vary by state or situation, posts say so instead of pretending one answer fits everyone. That&apos;s
        also why the <Link href="/tools" style={a}>tools</Link> give the general rule and tell you when to check your
        state.
      </p>

      <h2 style={h2}>Corrections</h2>
      <p style={p}>
        If something here is wrong or out of date, use the <strong style={{ color: "#e0d8f0" }}>Report inaccuracy</strong> button
        at the bottom of any post. Include a source if you have one. Confirmed errors get fixed, and meaningful
        corrections are noted on the post.
      </p>

      <h2 style={h2}>Money</h2>
      <p style={p}>
        Right now the site makes no money: no ads, no sponsors, no paid placements. If that changes — say, affiliate
        links to a tool a post already recommends — every such link will be labeled, and nothing will be recommended
        because it pays. The information itself will stay free.
      </p>

      <h2 style={h2}>What this isn&apos;t</h2>
      <p style={p}>
        General information, not legal, medical, financial, or electrical advice for your specific situation. Use it to
        walk into a conversation with a professional informed. Full details in the <Link href="/disclaimer" style={a}>disclaimer</Link>;
        what the site collects (very little) is in the <Link href="/privacy" style={a}>privacy policy</Link>.
      </p>
    </PageShell>
  );
}
