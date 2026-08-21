import Link from "next/link";
import type { Category, Recipe } from "./menu-data";

export function BookPage({ category }: { category: Category }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#faf7ef",
        border: "1.5px solid #2a2a2a",
        borderRadius: "4px 14px 14px 4px",
        boxShadow: "4px 6px 18px rgba(0,0,0,0.35)",
        padding: "2.2rem 2.4rem 2.4rem 2.8rem",
        minHeight: "340px",
        overflow: "hidden",
        flex: 1,
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
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "36px",
          height: "36px",
          background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.12) 50%)",
          pointerEvents: "none",
        }}
      />

      <h2
        style={{
          fontFamily: "var(--font-condensed, sans-serif)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: "1.7rem",
          color: "#111",
          marginBottom: "0.6rem",
        }}
      >
        {category.name}
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          color: "#999",
          marginBottom: "1.8rem",
        }}
      >
        <span style={{ width: "32px", height: "1px", background: "#bbb" }} />
        <span style={{ fontSize: "0.75rem" }}>❦</span>
        <span style={{ flex: 1, height: "1px", background: "#bbb" }} />
      </div>

      {category.recipes.map((recipe, i) => (
        <div key={recipe.name}>
          {i > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem 0",
                color: "#bbb",
                fontSize: "0.8rem",
              }}
            >
              ❧
            </div>
          )}
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}

export function ArrowLink({
  href,
  direction,
}: {
  href?: string;
  direction: "left" | "right";
}) {
  const style: React.CSSProperties = {
    flexShrink: 0,
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1.5px solid #2a2a2a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    textDecoration: "none",
    background: href ? "linear-gradient(180deg, #4a4a4a, #141414)" : "#d5d5d5",
    color: href ? "#f0f0f0" : "#999",
    boxShadow: href ? "0 4px 10px rgba(0,0,0,0.3)" : "none",
  };

  const label = direction === "left" ? "‹" : "›";
  const aria = direction === "left" ? "Previous page" : "Next page";

  if (!href) {
    return (
      <span style={style} aria-hidden="true">
        {label}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={aria} style={style}>
      {label}
    </Link>
  );
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "0.2rem" }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: "1.7rem",
            color: "#111",
          }}
        >
          {recipe.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: "#888",
            whiteSpace: "nowrap",
            border: "1px solid #ccc",
            borderRadius: "3px",
            padding: "0.15rem 0.5rem",
          }}
        >
          {recipe.time}
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: "#555",
          marginBottom: "1.2rem",
        }}
      >
        {recipe.blurb}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#8800ff",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.3rem",
            }}
          >
            Ingredients
          </div>
          <ul style={{ paddingLeft: "1.1rem", display: "grid", gap: "0.4rem" }}>
            {recipe.ingredients.map((ing) => (
              <li
                key={ing}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.02rem",
                  color: "#333",
                  lineHeight: 1.4,
                }}
              >
                {ing}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#8800ff",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.3rem",
            }}
          >
            Method
          </div>
          <ol style={{ paddingLeft: "1.2rem", display: "grid", gap: "0.6rem" }}>
            {recipe.steps.map((step, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.08rem",
                  color: "#222",
                  lineHeight: 1.5,
                }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
