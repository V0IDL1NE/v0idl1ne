import type { Metadata } from "next";
import { printables, tools, guides } from "@/lib/extras";
import PageShell from "@/components/PageShell";
import ExtrasLinks from "@/components/ExtrasLinks";

export const metadata: Metadata = {
  title: "Free Printables: Home Emergency Sheet, Move-In Checklist, Rights Card",
  description: "Free printable checklists — a home emergency sheet, a renter's move-in inspection form, and a know-your-rights wallet card.",
  alternates: { canonical: "/printables" },
};

export default function PrintablesIndex() {
  return (
    <PageShell
      eyebrow="PRINTABLES"
      title="Printables"
      intro="Paper still works when the power's out or your phone's dead. Free — print them, fill them in, keep them where you'll need them."
    >
      <ExtrasLinks items={printables} />
      <ExtrasLinks items={guides} label="// SITUATION GUIDES" />
      <ExtrasLinks items={tools} label="// TOOLS" />
    </PageShell>
  );
}
