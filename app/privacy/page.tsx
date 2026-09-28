import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What V0IDL1NE collects (very little), why, who processes it, and how to get it deleted.",
  alternates: { canonical: "/privacy" },
};

const CONTACT = "V0IDL1NE@proton.me";
const p = { color: "#a090c0", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.1rem" };
const h2 = {
  fontFamily: "var(--font-condensed)",
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase" as const,
  margin: "2rem 0 0.7rem",
};
const ul = { color: "#a090c0", lineHeight: 1.8, fontSize: "0.95rem", paddingLeft: "1.2rem", marginBottom: "1.1rem", listStyle: "disc" };
const a = { color: "#aa44ff" };

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="PRIVACY" title="Privacy policy">
      <p style={p}><strong style={{ color: "#e0d8f0" }}>Effective September 28, 2026.</strong> Short version: no accounts, no ad trackers, no selling or sharing your data. The only personal information the site ever gets is what you choose to type into a form.</p>

      <h2 style={h2}>What&apos;s collected, and why</h2>
      <ul style={ul}>
        <li>
          <strong style={{ color: "#e0d8f0" }}>Anonymous visit statistics.</strong> Vercel Web Analytics counts page views,
          referring sites, country, and device type so we can see which posts help people. It doesn&apos;t use cookies and
          doesn&apos;t identify you or follow you to other sites.
        </li>
        <li>
          <strong style={{ color: "#e0d8f0" }}>Your email, if you sign up for updates.</strong> It&apos;s stored with our email
          provider, Resend, and used only to send V0IDL1NE updates. Signup is confirmed by a link first, and every email has
          an unsubscribe link.
        </li>
        <li>
          <strong style={{ color: "#e0d8f0" }}>What you type into the Submit or Report forms.</strong> It&apos;s emailed to us so
          we can review it. Don&apos;t include personal details you don&apos;t want us to have — the forms don&apos;t ask for your
          name or email.
        </li>
        <li>
          <strong style={{ color: "#e0d8f0" }}>Standard server logs.</strong> Our host, Vercel, processes technical data like IP
          addresses to deliver pages and protect against abuse.
        </li>
      </ul>

      <h2 style={h2}>What isn&apos;t collected</h2>
      <ul style={ul}>
        <li>The <Link href="/tools" style={a}>tools</Link> (calculators, checkers, deadline dates) run entirely in your browser. Nothing you enter is sent anywhere or saved.</li>
        <li>No advertising cookies, tracking pixels, or social media scripts. The share buttons are plain links — nothing loads from those services unless you click one, and then their own privacy policy applies.</li>
        <li>We don&apos;t sell or share personal information, and we don&apos;t use it for targeted advertising.</li>
      </ul>

      <h2 style={h2}>Your choices</h2>
      <p style={p}>
        You can unsubscribe from emails at any time with the link in any email. To have your email address or a form
        submission deleted, or to ask what we have, email <a href={`mailto:${CONTACT}`} style={a}>{CONTACT}</a>. We&apos;ll
        respond within 30 days. These rights apply to everyone, including California residents under the CCPA.
      </p>

      <h2 style={h2}>Children</h2>
      <p style={p}>The site isn&apos;t directed at children under 13, and we don&apos;t knowingly collect their information.</p>

      <h2 style={h2}>Changes</h2>
      <p style={p}>
        If this policy changes — for example, if affiliate links or ads are ever added — this page will be updated and the
        effective date above will change. Questions: <a href={`mailto:${CONTACT}`} style={a}>{CONTACT}</a>.
      </p>
    </PageShell>
  );
}
