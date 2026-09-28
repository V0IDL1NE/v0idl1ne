"use client";

import { useState } from "react";
import Link from "next/link";

/* ── date helpers (local dates only, no time-of-day) ── */
function parse(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}
function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function addYears(d: Date, n: number): Date {
  const r = new Date(d);
  r.setFullYear(r.getFullYear() + n);
  return r;
}
/* Count forward n days, skipping the weekdays in `skip` (0 = Sunday, 6 = Saturday). */
function addBusinessDays(d: Date, n: number, skip: number[]): Date {
  let r = new Date(d);
  let left = n;
  while (left > 0) {
    r = addDays(r, 1);
    if (!skip.includes(r.getDay())) left--;
  }
  return r;
}
function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
function today(): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}
function daysLeft(d: Date): number {
  return Math.round((d.getTime() - today().getTime()) / 86_400_000);
}

type Line = { label: string; date: Date; note?: string };

type Situation = {
  id: string;
  label: string;
  inputs: { key: string; label: string }[];
  compute: (dates: Record<string, Date>) => Line[];
  explain: string;
  link: { href: string; label: string };
};

const SITUATIONS: Situation[] = [
  {
    id: "cc-dispute",
    label: "Dispute a credit card charge (wrong amount, never delivered, billing error)",
    inputs: [{ key: "statement", label: "DATE OF THE STATEMENT THE CHARGE FIRST APPEARED ON" }],
    compute: d => [{ label: "Written dispute must reach your card issuer by", date: addDays(d.statement, 60) }],
    explain: "The Fair Credit Billing Act gives you 60 days from when the statement with the error was sent. Send it in writing to the \"billing inquiries\" address on your statement — a phone call alone may not preserve your legal rights. You don't have to pay the disputed amount while it's investigated. Fraud on a credit card is capped at $50 no matter when you report it, and most issuers waive even that.",
    link: { href: "/blog/credit-card-chargebacks", label: "CREDIT VS DEBIT DISPUTES" },
  },
  {
    id: "debit-lost",
    label: "My debit card was lost or stolen",
    inputs: [
      { key: "learned", label: "DATE YOU REALIZED IT WAS LOST OR STOLEN" },
      { key: "statement", label: "DATE OF THE STATEMENT SHOWING THE FIRST BAD CHARGE (IF ANY)" },
    ],
    compute: d => {
      const lines: Line[] = [
        { label: "Report by this date and your max loss is $50", date: addBusinessDays(d.learned, 2, [0, 6]) },
      ];
      if (d.statement) lines.push({ label: "After that, report by this date to cap your loss at $500", date: addDays(d.statement, 60), note: "After this, losses on later charges can be unlimited" });
      return lines;
    },
    explain: "Under the Electronic Fund Transfer Act (Regulation E), your liability for a lost or stolen debit card depends on how fast you report it: $50 within 2 business days of noticing, up to $500 after that, and potentially unlimited for charges after 60 days from the statement. Call the bank now, then follow up in writing. Business days here skip weekends; bank holidays add a day.",
    link: { href: "/blog/credit-card-chargebacks", label: "CREDIT VS DEBIT DISPUTES" },
  },
  {
    id: "debit-number",
    label: "Unauthorized debit charges — but I still have my card",
    inputs: [{ key: "statement", label: "DATE OF THE STATEMENT SHOWING THE FIRST BAD CHARGE" }],
    compute: d => [{ label: "Report by this date and you owe $0", date: addDays(d.statement, 60) }],
    explain: "If someone used your card number but the card itself was never lost, Regulation E puts your liability at $0 as long as you report within 60 days of the statement. After that, you can be on the hook for charges that happen after the 60 days. Don't wait for the statement — report as soon as you see it.",
    link: { href: "/blog/credit-card-chargebacks", label: "CREDIT VS DEBIT DISPUTES" },
  },
  {
    id: "cooling-off",
    label: "Cancel a sale made at my home or at a temporary booth (fair, hotel, etc.)",
    inputs: [{ key: "sale", label: "DATE OF THE SALE" }],
    compute: d => [{ label: "Cancel by midnight on", date: addBusinessDays(d.sale, 3, [0]) }],
    explain: "The FTC Cooling-Off Rule gives you 3 business days to cancel for a full refund on sales of $25+ made in your home, or $130+ at a temporary location like a hotel room, fair booth, or convention. Saturdays count as business days for this rule; Sundays and federal holidays don't. The seller must give you a cancellation form — mail it (keep proof) before the deadline. It doesn't cover normal store or website purchases.",
    link: { href: "/blog/return-policy-tricks", label: "RETURNS & THE COOLING-OFF RULE" },
  },
  {
    id: "debt-validation",
    label: "A debt collector contacted me — dispute window",
    inputs: [{ key: "received", label: "DATE YOU RECEIVED THEIR VALIDATION NOTICE" }],
    compute: d => [{ label: "Dispute in writing by", date: addDays(d.received, 30), note: "Disputing in writing makes them stop collecting until they verify the debt" }],
    explain: "Under the Fair Debt Collection Practices Act, collectors must send a validation notice. If you dispute the debt in writing within 30 days of receiving it, they have to pause collection until they send verification. Don't pay or admit the debt is yours before checking it — on old debt, a payment can restart the statute of limitations.",
    link: { href: "/blog/statute-of-limitations-basics", label: "OLD DEBT & THE CLOCK" },
  },
  {
    id: "credit-report",
    label: "I disputed something on my credit report — when do they have to answer?",
    inputs: [{ key: "filed", label: "DATE THE BUREAU RECEIVED YOUR DISPUTE" }],
    compute: d => [
      { label: "Bureau must finish investigating by", date: addDays(d.filed, 30) },
      { label: "Up to this date if you sent more info during the 30 days", date: addDays(d.filed, 45) },
    ],
    explain: "The Fair Credit Reporting Act gives credit bureaus 30 days to investigate a dispute (45 if you send additional information during that window). If they can't verify the item, it has to be corrected or removed. Dispute with each bureau that shows the error.",
    link: { href: "/blog/credit-score-factors", label: "WHAT MOVES YOUR SCORE" },
  },
  {
    id: "credit-drop-off",
    label: "When will a late payment or collection drop off my credit report?",
    inputs: [{ key: "delinquent", label: "DATE OF THE FIRST MISSED PAYMENT THAT LED TO IT" }],
    compute: d => [
      { label: "Late payments fall off around", date: addYears(d.delinquent, 7) },
      { label: "Collections and charge-offs fall off around", date: addDays(addYears(d.delinquent, 7), 180) },
    ],
    explain: "Most negative items can only be reported for about 7 years. For collection accounts and charge-offs the clock is 7 years plus 180 days from when you first fell behind — and it does not restart when a debt is sold or you make a payment. If something is older than this and still showing, dispute it.",
    link: { href: "/blog/credit-score-factors", label: "WHAT MOVES YOUR SCORE" },
  },
  {
    id: "debt-sol",
    label: "Can they still sue me over an old debt?",
    inputs: [{ key: "last", label: "DATE OF YOUR LAST PAYMENT ON THE DEBT" }],
    compute: d => [
      { label: "Shortest common limit (3 years)", date: addYears(d.last, 3) },
      { label: "Most common upper end (6 years)", date: addYears(d.last, 6), note: "A few states go up to 10 years for written contracts" },
    ],
    explain: "The statute of limitations on consumer debt is usually 3 to 6 years, depending on your state and the type of debt, and usually runs from your last payment or default. After it passes, a collector generally can't win a lawsuit — but a new payment or written acknowledgment can restart the clock in many states. If you're sued on time-barred debt, you have to raise it yourself as a defense.",
    link: { href: "/blog/statute-of-limitations-basics", label: "OLD DEBT & THE CLOCK" },
  },
  {
    id: "deposit",
    label: "My landlord still has my security deposit",
    inputs: [{ key: "moveout", label: "DATE YOU MOVED OUT AND RETURNED THE KEYS" }],
    compute: d => [
      { label: "Strictest states: due by", date: addDays(d.moveout, 14) },
      { label: "Many states: due by", date: addDays(d.moveout, 30) },
      { label: "Most lenient states: due by", date: addDays(d.moveout, 60) },
    ],
    explain: "Every state sets its own deadline for returning deposits with an itemized list of deductions — most fall between 14 and 30 days, a few allow up to 45 or 60. Search \"[your state] security deposit return deadline\" for the exact number. Miss it, and many states make the landlord return the full deposit, sometimes with a penalty.",
    link: { href: "/tools/can-my-landlord-do-that", label: "CAN MY LANDLORD DO THAT?" },
  },
];

export default function DeadlineChecker() {
  const [selected, setSelected] = useState<string>(SITUATIONS[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const sit = SITUATIONS.find(s => s.id === selected)!;

  const dates: Record<string, Date> = {};
  for (const inp of sit.inputs) {
    const d = parse(values[`${sit.id}:${inp.key}`] ?? "");
    if (d) dates[inp.key] = d;
  }
  const ready = sit.inputs[0] && dates[sit.inputs[0].key];
  const lines = ready ? sit.compute(dates) : [];

  return (
    <>
      <div className="tool-panel">
        <label className="tool-label" htmlFor="dl-sit">WHAT&apos;S THE SITUATION?</label>
        <select id="dl-sit" className="modal-select" value={selected} onChange={e => setSelected(e.target.value)}>
          {SITUATIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>

        {sit.inputs.map(inp => (
          <div key={inp.key} style={{ marginTop: "1rem", maxWidth: 320 }}>
            <label className="tool-label" htmlFor={`dl-${inp.key}`}>{inp.label}</label>
            <input id={`dl-${inp.key}`} type="date" className="modal-input" style={{ colorScheme: "dark" }}
              value={values[`${sit.id}:${inp.key}`] ?? ""}
              onChange={e => setValues({ ...values, [`${sit.id}:${inp.key}`]: e.target.value })} />
          </div>
        ))}
      </div>

      {lines.length > 0 && (
        <div aria-live="polite">
          {lines.map(l => {
            const left = daysLeft(l.date);
            const cls = left < 0 ? "bad" : left <= 7 ? "warn" : "ok";
            return (
              <div key={l.label} className={`result ${cls}`}>
                <div className="tool-label" style={{ marginBottom: "0.3rem" }}>{l.label.toUpperCase()}</div>
                <div className="result-big">{fmt(l.date)}</div>
                <p>
                  {left < 0 ? `Passed ${-left} day${left === -1 ? "" : "s"} ago.` : left === 0 ? "That's today." : `${left} day${left === 1 ? "" : "s"} from today.`}
                  {l.note ? ` ${l.note}.` : ""}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="tool-panel" style={{ marginTop: "1rem" }}>
        <span className="tool-label">THE RULE</span>
        <p style={{ color: "#a090c0", fontSize: "0.9rem", lineHeight: 1.7 }}>{sit.explain}</p>
        <div className="step-links">
          <Link href={sit.link.href} className="tool-btn small">{sit.link.label} →</Link>
        </div>
      </div>

      <p className="tool-note">
        Dates are estimates for planning — federal holidays and how your bank or state counts days can shift them. When a
        deadline is close, act now and in writing rather than cutting it fine.
      </p>
    </>
  );
}
