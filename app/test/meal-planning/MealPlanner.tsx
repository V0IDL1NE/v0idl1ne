"use client";

import { menu } from "../recipes/menu-data";
import { useSharedData } from "@/lib/useSharedData";
import { MealSlot } from "./MealSlot";

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
              return (
                <MealSlot
                  key={meal}
                  meal={meal}
                  slot={slot}
                  allRecipes={allRecipes}
                  onToggleCandidate={(id) => toggleCandidate(key, id)}
                  onRemoveCandidate={(id) => removeCandidate(key, id)}
                  onSetFinal={(id) => setFinal(key, id)}
                  onClearFinal={() => clearFinal(key)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
