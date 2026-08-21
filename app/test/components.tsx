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
        padding: "2rem 2rem 2rem 2.5rem",
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
      <h2
        style={{
          fontFamily: "var(--font-condensed, sans-serif)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          fontSize: "1.6rem",
          color: "#111",
          marginBottom: "1.2rem",
        }}
      >
        {category.name}
      </h2>
      {category.recipes.map((recipe) => (
        <RecipeCard key={recipe.name} recipe={recipe} />
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
    <details
      style={{
        border: "1px solid #999",
        background: "rgba(255,255,255,0.6)",
        borderRadius: "6px",
        padding: "1rem 1.2rem",
        marginBottom: "0.8rem",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontWeight: 600, fontSize: "1.05rem", color: "#111" }}>
            {recipe.name}
          </span>
          <span style={{ fontSize: "0.85rem", color: "#444" }}>{recipe.blurb}</span>
        </span>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "#666", whiteSpace: "nowrap" }}>
          {recipe.time}
        </span>
      </summary>

      <div style={{ marginTop: "1.1rem", display: "grid", gap: "1.1rem" }}>
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            Ingredients
          </div>
          <ul style={{ paddingLeft: "1.1rem", display: "grid", gap: "0.25rem" }}>
            {recipe.ingredients.map((ing) => (
              <li key={ing} style={{ fontSize: "0.8rem", color: "#333" }}>
                {ing}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            Steps
          </div>
          <ol style={{ paddingLeft: "1.1rem", display: "grid", gap: "0.35rem" }}>
            {recipe.steps.map((step, i) => (
              <li key={i} style={{ fontSize: "0.85rem", color: "#222", lineHeight: 1.55 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </details>
  );
}
