"use client";

import { useState } from "react";
import { honeypotStyle } from "@/lib/contact";

const s = {
  wrap: {
    border: "1px solid rgba(136,0,255,0.2)",
    padding: "1rem",
    marginBottom: "1.5rem",
    background: "rgba(136,0,255,0.03)",
  },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    color: "#8800ff",
    letterSpacing: "0.25em",
    marginBottom: "0.5rem",
  },
  desc: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "#4a4060",
    lineHeight: 1.5,
    marginBottom: "0.8rem",
  },
  form: { display: "flex", gap: "0.5rem" },
  error: {
    color: "#ff6644",
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    marginTop: "0.6rem",
  },
  success: {
    color: "#aa44ff",
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    letterSpacing: "0.05em",
    lineHeight: 1.5,
  },
};

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: String(form.get("website") || ""),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong — try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error — try again.");
    }
    setSending(false);
  }

  return (
    <div style={s.wrap}>
      <div style={s.label}>// SITE UPDATES</div>
      {success ? (
        <div style={s.success}>CHECK YOUR EMAIL<br />Click the link to confirm. Nothing sends until you do.</div>
      ) : (
        <>
          <p style={s.desc}>Occasional updates from me directly — not a post digest, not a schedule.</p>
          <form style={s.form} onSubmit={handleSubmit}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" style={honeypotStyle} aria-hidden="true" />
            <input
              className="modal-input"
              style={{ width: "auto", flex: "1 1 auto", minWidth: 0 }}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="modal-submit" disabled={sending} style={{ whiteSpace: "nowrap" }}>
              {sending ? "..." : "SIGN UP"}
            </button>
          </form>
          {error && <div style={s.error}>{error}</div>}
        </>
      )}
    </div>
  );
}
