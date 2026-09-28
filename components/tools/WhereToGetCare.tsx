"use client";

import { useState } from "react";
import Link from "next/link";

type Outcome = "911" | "ER" | "URGENT" | "DOCTOR" | "TELEHEALTH";

type Question = {
  id: string;
  ask: string;
  signs?: string[];
  yes: Outcome | string;
  no: Outcome | string;
};

/* Order matters: the most dangerous possibilities are ruled out first. */
const QUESTIONS: Question[] = [
  {
    id: "life",
    ask: "Is any of this happening right now?",
    signs: [
      "Chest pain or pressure",
      "Trouble breathing",
      "Stroke signs: face drooping, arm weakness, slurred speech, sudden severe headache",
      "Passed out or hard to wake",
      "Throat swelling / severe allergic reaction",
      "Heavy bleeding that won't stop",
      "Major injury: car crash, bad fall, serious head injury",
      "Thoughts of suicide or harming someone",
    ],
    yes: "911",
    no: "kid",
  },
  {
    id: "kid",
    ask: "Is this a young child with any of these?",
    signs: [
      "Any fever in a baby under 3 months",
      "Fever of 103°F+ in a child 3 months to 3 years",
      "Breathing fast or struggling to breathe",
      "No wet diapers, no tears, sunken eyes",
      "A seizure",
      "Very limp, unresponsive, or hard to wake",
      "Stiff neck with a fever",
    ],
    yes: "ER",
    no: "burn",
  },
  {
    id: "burn",
    ask: "Is it a burn on the face, hands, genitals, or a joint — or a large or deep burn?",
    yes: "ER",
    no: "hands",
  },
  {
    id: "hands",
    ask: "Does someone need to physically examine you or run a test today?",
    signs: [
      "Cut that might need stitches",
      "Possible broken bone or sprain (needs an x-ray)",
      "Strep, flu, or COVID test",
      "Belly pain",
      "Something that's getting worse despite treatment",
    ],
    yes: "URGENT",
    no: "wait",
  },
  {
    id: "wait",
    ask: "Can it safely wait 1–3 days — a follow-up, an ongoing condition, or something that's been going on a while?",
    yes: "DOCTOR",
    no: "TELEHEALTH",
  },
];

const OUTCOMES: Record<Outcome, { cls: string; big: string; body: React.ReactNode }> = {
  "911": {
    cls: "bad",
    big: "Call 911 or go to the ER now",
    body: (
      <>
        Don&apos;t drive yourself with chest pain, stroke signs, or trouble breathing — call 911. The ER has to treat you regardless
        of insurance or ability to pay (EMTALA). For a mental health crisis, you can also call or text <strong>988</strong>.
        Sort out the bill later — there are real ways to cut it.
      </>
    ),
  },
  ER: {
    cls: "bad",
    big: "Go to the ER",
    body: <>For kids, a pediatric ER or pediatric urgent care is often better equipped than a general urgent care. If you&apos;re unsure, call your pediatrician&apos;s after-hours line on the way.</>,
  },
  URGENT: {
    cls: "warn",
    big: "Urgent care",
    body: <>Urgent care has x-ray, basic labs, can stitch and prescribe, and is open evenings and weekends — for a fraction of an ER bill. Check that it&apos;s in-network first (your insurer&apos;s app or the number on your card). If it turns out to be worse than it looked, they&apos;ll send you to the ER.</>,
  },
  DOCTOR: {
    cls: "ok",
    big: "Call your doctor",
    body: <>Your primary care office is the cheapest option and has your history. Many can see you within a day or two, and most have a nurse line that can tell you if you should be seen sooner. No regular doctor? That&apos;s worth fixing before the next time.</>,
  },
  TELEHEALTH: {
    cls: "ok",
    big: "Start with telehealth or a nurse line",
    body: <>Good fit for: rashes a camera can see, cold and flu symptoms, classic UTI symptoms, refills, and &ldquo;do I need to be seen?&rdquo; questions. Many insurance plans have a free 24/7 nurse line — the number is usually on the back of your card. If they say come in, go in.</>,
  },
};

export default function WhereToGetCare() {
  const [path, setPath] = useState<string[]>(["life"]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const current = QUESTIONS.find(q => q.id === path[path.length - 1])!;

  function answer(next: string) {
    if (next in OUTCOMES) setOutcome(next as Outcome);
    else setPath([...path, next]);
  }

  function back() {
    if (outcome) setOutcome(null);
    else if (path.length > 1) setPath(path.slice(0, -1));
  }

  function restart() {
    setPath(["life"]);
    setOutcome(null);
  }

  return (
    <>
      <div className="tool-panel" aria-live="polite">
        {outcome ? (
          <div className={`result ${OUTCOMES[outcome].cls}`} style={{ margin: 0 }}>
            <div className="result-big">{OUTCOMES[outcome].big}</div>
            <p>{OUTCOMES[outcome].body}</p>
          </div>
        ) : (
          <>
            <span className="tool-label">QUESTION {path.length} OF {QUESTIONS.length}</span>
            <div className="step-title" style={{ fontSize: "1.5rem" }}>{current.ask}</div>
            {current.signs && (
              <ul style={{ color: "#a090c0", fontSize: "0.9rem", lineHeight: 1.7, paddingLeft: "1.1rem", margin: "0.6rem 0 1rem" }}>
                {current.signs.map(s => <li key={s}>{s}</li>)}
              </ul>
            )}
            <div className="chip-row" style={{ marginTop: "1rem" }}>
              <button type="button" className="tool-btn" onClick={() => answer(current.yes)}>YES</button>
              <button type="button" className="tool-btn" onClick={() => answer(current.no)}>NO</button>
            </div>
          </>
        )}
        {(path.length > 1 || outcome) && (
          <div className="chip-row" style={{ marginTop: "1rem" }}>
            <button type="button" className="tool-btn small" onClick={back}>← BACK</button>
            <button type="button" className="tool-btn small" onClick={restart}>START OVER</button>
          </div>
        )}
      </div>

      <div className="section-label">{"// ROUGH COST OF EACH DOOR (UNINSURED)"}</div>
      <table className="data-table">
        <thead><tr><th>OPTION</th><th>TYPICAL COST</th><th>WAIT</th></tr></thead>
        <tbody>
          <tr><td>Telehealth</td><td>$40–90</td><td>Minutes to same day</td></tr>
          <tr><td>Your doctor</td><td>$100–300</td><td>Days to weeks</td></tr>
          <tr><td>Urgent care</td><td>$100–500</td><td>Walk-in, 30 min–2 hrs</td></tr>
          <tr><td>ER</td><td>$1,000–30,000+</td><td>Immediate for emergencies; hours otherwise</td></tr>
        </tbody>
      </table>

      <p className="tool-note">
        This is a sorting tool, not a diagnosis. When in doubt, go in — or call 911. If a big bill follows, see{" "}
        <Link href="/guides/huge-medical-bill" style={{ color: "#aa44ff" }}>what to do about a huge medical bill</Link>.
      </p>
    </>
  );
}
