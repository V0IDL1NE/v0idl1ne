import type { Metadata } from "next";
import { SectionCard } from "../SectionCard";
import { EditableList } from "../EditableList";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

const people = [
  { name: "Joey", key: "crypt-gifts-joey" },
  { name: "Skyler", key: "crypt-gifts-skyler" },
  { name: "Lilith", key: "crypt-gifts-lilith" },
];

export default function GiftsPage() {
  return (
    <SectionCard title="Gift Ideas">
      <div style={{ display: "grid", gap: "2.2rem" }}>
        {people.map((p, i) => (
          <div key={p.key}>
            {i > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 0 1.6rem",
                  color: "#bbb",
                  fontSize: "0.8rem",
                }}
              >
                ❧
              </div>
            )}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: "1.3rem",
                color: "#111",
                marginBottom: "0.7rem",
              }}
            >
              {p.name}
            </div>
            <EditableList storageKey={p.key} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
