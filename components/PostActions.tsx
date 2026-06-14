"use client";

import { useState, useEffect } from "react";

type ModalType = "submit" | "report" | null;

const btn: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.15em",
  padding: "0.5rem 1rem",
  border: "1px solid rgba(136,0,255,0.2)",
  color: "#6a5f80",
  cursor: "pointer",
  background: "transparent",
  transition: "all 0.2s",
};

const btnReport: React.CSSProperties = {
  ...btn,
  borderColor: "rgba(204,34,0,0.2)",
  color: "#4a2020",
};

function Modal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!type) setSuccess(false);
  }, [type]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("modal-overlay")) onClose();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onClose]);

  if (!type) return null;

  return (
    <div className={`modal-overlay${type ? " open" : ""}`}>
      <div className="modal-box">
        <span className="modal-close" onClick={onClose}>[ CLOSE ]</span>
        {success ? (
          <div className="modal-success">
            <div className="modal-success-icon">▽</div>
            <div className="modal-success-text">
              {type === "report" ? (
                <>FLAG RECEIVED<br /><br />This post has been flagged for review.<br />Once email is connected it'll land in the queue.</>
              ) : (
                <>SUBMISSION RECEIVED<br /><br />If it checks out it gets published.<br />Once email is connected it'll land in the queue.</>
              )}
            </div>
          </div>
        ) : type === "report" ? (
          <form onSubmit={e => { e.preventDefault(); setSuccess(true); }}>
            <div className="modal-title">Report Inaccuracy</div>
            <div className="modal-sub">// FLAG THIS POST FOR REVIEW</div>
            <label className="modal-label">WHAT'S WRONG</label>
            <textarea className="modal-textarea" placeholder="Describe the inaccuracy or what needs to be corrected..." required />
            <label className="modal-label">YOUR SOURCE (optional)</label>
            <input className="modal-input" type="text" placeholder="Link or reference supporting your correction" />
            <div className="modal-actions">
              <button type="submit" className="modal-submit">SUBMIT FLAG</button>
              <button type="button" className="modal-cancel" onClick={onClose}>CANCEL</button>
            </div>
          </form>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSuccess(true); }}>
            <div className="modal-title">Submit Information</div>
            <div className="modal-sub">// KNOWLEDGE THEY FORGOT TO GIVE YOU</div>
            <label className="modal-label">CATEGORY</label>
            <select className="modal-select" defaultValue="">
              <option value="" disabled>SELECT A CATEGORY</option>
              {["ELECTRICAL","LEGAL","HEALTH","HOME","FINANCE","OTHER"].map(c => <option key={c}>{c}</option>)}
            </select>
            <label className="modal-label">TITLE / TOPIC</label>
            <input className="modal-input" type="text" placeholder="What's the knowledge?" required />
            <label className="modal-label">THE INFORMATION</label>
            <textarea className="modal-textarea" style={{ minHeight: 130 }} placeholder="Write it out. Be specific. Include why most people don't know this." required />
            <label className="modal-label">YOUR SOURCE (optional)</label>
            <input className="modal-input" type="text" placeholder="Link, code, law number, anything that backs it up" />
            <div className="modal-actions">
              <button type="submit" className="modal-submit">SUBMIT</button>
              <button type="button" className="modal-cancel" onClick={onClose}>CANCEL</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PostActions() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(136,0,255,0.15)", display: "flex", gap: "1rem" }}>
        <button
          style={btn}
          onClick={() => setModal("submit")}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#8800ff"; e.currentTarget.style.color = "#aa44ff"; e.currentTarget.style.background = "rgba(136,0,255,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(136,0,255,0.2)"; e.currentTarget.style.color = "#6a5f80"; e.currentTarget.style.background = "transparent"; }}
        >// SUBMIT RELATED INFO</button>
        <button
          style={btnReport}
          onClick={() => setModal("report")}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#cc2200"; e.currentTarget.style.color = "#ff6644"; e.currentTarget.style.background = "rgba(204,34,0,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(204,34,0,0.2)"; e.currentTarget.style.color = "#4a2020"; e.currentTarget.style.background = "transparent"; }}
        >// REPORT INACCURACY</button>
      </div>
      <Modal type={modal} onClose={() => setModal(null)} />
    </>
  );
}
