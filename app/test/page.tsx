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
        border: "1.5px solid #2a2a2a",
        borderRadius: "4px 14px 14px 4px",
        boxShadow: "4px 6px 18px rgba(0,0,0,0.35)",
        minHeight: "480px",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/skeletons.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "18px",
          background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)",
        }}
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap"
      />

      <div
        style={{
          position: "relative",
          padding: "4rem 2.5rem",
          minHeight: "480px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.4rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Pirata One', serif",
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            color: "#f0ead6",
            WebkitTextStroke: "1px rgba(0,0,0,0.5)",
            textShadow: "0 0 18px rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.8)",
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
            color: "#ccc",
          }}
        >
          <span style={{ width: "48px", height: "1px", background: "#ccc" }} />
          <span style={{ fontSize: "0.9rem" }}>❦</span>
          <span style={{ width: "48px", height: "1px", background: "#ccc" }} />
        </div>

        <p
          style={{
            color: "#ddd",
            fontSize: "0.95rem",
            maxWidth: "34ch",
            fontStyle: "italic",
            textShadow: "0 2px 6px rgba(0,0,0,0.9)",
          }}
        >
          Pick a category above, or turn the page to begin.
        </p>

        <Link
          href={`/test/${first.slug}`}
          style={{
            marginTop: "0.5rem",
            padding: "0.7rem 1.6rem",
            borderRadius: "6px",
            border: "1.5px solid #555",
            background: "linear-gradient(180deg, #4a4a4a, #141414)",
            color: "#f0f0f0",
            fontFamily: "var(--font-condensed, sans-serif)",
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(0,0,0,0.6)",
          }}
        >
          Begin →
        </Link>
      </div>
    </div>
  );
}
