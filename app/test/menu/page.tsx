import type { Metadata } from "next";
import Link from "next/link";
import { SectionCard } from "../SectionCard";
import { menu } from "../recipes/menu-data";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function MenuPage() {
  return (
    <SectionCard title="Menu">
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "1rem",
          color: "#555",
          marginBottom: "1.8rem",
          marginTop: "-1rem",
        }}
      >
        What could be made, based on what's in the recipe book.
      </p>

      <div style={{ display: "grid", gap: "1.6rem" }}>
        {menu.map((cat) => (
          <div key={cat.slug}>
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#8800ff",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              {cat.name}
            </div>
            <div style={{ display: "grid", gap: "0.3rem" }}>
              {cat.recipes.map((r) => (
                <Link
                  key={r.name}
                  href={`/test/recipes/${cat.slug}`}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    color: "#222",
                    textDecoration: "none",
                    borderBottom: "1px dotted #ccc",
                    width: "fit-content",
                  }}
                >
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
