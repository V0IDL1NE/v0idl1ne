"use client";

import { useState } from "react";
import type { Recipe, Category } from "./menu-data";
import { menu } from "./menu-data";

export default function TestPage() {
  const [active, setActive] = useState(0);
  const category: Category = menu[active];

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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <h1
          style={{
            fontFamily: "'Pirata One', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            textAlign: "center",
            color: "#0a0a0a",
            WebkitTextStroke: "1.5px #d8d8d8",
            textShadow: "0 3px 4px rgba(0,0,0,0.35)",
            margin: "0 0 2rem",
          }}
        >
          The Menu
        </h1>

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
          {menu.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              style={{
                flex: "1 1 100px",
                minWidth: "100px",
                padding: "0.7rem 0.5rem",
                borderRadius: "6px",
                border: i === active ? "2px solid #fff" : "1px solid #888",
                background:
                  i === active
                    ? "linear-gradient(180deg, #6a6a6a, #2a2a2a)"
                    : "linear-gradient(180deg, #3a3a3a, #141414)",
                color: "#f0f0f0",
                fontFamily: "var(--font-condensed, sans-serif)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                cursor: "pointer",
                boxShadow:
                  i === active
                    ? "inset 0 0 8px rgba(255,255,255,0.15)"
                    : "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        <div
          style={{
            marginTop: "2.5rem",
            background: "rgba(255,255,255,0.55)",
            border: "1.5px solid #2a2a2a",
            borderRadius: "10px",
            padding: "2rem",
            minHeight: "300px",
          }}
        >
          {category.recipes.map((recipe) => (
            <RecipeCard key={recipe.name} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
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
