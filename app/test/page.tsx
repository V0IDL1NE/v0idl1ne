"use client";

import { useEffect, useRef, useState } from "react";
import type { Recipe, Category } from "./menu-data";
import { menu } from "./menu-data";

const FLIP_MS = 750;

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippingFrom, setFlippingFrom] = useState<number | null>(null);
  const [angle, setAngle] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  function turnTo(target: number) {
    if (target === currentIndex || target < 0 || target >= menu.length) return;
    if (flippingFrom !== null) return;

    setFlippingFrom(currentIndex);
    setCurrentIndex(target);
    setAngle(0);

    const t1 = window.setTimeout(() => setAngle(-178), 20);
    const t2 = window.setTimeout(() => {
      setFlippingFrom(null);
      setAngle(0);
    }, FLIP_MS + 40);
    timers.current.push(t1, t2);
  }

  const category = menu[currentIndex];
  const prevCategory = flippingFrom !== null ? menu[flippingFrom] : null;

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
              onClick={() => turnTo(i)}
              style={{
                flex: "1 1 100px",
                minWidth: "100px",
                padding: "0.7rem 0.5rem",
                borderRadius: "6px",
                border: i === currentIndex ? "2px solid #fff" : "1px solid #888",
                background:
                  i === currentIndex
                    ? "linear-gradient(180deg, #6a6a6a, #2a2a2a)"
                    : "linear-gradient(180deg, #3a3a3a, #141414)",
                color: "#f0f0f0",
                fontFamily: "var(--font-condensed, sans-serif)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                cursor: flippingFrom !== null ? "default" : "pointer",
                boxShadow:
                  i === currentIndex
                    ? "inset 0 0 8px rgba(255,255,255,0.15)"
                    : "inset 0 1px 0 rgba(255,255,255,0.08)",
                opacity: flippingFrom !== null && i !== currentIndex ? 0.6 : 1,
              }}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <ArrowButton
            direction="left"
            disabled={currentIndex === 0 || flippingFrom !== null}
            onClick={() => turnTo(currentIndex - 1)}
          />

          <div style={{ perspective: "1800px", flex: 1 }}>
            <div style={{ position: "relative" }}>
              <BookPage category={category} />

              {prevCategory && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 5,
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                    transition: `transform ${FLIP_MS}ms cubic-bezier(0.45,0.05,0.55,0.95)`,
                    transform: `rotateY(${angle}deg)`,
                  }}
                >
                  <BookPage category={prevCategory} />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "4px 14px 14px 4px",
                      background: "linear-gradient(to left, rgba(0,0,0,0.35), transparent 55%)",
                      opacity: angle === 0 ? 0.1 : 0.55,
                      transition: `opacity ${FLIP_MS}ms ease`,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <ArrowButton
            direction="right"
            disabled={currentIndex === menu.length - 1 || flippingFrom !== null}
            onClick={() => turnTo(currentIndex + 1)}
          />
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          Page {currentIndex + 1} of {menu.length} — {category.name}
        </div>
      </div>
    </main>
  );
}

function BookPage({ category }: { category: Category }) {
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

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
      style={{
        flexShrink: 0,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1.5px solid #2a2a2a",
        background: disabled ? "#d5d5d5" : "linear-gradient(180deg, #4a4a4a, #141414)",
        color: disabled ? "#999" : "#f0f0f0",
        fontSize: "1.2rem",
        cursor: disabled ? "default" : "pointer",
        boxShadow: disabled ? "none" : "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      {direction === "left" ? "‹" : "›"}
    </button>
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
