import Link from "next/link";
import { SOCIALS } from "@/lib/social";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(136,0,255,0.15)",
        padding: "1.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontSize: "1rem",
            fontWeight: 900,
            letterSpacing: "0.2em",
            color: "#440088",
          }}
        >
          V0IDL1NE
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            color: "#332844",
            letterSpacing: "0.15em",
          }}
        >
          // NO CREDENTIALS. NO PAYWALL. NO BULLSHIT.
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          color: "#2a2038",
          letterSpacing: "0.08em",
          lineHeight: 1.6,
        }}
      >
        General information, not professional advice — laws, codes, and situations vary.{" "}
        <Link href="/disclaimer" style={{ color: "#4a4060", textDecoration: "underline", textUnderlineOffset: "2px" }}>
          FULL DISCLAIMER
        </Link>
        {" "}—{" "}
        <Link href="/about" style={{ color: "#4a4060", textDecoration: "underline", textUnderlineOffset: "2px" }}>
          ABOUT
        </Link>
        {" "}—{" "}
        <Link href="/privacy" style={{ color: "#4a4060", textDecoration: "underline", textUnderlineOffset: "2px" }}>
          PRIVACY
        </Link>
        {" "}—{" "}
        <a href="/rss.xml" style={{ color: "#4a4060", textDecoration: "underline", textUnderlineOffset: "2px" }}>
          RSS
        </a>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.15em", color: "#6a5f80", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <span>{"// FOLLOW:"}</span>
        {SOCIALS.map(sx => (
          <a key={sx.name} href={sx.href} target="_blank" rel="noopener noreferrer" style={{ color: "#aa44ff", textDecoration: "none" }}>
            {sx.name.toUpperCase()}
          </a>
        ))}
      </div>
    </footer>
  );
}
