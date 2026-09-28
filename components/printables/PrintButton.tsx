"use client";

export default function PrintButton({ hint }: { hint?: string }) {
  return (
    <div className="tool-panel no-print">
      <div className="chip-row" style={{ alignItems: "center" }}>
        <button type="button" className="tool-btn active" onClick={() => window.print()}>PRINT / SAVE AS PDF</button>
      </div>
      <p className="tool-note">{hint ?? "Prints clean black-on-white on letter paper — the site colors are stripped automatically. Choose \"Save as PDF\" in the print dialog to keep a digital copy."}</p>
    </div>
  );
}
