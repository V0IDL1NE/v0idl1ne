import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools } from "@/lib/extras";
import ExtraPage, { extraMetadata } from "@/components/ExtraPage";
import CircuitLoad from "@/components/tools/CircuitLoad";
import DebtPayoff from "@/components/tools/DebtPayoff";
import WhereToGetCare from "@/components/tools/WhereToGetCare";
import LandlordCheck from "@/components/tools/LandlordCheck";
import DeadlineChecker from "@/components/tools/DeadlineChecker";

const COMPONENTS: Record<string, React.ComponentType> = {
  "circuit-load-calculator": CircuitLoad,
  "debt-payoff-calculator": DebtPayoff,
  "where-to-get-care": WhereToGetCare,
  "can-my-landlord-do-that": LandlordCheck,
  "deadline-checker": DeadlineChecker,
};

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  return tool ? extraMetadata(tool) : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  const Tool = COMPONENTS[slug];
  if (!tool || !Tool) notFound();

  return (
    <ExtraPage extra={tool}>
      <Tool />
    </ExtraPage>
  );
}
