import type { Metadata } from "next";
import Link from "next/link";
import { sections } from "./sections";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function TestCoverPage() {
  return (
    <div>
      <div
        style={{
          position: "relative",
          border: "1.5px solid #2a2a2a",
          borderRadius: "4px 14px 14px 4px",
          boxShadow: "4px 6px 18px rgba(0,0,0,0.35)",
          minHeight: "420px",
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
            padding: "3.5rem 2.5rem",
            minHeight: "420px",
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
            Pick a section below, or turn the page to begin.
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {sections.map((s) => (
          <Link
            key={s.slug}
            href={`/test/${s.slug}`}
            style={{
              position: "relative",
              display: "block",
              background: "#faf7ef",
              border: "1.5px solid #2a2a2a",
              borderRadius: "4px 10px 10px 4px",
              boxShadow: "3px 4px 10px rgba(0,0,0,0.25)",
              padding: "1.2rem 1.4rem",
              textDecoration: "none",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "10px",
                background: "linear-gradient(to right, rgba(0,0,0,0.22), transparent)",
              }}
            />
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: "1.3rem",
                color: "#111",
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.95rem",
                color: "#555",
                marginTop: "0.2rem",
              }}
            >
              {s.blurb}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
