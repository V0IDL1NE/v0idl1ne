"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "./menu-data";

export default function TestLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/")[2] ?? "";

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        overflowY: "auto",
        background:
          "radial-gradient(ellipse at 50% 0%, #ffffff 0%, #e6e6e6 45%, #adadad 100%)",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Pirata+One&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />

      <ViewTransition name="book-page" enter="page-flip" exit="page-flip" default="none" key={activeSlug}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 5rem" }}>
          <nav
            style={{
              background: "#0a0a0a",
              borderRadius: "10px",
              padding: "0.9rem",
              display: "flex",
              gap: "0.6rem",
              flexWrap: "wrap",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            }}
          >
            {menu.map((cat) => {
              const active = cat.slug === activeSlug;
              return (
                <Link
                  key={cat.slug}
                  href={`/test/${cat.slug}`}
                  style={{
                    flex: "1 1 100px",
                    minWidth: "100px",
                    padding: "0.7rem 0.5rem",
                    borderRadius: "6px",
                    border: active ? "2px solid #fff" : "1px solid #888",
                    background: active
                      ? "linear-gradient(180deg, #6a6a6a, #2a2a2a)"
                      : "linear-gradient(180deg, #3a3a3a, #141414)",
                    color: "#f0f0f0",
                    fontFamily: "var(--font-condensed, sans-serif)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    textAlign: "center",
                    boxShadow: active
                      ? "inset 0 0 8px rgba(255,255,255,0.15)"
                      : "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: "2.5rem" }}>{children}</div>
        </div>
      </ViewTransition>
    </main>
  );
}
