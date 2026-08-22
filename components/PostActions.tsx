"use client";

import { useState, useEffect } from "react";
import { sendContact, honeypotStyle } from "@/lib/contact";

type ModalType = "submit" | "report" | null;

const btn: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
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

function Modal({ type, onClose, postTitle, postSlug }: { type: ModalType; onClose: () => void; postTitle: string; postSlug: string }) {
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) { setSuccess(false); setError(null); }
  }, [type]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("modal-overlay")) onClose();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onClose]);

  if (!type) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(null);
    setSending(true);
    const result = type === "report"
      ? await sendContact({
          kind: "report",
          message: String(form.get("message") || ""),
          source: String(form.get("source") || ""),
          website: String(form.get("website") || ""),
          postTitle,
          postSlug,
        })
      : await sendContact({
          kind: "submit",
          category: String(form.get("category") || ""),
          title: String(form.get("title") || ""),
          info: String(form.get("info") || ""),
          source: String(form.get("source") || ""),
          website: String(form.get("website") || ""),
        });
    setSending(false);
    if (result.ok) setSuccess(true);
    else setError(result.error || "Something went wrong — try again.");
  }

  return (
    <div className={`modal-overlay${type ? " open" : ""}`}>
      <div className="modal-box">
        <span className="modal-close" onClick={onClose}>[ CLOSE ]</span>
        {success ? (
          <div className="modal-success">
            <div className="modal-success-icon">▽</div>
            <div className="modal-success-text">
              {type === "report" ? (
                <>FLAG RECEIVED<br /><br />This post has been flagged for review.</>
              ) : (
                <>SUBMISSION RECEIVED<br /><br />If it checks out it gets published.</>
              )}
            </div>
          </div>
        ) : type === "report" ? (
          <form onSubmit={handleSubmit}>
            <div className="modal-title">Report Inaccuracy</div>
            <div className="modal-sub">// FLAG THIS POST FOR REVIEW</div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" style={honeypotStyle} aria-hidden="true" />
            <label className="modal-label">WHAT'S WRONG</label>
            <textarea name="message" className="modal-textarea" placeholder="Describe the inaccuracy or what needs to be corrected..." required />
            <label className="modal-label">YOUR SOURCE (optional)</label>
            <input name="source" className="modal-input" type="text" placeholder="Link or reference supporting your correction" />
            {error && <div style={{ color: "#ff6644", fontFamily: "var(--font-mono)", fontSize: "0.65rem", marginTop: "0.8rem" }}>{error}</div>}
            <div className="modal-actions">
              <button type="submit" className="modal-submit" disabled={sending}>{sending ? "SENDING..." : "SUBMIT FLAG"}</button>
              <button type="button" className="modal-cancel" onClick={onClose}>CANCEL</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-title">Submit Information</div>
            <div className="modal-sub">// KNOWLEDGE THEY FORGOT TO GIVE YOU</div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" style={honeypotStyle} aria-hidden="true" />
            <label className="modal-label">CATEGORY</label>
            <select name="category" className="modal-select" defaultValue="">
              <option value="" disabled>SELECT A CATEGORY</option>
              {["ELECTRICAL","LEGAL","HEALTH","HOME","FINANCE","AUTO","TECH","CONSUMER","OTHER"].map(c => <option key={c}>{c}</option>)}
            </select>
            <label className="modal-label">TITLE / TOPIC</label>
            <input name="title" className="modal-input" type="text" placeholder="What's the knowledge?" required />
            <label className="modal-label">THE INFORMATION</label>
            <textarea name="info" className="modal-textarea" style={{ minHeight: 130 }} placeholder="Write it out. Be specific. Include why most people don't know this." required />
            <label className="modal-label">YOUR SOURCE (optional)</label>
            <input name="source" className="modal-input" type="text" placeholder="Link, code, law number, anything that backs it up" />
            {error && <div style={{ color: "#ff6644", fontFamily: "var(--font-mono)", fontSize: "0.65rem", marginTop: "0.8rem" }}>{error}</div>}
            <div className="modal-actions">
              <button type="submit" className="modal-submit" disabled={sending}>{sending ? "SENDING..." : "SUBMIT"}</button>
              <button type="button" className="modal-cancel" onClick={onClose}>CANCEL</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PostActions({ postTitle, postSlug }: { postTitle: string; postSlug: string }) {
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
      <Modal type={modal} onClose={() => setModal(null)} postTitle={postTitle} postSlug={postSlug} />
    </>
  );
}
