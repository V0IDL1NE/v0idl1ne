"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "./menu-data";

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/")[3] ?? "";

  return (
    <ViewTransition name="recipe-page" enter="page-flip" exit="page-flip" default="none" key={activeSlug}>
      <div>
        <nav
          style={{
            background: "#0a0a0a",
            borderRadius: "10px",
            padding: "0.9rem",
            display: "flex",
            alignItems: "center",
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
                href={`/test/recipes/${cat.slug}`}
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
  );
}
