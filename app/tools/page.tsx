import type { Metadata } from "next";
import Link from "next/link";
import { tools, guides, printables } from "@/lib/extras";
import PageShell from "@/components/PageShell";
import ExtrasLinks from "@/components/ExtrasLinks";

export const metadata: Metadata = {
  title: "Free Tools: Circuit Load, Debt Payoff, Tenant Rights, Deadlines",
  description: "Free, no-signup tools that turn V0IDL1NE posts into answers for your situation — circuit load, debt payoff, where to get care, tenant rights, and consumer deadlines.",
  alternates: { canonical: "/tools" },
};

export default function ToolsIndex() {
  return (
    <PageShell
      eyebrow="TOOLS"
      title="Tools"
      intro="The posts tell you how it works. These tell you what it means for you. Free, no signup, nothing saved."
    >
      <ExtrasLinks items={tools} />
      <ExtrasLinks items={guides} label="// SITUATION GUIDES" />
      <ExtrasLinks items={printables} label="// PRINTABLES" />
      <div className="section-label">{"// FOR YOUR PC"}</div>
      <Link href="/downloads" className="card-link">
        <div className="card-tag">{"// DOWNLOAD"}</div>
        <div className="card-title">Free Windows tools</div>
        <p className="card-desc">Specs report, disk space finder, network diagnostics, and a startup manager. Single-file, no installer.</p>
      </Link>
    </PageShell>
  );
}
