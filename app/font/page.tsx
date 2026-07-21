import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Type Vault",
  robots: { index: false, follow: false },
};

const specimens = [
  {
    family: "Absinthe",
    tag: "recipe-card gothic",
    sentence: "The Green Fairy Whispers at Midnight",
  },
  {
    family: "Bewitched",
    tag: "drip-accent blackletter",
    sentence: "Double, Double, Toil and Trouble",
  },
  {
    family: "Cathedral",
    tag: "hairline gothic",
    sentence: "Bells Toll Beneath the Spires",
  },
  {
    family: "Death Plague",
    tag: "distressed blackletter",
    sentence: "Death Comes for the Wicked",
  },
  {
    family: "Escaping Breathe",
    tag: "condensed serif-gothic",
    sentence: "Every Breath Escapes the Dark",
  },
];

const files: Record<string, string> = {
  Absinthe: "/fonts/Absinthe.ttf",
  Bewitched: "/fonts/Bewitched.ttf",
  Cathedral: "/fonts/Cathedral.ttf",
  "Death Plague": "/fonts/DeathPlague.ttf",
  "Escaping Breathe": "/fonts/EscapingBreathe.ttf",
};

export default function FontVaultPage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <style>{`
        ${specimens
          .map(
            (s) => `@font-face {
          font-family: '${s.family}';
          src: url('${files[s.family]}') format('truetype');
          font-display: swap;
        }`
          )
          .join("\n")}

        .fv-page {
          max-width: 980px;
          margin: 0 auto;
          padding: 64px 24px 96px;
          font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Consolas, monospace;
          color: #c0c0c0;
        }
        .fv-eyebrow {
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8800ff;
          display: block;
          margin-bottom: 18px;
        }
        .fv-title {
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1.05;
          margin: 0 0 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          background: linear-gradient(45deg, #8800ff, #ff0088);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          width: fit-content;
        }
        .fv-desc {
          font-size: 13px;
          color: #404040;
          max-width: 60ch;
          line-height: 1.7;
          margin: 0 0 72px;
          padding-bottom: 32px;
          border-bottom: 1px solid #1a1a1a;
        }
        .fv-plates {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .fv-plate {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 0;
          padding: 40px clamp(20px, 4vw, 56px) 48px;
          transition: border-color 0.4s cubic-bezier(0.05,0.9,0.1,1.0), box-shadow 0.4s cubic-bezier(0.05,0.9,0.1,1.0);
        }
        .fv-plate:hover {
          border-color: #8800ff;
          box-shadow: 0 0 24px rgba(136,0,255,0.15);
        }
        .fv-plate-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 20px;
        }
        .fv-plate-index { font-size: 12px; color: #8800ff; letter-spacing: 0.1em; }
        .fv-plate-tag {
          font-size: 11px;
          color: #404040;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .fv-plate-name {
          font-size: clamp(40px, 7vw, 72px);
          line-height: 1;
          margin: 0 0 24px;
          color: #c0c0c0;
          font-weight: 400;
        }
        .fv-rule {
          height: 1px;
          background: linear-gradient(90deg, #8800ff, #ff0088, transparent);
          margin-bottom: 28px;
          opacity: 0.5;
        }
        .fv-row {
          display: grid;
          grid-template-columns: 44px 1fr;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 18px;
          overflow-x: auto;
        }
        .fv-row-label { font-size: 11px; color: #404040; letter-spacing: 0.08em; }
        .fv-sample { margin: 0; color: #c0c0c0; white-space: nowrap; }
        .fv-sample.upper { font-size: clamp(22px, 3.2vw, 32px); }
        .fv-sample.lower { font-size: clamp(20px, 3vw, 30px); }
        .fv-sample.nums { font-size: clamp(20px, 3vw, 30px); }
        .fv-sentence-wrap {
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px dashed #1a1a1a;
        }
        .fv-sentence {
          margin: 0;
          color: #c0c0c0;
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.3;
        }
        .fv-footer {
          margin-top: 64px;
          font-size: 11px;
          color: #404040;
          letter-spacing: 0.05em;
          text-align: center;
        }
        @media (max-width: 560px) {
          .fv-row { grid-template-columns: 1fr; gap: 4px; }
          .fv-row-label { display: none; }
        }
      `}</style>

      <div className="fv-page">
        <header>
          <span className="fv-eyebrow">v0idl1ne // type vault</span>
          <h1 className="fv-title">Type Vault</h1>
          <p className="fv-desc">
            Five hand-drawn gothic display faces, traced and hinted into working TTFs.
            Each plate below renders live from the actual font file — no substitutions.
          </p>
        </header>

        <div className="fv-plates">
          {specimens.map((s, i) => (
            <section className="fv-plate" key={s.family}>
              <div className="fv-plate-meta">
                <span className="fv-plate-index">
                  {String(i + 1).padStart(2, "0")} / {String(specimens.length).padStart(2, "0")}
                </span>
                <span className="fv-plate-tag">{s.tag}</span>
              </div>
              <h2 className="fv-plate-name" style={{ fontFamily: s.family }}>
                {s.family}
              </h2>
              <div className="fv-rule" />
              <div className="fv-row">
                <span className="fv-row-label">A–Z</span>
                <p className="fv-sample upper" style={{ fontFamily: s.family }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
              </div>
              <div className="fv-row">
                <span className="fv-row-label">a–z</span>
                <p className="fv-sample lower" style={{ fontFamily: s.family }}>
                  abcdefghijklmnopqrstuvwxyz
                </p>
              </div>
              <div className="fv-row">
                <span className="fv-row-label">0–9</span>
                <p className="fv-sample nums" style={{ fontFamily: s.family }}>
                  0123456789 &amp; !?@#
                </p>
              </div>
              <div className="fv-sentence-wrap">
                <p className="fv-sentence" style={{ fontFamily: s.family }}>
                  {s.sentence}
                </p>
              </div>
            </section>
          ))}
        </div>

        <footer className="fv-footer">
          5 typefaces · rendered live from /public/fonts · unlisted
        </footer>
      </div>
    </div>
  );
}
