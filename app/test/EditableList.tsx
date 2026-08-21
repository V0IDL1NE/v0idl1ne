"use client";

import { useState } from "react";
import { useSharedData } from "@/lib/useSharedData";

type Item = {
  id: string;
  text: string;
  done: boolean;
};

export function EditableList({
  dataKey,
  defaultItems = [],
}: {
  dataKey: string;
  defaultItems?: string[];
}) {
  const [items, setItems] = useSharedData<Item[]>(
    dataKey,
    defaultItems.map((text) => ({ id: crypto.randomUUID(), text, done: false }))
  );
  const [draft, setDraft] = useState("");

  if (items === null) return null;

  function addItem() {
    const text = draft.trim();
    if (!text) return;
    setItems((prev) => [...(prev ?? []), { id: crypto.randomUUID(), text, done: false }]);
    setDraft("");
  }

  function toggle(id: string) {
    setItems((prev) => (prev ?? []).map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  }

  function remove(id: string) {
    setItems((prev) => (prev ?? []).filter((it) => it.id !== id));
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.2rem" }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add an item…"
          style={{
            flex: 1,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.05rem",
            padding: "0.5rem 0.8rem",
            border: "1px solid #999",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.6)",
            color: "#111",
          }}
        />
        <button
          onClick={addItem}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1.5px solid #2a2a2a",
            background: "linear-gradient(180deg, #4a4a4a, #141414)",
            color: "#f0f0f0",
            fontFamily: "var(--font-condensed, sans-serif)",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#888" }}>
          Nothing here yet.
        </div>
      )}

      <ul style={{ display: "grid", gap: "0.5rem" }}>
        {items.map((it) => (
          <li
            key={it.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "0.5rem 0.8rem",
              background: it.done ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.5)",
            }}
          >
            <input type="checkbox" checked={it.done} onChange={() => toggle(it.id)} style={{ flexShrink: 0 }} />
            <span
              style={{
                flex: 1,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.05rem",
                color: it.done ? "#999" : "#222",
                textDecoration: it.done ? "line-through" : "none",
              }}
            >
              {it.text}
            </span>
            <button
              onClick={() => remove(it.id)}
              aria-label="Remove"
              style={{
                border: "none",
                background: "none",
                color: "#aaa",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1,
                padding: "0.2rem",
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
