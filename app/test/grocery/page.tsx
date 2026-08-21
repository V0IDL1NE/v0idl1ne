import type { Metadata } from "next";
import { SectionCard } from "../SectionCard";
import { EditableList } from "../EditableList";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function GroceryPage() {
  return (
    <SectionCard title="Grocery List">
      <EditableList storageKey="crypt-grocery" />
    </SectionCard>
  );
}
