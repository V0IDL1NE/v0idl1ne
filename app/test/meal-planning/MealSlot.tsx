"use client";

import { useState } from "react";

type AllRecipe = { id: string; name: string; category: string };
type Slot = { candidates: string[]; final: string | null };

const MAX_CANDIDATES = 3;

export function MealSlot({
  meal,
  slot,
  allRecipes,
  onToggleCandidate,
  onRemoveCandidate,
  onSetFinal,
  onClearFinal,
}: {
  meal: string;
  slot: Slot;
  allRecipes: AllRecipe[];
  onToggleCandidate: (id: string) => void;
  onRemoveCandidate: (id: string) => void;
  onSetFinal: (id: string) => void;
  onClearFinal: () => void;
}) {
  const [search, setSearch] = useState("");
  const finalRecipe = slot.final ? allRecipes.find((r) => r.id === slot.final) : null;

  const matches = allRecipes.filter((r) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
  });
  const filtered = matches.slice(0, 5);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "0.9rem 1.1rem",
        background: "rgba(255,255,255,0.5)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.6rem" }}>
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
            onClick={onClearFinal}
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
                  <input type="radio" name={`final-${meal}`} checked={false} onChange={() => onSetFinal(id)} />
                  {r.name}
                </label>
                <button
                  onClick={() => onRemoveCandidate(id)}
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
              marginBottom: "0.5rem",
            }}
          >
            Pick {MAX_CANDIDATES - slot.candidates.length} more option{MAX_CANDIDATES - slot.candidates.length === 1 ? "" : "s"}
          </div>

          {slot.candidates.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.6rem" }}>
              {slot.candidates.map((id) => {
                const r = allRecipes.find((x) => x.id === id)!;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      border: "1px solid #8800ff",
                      borderRadius: "5px",
                      padding: "0.2rem 0.4rem 0.2rem 0.5rem",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.85rem",
                      color: "#222",
                    }}
                  >
                    {r.name}
                    <button
                      onClick={() => onRemoveCandidate(id)}
                      aria-label="Remove option"
                      style={{ border: "none", background: "none", color: "#888", cursor: "pointer", fontSize: "0.85rem", lineHeight: 1 }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes…"
            style={{
              width: "100%",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem",
              padding: "0.35rem 0.6rem",
              border: "1px solid #999",
              borderRadius: "5px",
              background: "rgba(255,255,255,0.7)",
              color: "#111",
              marginBottom: "0.5rem",
              boxSizing: "border-box",
            }}
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {filtered.length === 0 && (
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#999" }}>
                No matches.
              </div>
            )}
            {filtered.map((r) => {
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
                  <input type="checkbox" checked={checked} disabled={disabled} onChange={() => onToggleCandidate(r.id)} />
                  {r.name}
                </label>
              );
            })}
          </div>
          {matches.length > filtered.length && (
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.75rem",
                color: "#999",
                marginTop: "0.4rem",
              }}
            >
              +{matches.length - filtered.length} more — keep typing to narrow it down
            </div>
          )}
        </div>
      )}
    </div>
  );
}
