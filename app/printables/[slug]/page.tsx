import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { printables } from "@/lib/extras";
import ExtraPage, { extraMetadata } from "@/components/ExtraPage";
import PrintButton from "@/components/printables/PrintButton";
import { HomeEmergencySheet, MoveInInspection, KnowYourRightsCard } from "@/components/printables/Sheets";

const SHEETS: Record<string, React.ComponentType> = {
  "home-emergency-sheet": HomeEmergencySheet,
  "move-in-inspection": MoveInInspection,
  "know-your-rights-card": KnowYourRightsCard,
};

export function generateStaticParams() {
  return printables.map(p => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const printable = printables.find(p => p.slug === slug);
  return printable ? extraMetadata(printable) : {};
}

export default async function PrintablePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const printable = printables.find(p => p.slug === slug);
  const Sheet = SHEETS[slug];
  if (!printable || !Sheet) notFound();

  return (
    <ExtraPage extra={printable}>
      <PrintButton />
      <Sheet />
    </ExtraPage>
  );
}
