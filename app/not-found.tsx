import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — V0IDL1NE",
  description: "Signal lost. This page doesn't exist.",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(90deg, rgba(136,0,255,0.03) 0px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(136,0,255,0.03) 0px, transparent 1px, transparent 80px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(136,0,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="0 0 40 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={64}
        height={70}
        style={{
          filter: "drop-shadow(0 0 20px rgba(136,0,255,0.6))",
          zIndex: 1,
        }}
      >
        <line x1="20" y1="44" x2="0" y2="4" stroke="#8800ff" strokeWidth="1.5" />
        <line x1="20" y1="44" x2="40" y2="4" stroke="#8800ff" strokeWidth="1.5" />
        <line x1="0" y1="4" x2="40" y2="4" stroke="#8800ff" strokeWidth="1.5" />
        <line x1="20" y1="4" x2="20" y2="44" stroke="#6600cc" strokeWidth="1" />
        <line x1="5" y1="19" x2="35" y2="19" stroke="#6600cc" strokeWidth="1" />
      </svg>

      <div
        style={{
          fontFamily: "var(--font-condensed)",
          fontSize: "6rem",
          fontWeight: 900,
          letterSpacing: "0.2em",
          color: "#fff",
          textShadow:
            "0 0 60px rgba(136,0,255,0.8), 0 0 120px rgba(136,0,255,0.3)",
          lineHeight: 1,
          zIndex: 1,
        }}
      >
        4<span style={{ color: "#aa44ff" }}>0</span>4
      </div>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "#6a5f80",
          letterSpacing: "0.35em",
          zIndex: 1,
        }}
      >
        SIGNAL LOST
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "#4a4060",
          letterSpacing: "0.05em",
          lineHeight: 1.7,
          maxWidth: 420,
          zIndex: 1,
        }}
      >
        // THE PAGE YOU'RE LOOKING FOR ISN'T HERE, OR NEVER WAS.
      </p>

      <Link
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          padding: "0.7rem 1.4rem",
          border: "1px solid #8800ff",
          color: "#aa44ff",
          background: "rgba(136,0,255,0.08)",
          textDecoration: "none",
          zIndex: 1,
          transition: "background 0.2s",
        }}
      >
        [ RETURN TO INDEX ]
      </Link>
    </div>
  );
}
