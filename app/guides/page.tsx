import type { Metadata } from "next";
import { guides, tools, printables } from "@/lib/extras";
import PageShell from "@/components/PageShell";
import ExtrasLinks from "@/components/ExtrasLinks";

export const metadata: Metadata = {
  title: "Situation Guides: Step-by-Step for When It's Happening to You",
  description: "Pulled over, first apartment, huge medical bill, buying a used car — the steps in order, with the scripts and the posts behind them.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  return (
    <PageShell
      eyebrow="SITUATION GUIDES"
      title="It's happening to you"
      intro="Step-by-step for the moments people google in a panic. The steps in order, what to say, and the full breakdown behind each one."
    >
      <ExtrasLinks items={guides} />
      <ExtrasLinks items={tools} label="// TOOLS" />
      <ExtrasLinks items={printables} label="// PRINTABLES" />
    </PageShell>
  );
}
