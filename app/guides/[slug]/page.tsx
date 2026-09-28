import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/extras";
import { guideContent } from "@/lib/guideContent";
import ExtraPage, { extraMetadata } from "@/components/ExtraPage";

export function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  return guide ? extraMetadata(guide) : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  const sections = guideContent[slug];
  if (!guide || !sections) notFound();

  // Step numbers run continuously across sections.
  const offsets = sections.map((_, i) => sections.slice(0, i).reduce((sum, sec) => sum + sec.steps.length, 0));

  return (
    <ExtraPage extra={guide}>
      {sections.map((section, si) => (
        <section key={section.label}>
          <div className="section-label">{"// "}{section.label}</div>
          {section.steps.map((step, i) => {
            const n = offsets[si] + i + 1;
            return (
              <div key={step.title} className="step">
                <div className="step-num">{String(n).padStart(2, "0")}</div>
                <div>
                  <h2 className="step-title">{step.title}</h2>
                  <div className="step-body">{step.body}</div>
                  {step.links && (
                    <div className="step-links">
                      {step.links.map(l => <Link key={l.href} href={l.href} className="tool-btn small">{l.label} →</Link>)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      ))}
      <p className="tool-note" style={{ marginTop: "1.5rem" }}>
        General information, not legal, medical, or financial advice — laws vary by state. For anything with real stakes,
        use this to walk into a conversation with a professional informed.
      </p>
    </ExtraPage>
  );
}
