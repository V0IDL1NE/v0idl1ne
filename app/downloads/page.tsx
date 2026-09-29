import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { downloads, downloadUrl } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Free Windows Tools: Specs Reporter, Disk Usage, Network Info, Startup Manager",
  description: "Free, no-install Windows utilities from V0IDL1NE: a hardware specs report, a disk space finder, a network diagnostics panel, and a startup manager. Exactly what each one does and doesn't do.",
  alternates: { canonical: "/downloads" },
};

const s = {
  card: { border: "1px solid rgba(136,0,255,0.25)", background: "rgba(136,0,255,0.03)", padding: "1.3rem", marginBottom: "1.5rem" },
  name: { fontFamily: "var(--font-condensed)", fontSize: "1.6rem", fontWeight: 900, color: "#fff", textTransform: "uppercase" as const, lineHeight: 1, marginBottom: "0.6rem" },
  summary: { color: "#a090c0", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.9rem" },
  cols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1rem" },
  colLabel: { fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", marginBottom: "0.4rem" },
  list: { color: "#a090c0", fontSize: "0.82rem", lineHeight: 1.6, paddingLeft: "1.1rem", listStyle: "disc" },
  hash: { fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#4a4060", wordBreak: "break-all" as const, marginTop: "0.8rem" },
  p: { color: "#a090c0", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "0.8rem" },
};

export default function DownloadsPage() {
  return (
    <PageShell
      eyebrow="FREE PC TOOLS"
      title="Free Windows tools"
      intro="Small, single-file Windows utilities — no installer, no account, no ads. Each one lists exactly what it does and doesn't touch."
    >
      <div className="result warn" style={{ marginTop: 0 }}>
        <div className="result-big" style={{ fontSize: "1.3rem" }}>Windows will probably warn you</div>
        <p>
          These aren&apos;t code-signed yet (signing costs money every year), so Windows SmartScreen may say
          &ldquo;Windows protected your PC.&rdquo; That warning means &ldquo;unknown publisher,&rdquo; not &ldquo;virus.&rdquo; If you trust the
          download, click <strong>More info → Run anyway</strong>. Each file&apos;s SHA-256 fingerprint is listed so you can
          confirm you got the exact file published here (in PowerShell: <code>Get-FileHash .\filename.exe</code>).
        </p>
      </div>

      {downloads.map(d => (
        <section key={d.slug} id={d.slug} style={s.card}>
          <h2 style={s.name}>{d.name}</h2>
          <p style={s.summary}>{d.summary}</p>
          <div style={s.cols}>
            <div>
              <div style={{ ...s.colLabel, color: "#44dd88" }}>WHAT IT DOES</div>
              <ul style={s.list}>{d.does.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <div style={{ ...s.colLabel, color: "#ff6644" }}>WHAT IT DOESN&apos;T</div>
              <ul style={s.list}>{d.doesNot.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <div className="chip-row" style={{ alignItems: "center" }}>
            <a href={downloadUrl(d)} className="tool-btn active">DOWNLOAD FOR WINDOWS ({d.sizeMb} MB)</a>
            {d.relatedPosts.map(r => <Link key={r.href} href={r.href} className="tool-btn small">{r.label} →</Link>)}
          </div>
          <div style={s.hash}>SHA-256: {d.sha256}</div>
        </section>
      ))}

      <div className="section-label">{"// THE FINE PRINT"}</div>
      <p style={s.p}>
        Windows 10 and 11, 64-bit. Each app is a single .exe you can run from anywhere — delete the file to remove it.
        Settings are saved in your user folder. Linux versions are coming.
      </p>
      <p style={s.p}>
        These are provided as-is, free. They&apos;re built to be careful — nothing is deleted, and nothing needs admin
        rights — but use your judgment about what you turn off in Startup Manager. Found a bug? Use the{" "}
        <strong style={{ color: "#e0d8f0" }}>Submit information</strong> form on the homepage.
      </p>
    </PageShell>
  );
}
