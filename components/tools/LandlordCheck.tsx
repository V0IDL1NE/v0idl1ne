"use client";

import { useState } from "react";
import Link from "next/link";

type Verdict = "USUALLY ILLEGAL" | "ILLEGAL EVERYWHERE" | "DEPENDS" | "USUALLY LEGAL";

type Situation = {
  id: string;
  label: string;
  verdict: Verdict;
  rule: string;
  todo: string[];
  links: { href: string; label: string }[];
};

const SITUATIONS: Situation[] = [
  {
    id: "entry",
    label: "Came into my place without notice",
    verdict: "USUALLY ILLEGAL",
    rule: "Almost every state requires advance notice — usually 24 to 48 hours — before a landlord enters, except for real emergencies like fire, flooding, or a gas leak. Routine repairs and \"checking on things\" aren't emergencies.",
    todo: [
      "Write down the date, time, and what happened",
      "Email or text the landlord: notice is required before entry, citing your state's landlord-tenant law",
      "If it keeps happening, it can count as harassment or a breach of your lease — contact your local housing authority or tenant union",
    ],
    links: [{ href: "/blog/landlord-rights", label: "WHAT LANDLORDS CAN'T DO" }, { href: "/blog/lease-clauses", label: "LEASE ACCESS CLAUSES" }],
  },
  {
    id: "deposit",
    label: "Kept my deposit or won't say why",
    verdict: "USUALLY ILLEGAL",
    rule: "Most states set a deadline to return the deposit (commonly 14–30 days after move-out, up to 45–60 in some) and require an itemized list of deductions. Many states make the landlord return the whole deposit — sometimes with a penalty — if they miss the deadline or skip the itemization.",
    todo: [
      "Look up your state's deposit deadline: search \"[your state] security deposit return law\"",
      "Send a written demand letter with your forwarding address and the deadline",
      "Pull out your move-in and move-out photos",
      "If they don't pay, small claims court is built for exactly this — no lawyer needed",
    ],
    links: [{ href: "/blog/small-claims-court", label: "SMALL CLAIMS COURT" }, { href: "/printables/move-in-inspection", label: "MOVE-IN CHECKLIST" }],
  },
  {
    id: "wear",
    label: "Charging my deposit for normal wear and tear",
    verdict: "USUALLY ILLEGAL",
    rule: "Deductions are only allowed for damage beyond normal wear and tear. Faded or scuffed paint, carpet worn from normal use, small nail holes, and worn fixtures are wear and tear. Holes in walls, broken fixtures, and pet or spill stains are damage.",
    todo: [
      "Ask for the itemized list with receipts or estimates in writing",
      "Match each charge against your move-in photos and checklist",
      "Dispute the specific items in writing; small claims if they won't budge",
    ],
    links: [{ href: "/blog/landlord-rights", label: "WEAR VS DAMAGE" }],
  },
  {
    id: "lockout",
    label: "Changed the locks, removed my stuff, or shut off utilities",
    verdict: "ILLEGAL EVERYWHERE",
    rule: "This is a \"self-help eviction\" and it's illegal in every state. The only legal way to remove a tenant is through a court: written notice, a court case, a judgment, and a sheriff carrying it out.",
    todo: [
      "If you're locked out or without heat or water, call the police non-emergency line and your local housing authority now",
      "Photograph everything and save every text",
      "Many states let you sue for damages — often a multiple of monthly rent. A local legal aid office can help for free",
    ],
    links: [{ href: "/blog/landlord-rights", label: "SELF-HELP EVICTIONS" }],
  },
  {
    id: "evict",
    label: "Told me to get out",
    verdict: "DEPENDS",
    rule: "A landlord can end a tenancy for legal reasons, but they have to follow the process: proper written notice (from 3 to 30+ days depending on the reason and state), then a court case if you don't leave. A text or verbal \"you need to leave\" is not an eviction. You can stay until a sheriff arrives with a court order.",
    todo: [
      "Don't ignore court papers — missing the hearing usually means losing automatically",
      "Read the notice for the reason and the deadline",
      "Contact legal aid or a tenant rights organization immediately — many offer free eviction defense",
    ],
    links: [{ href: "/blog/landlord-rights", label: "EVICTION DUE PROCESS" }],
  },
  {
    id: "retaliation",
    label: "Raised rent or threatened eviction after I complained",
    verdict: "USUALLY ILLEGAL",
    rule: "Retaliating against a tenant for a legitimate complaint — about repairs, or to an inspector or housing authority — is illegal in most states. Many presume retaliation if the landlord takes action within 60–90 days (varies) of your complaint.",
    todo: [
      "Gather the timeline: your complaint (in writing, with dates), then their response",
      "Keep paying rent on time so there's no legitimate reason for action",
      "Raise retaliation as a defense if they file an eviction; contact legal aid",
    ],
    links: [{ href: "/blog/landlord-rights", label: "RETALIATION" }],
  },
  {
    id: "repairs",
    label: "Won't fix heat, water, plumbing, mold, or pests",
    verdict: "USUALLY ILLEGAL",
    rule: "Landlords have to keep a rental habitable: safe structure, working heat, hot and cold water, working plumbing, and (in most states) no pest infestation. Mold caused by a leak the landlord ignored is their problem, not yours.",
    todo: [
      "Request the repair in writing and keep a copy — the clock starts there",
      "Photograph the problem with dates",
      "Allow reasonable time (often 14–30 days; less for emergencies like no heat in winter)",
      "Then check your state's options: repair-and-deduct, rent escrow, a code inspection, or breaking the lease. Don't just stop paying rent without following your state's process",
    ],
    links: [{ href: "/blog/mold-habitability", label: "MOLD & HABITABILITY" }, { href: "/blog/landlord-rights", label: "REQUIRED REPAIRS" }],
  },
  {
    id: "discrimination",
    label: "Refused to rent to me or treated me differently",
    verdict: "USUALLY ILLEGAL",
    rule: "The federal Fair Housing Act bans discrimination based on race, color, national origin, religion, sex, disability, or having kids. Many states add more — like sexual orientation, gender identity, or source of income (housing vouchers).",
    todo: [
      "Write down what was said, when, and by whom; save listings and messages",
      "File a complaint with HUD (free, within one year) or your state fair housing agency",
    ],
    links: [{ href: "/blog/landlord-rights", label: "DISCRIMINATION" }],
  },
  {
    id: "rent-raise",
    label: "Raised my rent",
    verdict: "DEPENDS",
    rule: "During a fixed-term lease, rent generally can't go up unless the lease allows it. On a month-to-month tenancy, most places allow increases with written notice — often 30 days, sometimes 60–90 for big increases. Some cities and states cap increases (rent control or stabilization). Raising rent as retaliation is a different story — see above.",
    todo: [
      "Check your lease for a rent increase clause and the end date",
      "Look up your state and city's notice requirements and any rent caps",
      "If the notice was too short, point that out in writing",
    ],
    links: [{ href: "/blog/lease-clauses", label: "LEASE CLAUSES" }],
  },
  {
    id: "fees",
    label: "Charging a big fee to break my lease",
    verdict: "DEPENDS",
    rule: "Early termination fees are legal if they're in the lease. But in many states the landlord has to try to re-rent the unit (\"duty to mitigate\") and can't collect rent from you for months someone else is paying for. Military orders (federally) and, in many states, domestic violence let you break a lease early by law.",
    todo: [
      "Read the termination clause in your lease",
      "Give written notice and offer to help find a replacement tenant",
      "Ask whether your state requires the landlord to mitigate",
    ],
    links: [{ href: "/blog/lease-clauses", label: "EARLY TERMINATION FEES" }],
  },
];

const VERDICT_CLASS: Record<Verdict, string> = {
  "ILLEGAL EVERYWHERE": "bad",
  "USUALLY ILLEGAL": "bad",
  DEPENDS: "warn",
  "USUALLY LEGAL": "ok",
};

export default function LandlordCheck() {
  const [selected, setSelected] = useState<string | null>(null);
  const sit = SITUATIONS.find(s => s.id === selected);

  return (
    <>
      <div className="tool-panel">
        <span className="tool-label">WHAT DID YOUR LANDLORD DO?</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {SITUATIONS.map(s => (
            <button key={s.id} type="button" className={`tool-btn${selected === s.id ? " active" : ""}`}
              style={{ textAlign: "left" }} onClick={() => setSelected(s.id)}>
              {s.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {sit && (
        <div aria-live="polite">
          <div className={`result ${VERDICT_CLASS[sit.verdict]}`}>
            <div className="result-big">{sit.verdict}</div>
            <p>{sit.rule}</p>
          </div>
          <div className="section-label">{"// WHAT TO DO"}</div>
          <ol className="num-list" style={{ color: "#a090c0", fontSize: "0.9rem", lineHeight: 1.7, paddingLeft: "1.2rem" }}>
            {sit.todo.map(t => <li key={t} style={{ marginBottom: "0.4rem" }}>{t}</li>)}
          </ol>
          <div className="step-links">
            {sit.links.map(l => <Link key={l.href + l.label} href={l.href} className="tool-btn small">{l.label} →</Link>)}
          </div>
        </div>
      )}

      <p className="tool-note" style={{ marginTop: "2rem" }}>
        These are the general rules in most US states — your state and city can differ, and some are stronger. Search
        &ldquo;[your state] landlord tenant handbook&rdquo;: most states publish a free one. For an eviction or anything
        with money on the line, local legal aid is free if you qualify.
      </p>
    </>
  );
}
