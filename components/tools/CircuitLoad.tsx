"use client";

import { useState } from "react";

const PRESETS: { name: string; watts: number }[] = [
  { name: "Space heater", watts: 1500 },
  { name: "Hair dryer", watts: 1500 },
  { name: "Microwave", watts: 1100 },
  { name: "Window AC (small)", watts: 600 },
  { name: "Window AC (large)", watts: 1400 },
  { name: "Toaster", watts: 1000 },
  { name: "Coffee maker", watts: 1000 },
  { name: "Air fryer", watts: 1500 },
  { name: "Electric kettle", watts: 1500 },
  { name: "Clothes iron", watts: 1200 },
  { name: "Vacuum", watts: 1000 },
  { name: "Gaming PC", watts: 500 },
  { name: "Laptop", watts: 65 },
  { name: "TV (55\")", watts: 120 },
  { name: "Game console", watts: 200 },
  { name: "Fridge (running)", watts: 200 },
  { name: "Box fan", watts: 75 },
  { name: "Dehumidifier", watts: 500 },
  { name: "LED bulb", watts: 10 },
  { name: "Phone charger", watts: 15 },
];

type Item = { id: number; name: string; watts: number; qty: number };

const VOLTS = 120;

export default function CircuitLoad() {
  const [amps, setAmps] = useState<15 | 20>(15);
  const [items, setItems] = useState<Item[]>([]);
  const [customName, setCustomName] = useState("");
  const [customWatts, setCustomWatts] = useState("");
  const [nextId, setNextId] = useState(1);

  const max = amps * VOLTS;
  const safe = max * 0.8;
  const total = items.reduce((sum, i) => sum + i.watts * i.qty, 0);
  const pctOfMax = Math.min(100, (total / max) * 100);

  function add(name: string, watts: number) {
    const existing = items.find(i => i.name === name && i.watts === watts);
    if (existing) {
      setItems(items.map(i => (i === existing ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setItems([...items, { id: nextId, name, watts, qty: 1 }]);
      setNextId(nextId + 1);
    }
  }

  function addCustom() {
    const w = Math.round(Number(customWatts));
    if (!w || w <= 0) return;
    add(customName.trim() || "Custom device", w);
    setCustomName("");
    setCustomWatts("");
  }

  function changeQty(id: number, delta: number) {
    setItems(items.flatMap(i => {
      if (i.id !== id) return [i];
      const qty = i.qty + delta;
      return qty > 0 ? [{ ...i, qty }] : [];
    }));
  }

  let verdict: { cls: string; big: string; body: string };
  if (total === 0) {
    verdict = { cls: "", big: "Add what's plugged in", body: "Tap the devices that share this circuit — every outlet and light fed by the same breaker counts, not just the one outlet." };
  } else if (total <= safe) {
    verdict = { cls: "ok", big: "You're fine", body: `${total.toLocaleString()}W is under the ${safe.toLocaleString()}W safe continuous limit for a ${amps}A circuit. Room left: ${(safe - total).toLocaleString()}W.` };
  } else if (total <= max) {
    verdict = { cls: "warn", big: "At the edge", body: `${total.toLocaleString()}W is under the ${max.toLocaleString()}W breaker rating but over the ${safe.toLocaleString()}W guideline for loads that run 3+ hours (the 80% rule). One appliance made for a standard outlet — like a 1,500W space heater — is designed for this on its own. Just don't add anything else to the circuit, and plug it straight into the wall, never into a power strip or extension cord.` };
  } else {
    verdict = { cls: "bad", big: "This will trip the breaker", body: `${total.toLocaleString()}W is ${(total - max).toLocaleString()}W over what a ${amps}A breaker allows (${max.toLocaleString()}W). Move something to a different circuit. Do not swap in a bigger breaker — the wire is sized for ${amps}A.` };
  }

  return (
    <>
      <div className="tool-panel">
        <span className="tool-label">1 — WHAT BREAKER IS IT ON?</span>
        <div className="chip-row">
          {[15, 20].map(a => (
            <button key={a} type="button" className={`tool-btn${amps === a ? " active" : ""}`} onClick={() => setAmps(a as 15 | 20)}>
              {a} AMP{a === 15 ? " (MOST ROOMS)" : " (KITCHENS, BATHS, NEWER HOMES)"}
            </button>
          ))}
        </div>
        <p className="tool-note">The number is printed on the breaker handle. Not sure? Assume 15 — it&apos;s the safer guess.</p>
      </div>

      <div className="tool-panel">
        <span className="tool-label">2 — ADD WHAT&apos;S PLUGGED IN (TAP TO ADD)</span>
        <div className="chip-row">
          {PRESETS.map(p => (
            <button key={p.name} type="button" className="tool-btn small" onClick={() => add(p.name, p.watts)}>
              + {p.name.toUpperCase()} <span style={{ color: "#6a5f80" }}>{p.watts}W</span>
            </button>
          ))}
        </div>
        <div className="tool-row" style={{ marginTop: "1rem" }}>
          <div>
            <label className="tool-label" htmlFor="cl-name">SOMETHING ELSE</label>
            <input id="cl-name" className="modal-input" placeholder="Name (optional)" value={customName} onChange={e => setCustomName(e.target.value)} />
          </div>
          <div>
            <label className="tool-label" htmlFor="cl-watts">WATTS (ON THE LABEL)</label>
            <input id="cl-watts" className="modal-input" inputMode="numeric" placeholder="e.g. 900" value={customWatts}
              onChange={e => setCustomWatts(e.target.value.replace(/[^0-9]/g, ""))}
              onKeyDown={e => { if (e.key === "Enter") addCustom(); }} />
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <button type="button" className="tool-btn" onClick={addCustom}>ADD</button>
          </div>
        </div>
        <p className="tool-note">Label only shows amps? Multiply by 120 to get watts (10A × 120 = 1,200W).</p>

        {items.length > 0 && (
          <table className="data-table" style={{ marginTop: "1rem" }}>
            <thead><tr><th>DEVICE</th><th>WATTS</th><th>QTY</th><th /></tr></thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{(i.watts * i.qty).toLocaleString()}W</td>
                  <td>{i.qty}</td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                    <button type="button" className="tool-btn small" onClick={() => changeQty(i.id, 1)} aria-label={`Add another ${i.name}`}>+</button>{" "}
                    <button type="button" className="tool-btn small" onClick={() => changeQty(i.id, -1)} aria-label={`Remove one ${i.name}`}>−</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={`result ${verdict.cls}`} aria-live="polite">
        <div className="result-big">{verdict.big}</div>
        {total > 0 && (
          <>
            <div className="meter" aria-hidden="true">
              <div className="meter-fill" style={{
                width: `${pctOfMax}%`,
                background: total > max ? "#cc2200" : total > safe ? "#ddaa00" : "#22aa66",
              }} />
              <div className="meter-mark" style={{ left: "80%" }} title="80% continuous limit" />
            </div>
            <div className="tool-note" style={{ marginTop: 0, marginBottom: "0.6rem" }}>
              {total.toLocaleString()}W of {max.toLocaleString()}W — white line = 80% safe continuous limit
            </div>
          </>
        )}
        <p>{verdict.body}</p>
      </div>

      <p className="tool-note">
        Wattages are typical label values — check yours, they vary. Assumes a standard 120V US circuit. This is a planning
        tool, not an inspection: a breaker that trips repeatedly, warm outlets, or a burning smell mean call an electrician.
      </p>
    </>
  );
}
