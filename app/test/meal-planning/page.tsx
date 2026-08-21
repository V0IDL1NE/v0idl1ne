import type { Metadata } from "next";
import { SectionCard } from "../SectionCard";
import { MealPlanner } from "./MealPlanner";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function MealPlanningPage() {
  return (
    <SectionCard title="Meal Planning">
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "1rem",
          color: "#555",
          marginBottom: "1.8rem",
          marginTop: "-1rem",
        }}
      >
        Pick up to three options for a day, then lock one in as the final pick.
      </p>
      <MealPlanner />
    </SectionCard>
  );
}
