import type { Metadata } from "next";
import Link from "next/link";
import { menu } from "./menu-data";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function TestCoverPage() {
  const first = menu[0];

  return (
    <div
      style={{
        position: "relative",
        background: "#faf7ef",
        border: "1.5px solid #2a2a2a",
        borderRadius: "4px 14px 14px 4px",
        boxShadow: "4px 6px 18px rgba(0,0,0,0.35)",
        padding: "4rem 2.5rem",
        minHeight: "440px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.4rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "18px",
          background: "linear-gradient(to right, rgba(0,0,0,0.28), transparent)",
          pointerEvents: "none",
        }}
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap"
      />

      <h1
        style={{
          fontFamily: "'Pirata One', serif",
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          color: "#0a0a0a",
          WebkitTextStroke: "1.2px #d8d8d8",
          textShadow: "0 3px 4px rgba(0,0,0,0.3)",
          margin: 0,
        }}
      >
        Inside The Crypt
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          color: "#888",
        }}
      >
        <span style={{ width: "48px", height: "1px", background: "#888" }} />
        <span style={{ fontSize: "0.9rem" }}>❦</span>
        <span style={{ width: "48px", height: "1px", background: "#888" }} />
      </div>

      <p style={{ color: "#333", fontSize: "0.95rem", maxWidth: "34ch", fontStyle: "italic" }}>
        Pick a category above, or turn the page to begin.
      </p>

      <Link
        href={`/test/${first.slug}`}
        style={{
          marginTop: "0.5rem",
          padding: "0.7rem 1.6rem",
          borderRadius: "6px",
          border: "1.5px solid #2a2a2a",
          background: "linear-gradient(180deg, #4a4a4a, #141414)",
          color: "#f0f0f0",
          fontFamily: "var(--font-condensed, sans-serif)",
          fontWeight: 700,
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          textDecoration: "none",
        }}
      >
        Begin →
      </Link>
    </div>
  );
}
