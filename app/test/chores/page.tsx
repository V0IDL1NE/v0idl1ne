import type { Metadata } from "next";
import { SectionCard } from "../SectionCard";
import { EditableList } from "../EditableList";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function ChoresPage() {
  return (
    <SectionCard title="Chores">
      <EditableList
        storageKey="crypt-chores"
        defaultItems={["Dishes", "Laundry", "Take out trash", "Vacuum"]}
      />
    </SectionCard>
  );
}
