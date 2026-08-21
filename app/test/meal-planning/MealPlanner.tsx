"use client";

import { menu } from "../recipes/menu-data";
import { useSharedData } from "../useSharedData";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MAX_CANDIDATES = 3;
const STORAGE_KEY = "crypt-meal-plan";

type AllRecipe = { id: string; name: string; category: string };

const allRecipes: AllRecipe[] = menu.flatMap((cat) =>
  cat.recipes.map((r) => ({ id: `${cat.slug}__${r.name}`, name: r.name, category: cat.name }))
);

type PlanState = Record<string, { candidates: string[]; final: string | null }>;

function emptyPlan(): PlanState {
  const plan: PlanState = {};
  for (const day of DAYS) plan[day] = { candidates: [], final: null };
  return plan;
}

export function MealPlanner() {
  const [plan, setPlan] = useSharedData<PlanState>(STORAGE_KEY, emptyPlan());

  if (!plan) return null;

  function toggleCandidate(day: string, id: string) {
    setPlan((prev) => {
      if (!prev) return prev;
      const slot = prev[day];
      const isIn = slot.candidates.includes(id);
      let candidates: string[];
      if (isIn) {
        candidates = slot.candidates.filter((c) => c !== id);
      } else {
        if (slot.candidates.length >= MAX_CANDIDATES) return prev;
        candidates = [...slot.candidates, id];
      }
      const final = slot.final && candidates.includes(slot.final) ? slot.final : null;
      return { ...prev, [day]: { candidates, final } };
    });
  }

  function setFinal(day: string, id: string) {
    setPlan((prev) => (prev ? { ...prev, [day]: { ...prev[day], final: id } } : prev));
  }

  return (
    <div style={{ display: "grid", gap: "1.6rem" }}>
      {DAYS.map((day) => {
        const slot = plan[day];
        const finalRecipe = slot.final ? allRecipes.find((r) => r.id === slot.final) : null;

        return (
          <div
            key={day}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem 1.2rem",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: "0.8rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: "1.3rem",
                  color: "#111",
                }}
              >
                {day}
              </span>
              {finalRecipe && (
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "#8800ff",
                    textTransform: "uppercase",
                  }}
                >
                  Locked in: {finalRecipe.name}
                </span>
              )}
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                color: "#888",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Options (pick up to {MAX_CANDIDATES})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: slot.candidates.length ? "1rem" : 0 }}>
              {allRecipes.map((r) => {
                const checked = slot.candidates.includes(r.id);
                const disabled = !checked && slot.candidates.length >= MAX_CANDIDATES;
                return (
                  <label
                    key={r.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      border: "1px solid " + (checked ? "#8800ff" : "#ccc"),
                      borderRadius: "5px",
                      padding: "0.3rem 0.6rem",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.95rem",
                      color: disabled ? "#bbb" : "#222",
                      opacity: disabled ? 0.6 : 1,
                      cursor: disabled ? "default" : "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleCandidate(day, r.id)}
                    />
                    {r.name}
                  </label>
                );
              })}
            </div>

            {slot.candidates.length > 0 && (
              <>
                <div
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    color: "#888",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Final pick
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {slot.candidates.map((id) => {
                    const r = allRecipes.find((x) => x.id === id)!;
                    const isFinal = slot.final === id;
                    return (
                      <label
                        key={id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          border: "1.5px solid " + (isFinal ? "#111" : "#ccc"),
                          borderRadius: "5px",
                          padding: "0.3rem 0.6rem",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: isFinal ? 600 : 400,
                          fontSize: "0.95rem",
                          color: "#111",
                          background: isFinal ? "rgba(0,0,0,0.06)" : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name={`final-${day}`}
                          checked={isFinal}
                          onChange={() => setFinal(day, id)}
                        />
                        {r.name}
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
