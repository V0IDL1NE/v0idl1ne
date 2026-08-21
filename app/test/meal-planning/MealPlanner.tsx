"use client";

import { menu } from "../recipes/menu-data";
import { useSharedData } from "../useSharedData";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner"];
const MAX_CANDIDATES = 3;
const STORAGE_KEY = "crypt-meal-plan";

type AllRecipe = { id: string; name: string; category: string };

const allRecipes: AllRecipe[] = menu.flatMap((cat) =>
  cat.recipes.map((r) => ({ id: `${cat.slug}__${r.name}`, name: r.name, category: cat.name }))
);

type Slot = { candidates: string[]; final: string | null };
type PlanState = Record<string, Slot>;

function slotKey(day: string, meal: string) {
  return `${day}::${meal}`;
}

function emptyPlan(): PlanState {
  const plan: PlanState = {};
  for (const day of DAYS) {
    for (const meal of MEALS) {
      plan[slotKey(day, meal)] = { candidates: [], final: null };
    }
  }
  return plan;
}

export function MealPlanner() {
  const [plan, setPlan] = useSharedData<PlanState>(STORAGE_KEY, emptyPlan());

  if (!plan) return null;
  const currentPlan = plan;

  function updateSlot(key: string, next: Partial<Slot>) {
    setPlan((prev) => {
      if (!prev) return prev;
      const slot = prev[key] ?? { candidates: [], final: null };
      return { ...prev, [key]: { ...slot, ...next } };
    });
  }

  function toggleCandidate(key: string, id: string) {
    const slot = currentPlan[key] ?? { candidates: [], final: null };
    if (slot.candidates.includes(id)) {
      updateSlot(key, { candidates: slot.candidates.filter((c) => c !== id) });
    } else if (slot.candidates.length < MAX_CANDIDATES) {
      updateSlot(key, { candidates: [...slot.candidates, id] });
    }
  }

  function removeCandidate(key: string, id: string) {
    const slot = currentPlan[key] ?? { candidates: [], final: null };
    updateSlot(key, {
      candidates: slot.candidates.filter((c) => c !== id),
      final: slot.final === id ? null : slot.final,
    });
  }

  function setFinal(key: string, id: string) {
    updateSlot(key, { final: id });
  }

  function clearFinal(key: string) {
    updateSlot(key, { final: null });
  }

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {DAYS.map((day) => (
        <div key={day}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "1.4rem",
              color: "#111",
              marginBottom: "0.7rem",
            }}
          >
            {day}
          </div>

          <div style={{ display: "grid", gap: "0.8rem" }}>
            {MEALS.map((meal) => {
              const key = slotKey(day, meal);
              const slot = currentPlan[key] ?? { candidates: [], final: null };
              const finalRecipe = slot.final ? allRecipes.find((r) => r.id === slot.final) : null;

              return (
                <div
                  key={meal}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "0.9rem 1.1rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        color: "#8800ff",
                        textTransform: "uppercase",
                      }}
                    >
                      {meal}
                    </span>
                  </div>

                  {finalRecipe ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem", color: "#111" }}>
                        {finalRecipe.name}
                      </span>
                      <button
                        onClick={() => clearFinal(key)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "#888",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          textDecoration: "underline",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        Change
                      </button>
                    </div>
                  ) : slot.candidates.length === MAX_CANDIDATES ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {slot.candidates.map((id) => {
                        const r = allRecipes.find((x) => x.id === id)!;
                        return (
                          <div
                            key={id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              padding: "0.3rem 0.5rem 0.3rem 0.6rem",
                            }}
                          >
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "0.95rem",
                                color: "#222",
                                cursor: "pointer",
                              }}
                            >
                              <input type="radio" name={`final-${key}`} checked={false} onChange={() => setFinal(key, id)} />
                              {r.name}
                            </label>
                            <button
                              onClick={() => removeCandidate(key, id)}
                              aria-label="Remove option"
                              style={{ border: "none", background: "none", color: "#aaa", cursor: "pointer", fontSize: "0.9rem", lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          color: "#999",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Pick {MAX_CANDIDATES - slot.candidates.length} more option{MAX_CANDIDATES - slot.candidates.length === 1 ? "" : "s"}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {allRecipes.map((r) => {
                          const checked = slot.candidates.includes(r.id);
                          const disabled = !checked && slot.candidates.length >= MAX_CANDIDATES;
                          return (
                            <label
                              key={r.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.35rem",
                                border: "1px solid " + (checked ? "#8800ff" : "#ccc"),
                                borderRadius: "5px",
                                padding: "0.25rem 0.5rem",
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "0.9rem",
                                color: disabled ? "#bbb" : "#222",
                                opacity: disabled ? 0.6 : 1,
                                cursor: disabled ? "default" : "pointer",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                onChange={() => toggleCandidate(key, r.id)}
                              />
                              {r.name}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
