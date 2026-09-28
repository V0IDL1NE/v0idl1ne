"use client";

import { useState, useMemo } from "react";

type MinRule = "interest+1" | "2pct" | "3pct";

const MIN_RULES: { id: MinRule; label: string }[] = [
  { id: "interest+1", label: "INTEREST + 1% (MOST CARDS)" },
  { id: "2pct", label: "2% OF BALANCE" },
  { id: "3pct", label: "3% OF BALANCE" },
];

type Result = { months: number; interest: number; paidOff: boolean };

const MAX_MONTHS = 1200; // 100 years — anything past this is "never"

function minimumPayment(balance: number, monthlyRate: number, rule: MinRule, floor: number): number {
  const interest = balance * monthlyRate;
  const byRule =
    rule === "interest+1" ? interest + balance * 0.01 :
    rule === "2pct" ? balance * 0.02 :
    balance * 0.03;
  return Math.max(floor, byRule);
}

/* Month-by-month simulation. fixedPayment = null means "pay the (shrinking) minimum every month". */
function simulate(balance: number, apr: number, rule: MinRule, floor: number, fixedPayment: number | null): Result {
  const r = apr / 100 / 12;
  let bal = balance;
  let interestPaid = 0;
  for (let m = 1; m <= MAX_MONTHS; m++) {
    const interest = bal * r;
    const due = bal + interest;
    const pay = Math.min(due, fixedPayment ?? minimumPayment(bal, r, rule, floor));
    if (pay <= interest && pay < due) return { months: m, interest: interestPaid, paidOff: false };
    interestPaid += interest;
    bal = due - pay;
    if (bal <= 0.005) return { months: m, interest: interestPaid, paidOff: true };
  }
  return { months: MAX_MONTHS, interest: interestPaid, paidOff: false };
}

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;
function duration(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr`;
  return `${y} yr ${m} mo`;
}

function num(v: string): number {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function DebtPayoff() {
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("24");
  const [rule, setRule] = useState<MinRule>("interest+1");
  const [floor, setFloor] = useState("25");
  const [extra, setExtra] = useState("25");

  const b = num(balance);
  const a = num(apr);
  const f = num(floor);
  const x = num(extra);

  const calc = useMemo(() => {
    if (b <= 0 || a < 0) return null;
    const r = a / 100 / 12;
    const firstMin = Math.min(b * (1 + r), minimumPayment(b, r, rule, f));
    const minOnly = simulate(b, a, rule, f, null);
    const withExtra = simulate(b, a, rule, f, firstMin + x);
    const ladder = [25, 50, 100, 200].map(e => ({ extra: e, pay: firstMin + e, res: simulate(b, a, rule, f, firstMin + e) }));
    return { firstMin, minOnly, withExtra, ladder };
  }, [b, a, rule, f, x]);

  return (
    <>
      <div className="tool-panel">
        <div className="tool-row">
          <div>
            <label className="tool-label" htmlFor="dp-bal">BALANCE ($)</label>
            <input id="dp-bal" className="modal-input" inputMode="decimal" value={balance} onChange={e => setBalance(e.target.value)} />
          </div>
          <div>
            <label className="tool-label" htmlFor="dp-apr">APR (%)</label>
            <input id="dp-apr" className="modal-input" inputMode="decimal" value={apr} onChange={e => setApr(e.target.value)} />
          </div>
          <div>
            <label className="tool-label" htmlFor="dp-extra">EXTRA PER MONTH ($)</label>
            <input id="dp-extra" className="modal-input" inputMode="decimal" value={extra} onChange={e => setExtra(e.target.value)} />
          </div>
        </div>

        <span className="tool-label" style={{ marginTop: "1rem" }}>HOW YOUR CARD CALCULATES THE MINIMUM</span>
        <div className="chip-row">
          {MIN_RULES.map(m => (
            <button key={m.id} type="button" className={`tool-btn small${rule === m.id ? " active" : ""}`} onClick={() => setRule(m.id)}>{m.label}</button>
          ))}
        </div>
        <div className="tool-row" style={{ marginTop: "0.8rem" }}>
          <div style={{ maxWidth: 200 }}>
            <label className="tool-label" htmlFor="dp-floor">MINIMUM NEVER BELOW ($)</label>
            <input id="dp-floor" className="modal-input" inputMode="decimal" value={floor} onChange={e => setFloor(e.target.value)} />
          </div>
        </div>
        <p className="tool-note">Your statement&apos;s &ldquo;minimum payment warning&rdquo; box shows the exact formula your issuer uses.</p>
      </div>

      {calc && (
        <>
          <div className="stat-grid">
            <div className="stat">
              <div className="stat-label">MINIMUM ONLY</div>
              <div className="stat-value">{calc.minOnly.paidOff ? duration(calc.minOnly.months) : "NEVER"}</div>
              <div className="tool-note" style={{ marginTop: 0 }}>{money(calc.minOnly.interest)} in interest</div>
            </div>
            <div className="stat">
              <div className="stat-label">PAYING {money(calc.firstMin + x)}/MO</div>
              <div className="stat-value" style={{ color: "#44dd88" }}>{calc.withExtra.paidOff ? duration(calc.withExtra.months) : "NEVER"}</div>
              <div className="tool-note" style={{ marginTop: 0 }}>{money(calc.withExtra.interest)} in interest</div>
            </div>
          </div>

          {calc.minOnly.paidOff && calc.withExtra.paidOff && calc.withExtra.interest < calc.minOnly.interest && (
            <div className="result ok" aria-live="polite">
              <div className="result-big">{money(calc.minOnly.interest - calc.withExtra.interest)} saved</div>
              <p>
                {`Today's minimum is about ${money(calc.firstMin)}. Keep paying ${money(calc.firstMin + x)} every month — even as the minimum drops — and you're done ${duration(calc.minOnly.months - calc.withExtra.months)} sooner.`}
              </p>
            </div>
          )}
          {!calc.minOnly.paidOff && (
            <div className="result bad">
              <div className="result-big">The minimum never pays it off</div>
              <p>At this rate, the minimum barely covers (or doesn&apos;t cover) the monthly interest. Any amount above the interest is what actually shrinks the debt.</p>
            </div>
          )}

          <div className="section-label">{"// WHAT A LITTLE EXTRA DOES"}</div>
          <table className="data-table">
            <thead><tr><th>PAY EACH MONTH</th><th>DEBT-FREE IN</th><th>TOTAL INTEREST</th></tr></thead>
            <tbody>
              <tr>
                <td>Minimum only (shrinks)</td>
                <td>{calc.minOnly.paidOff ? duration(calc.minOnly.months) : "Never"}</td>
                <td>{money(calc.minOnly.interest)}</td>
              </tr>
              {calc.ladder.map(l => (
                <tr key={l.extra}>
                  <td>{money(l.pay)} <span style={{ color: "#6a5f80" }}>(+{money(l.extra)})</span></td>
                  <td>{l.res.paidOff ? duration(l.res.months) : "Never"}</td>
                  <td>{money(l.res.interest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <p className="tool-note">
        Estimates assume no new purchases and interest charged monthly at APR ÷ 12. Most cards compound daily, so real
        interest runs slightly higher. Late fees and rate changes aren&apos;t included.
      </p>
    </>
  );
}
