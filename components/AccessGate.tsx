"use client";

import { useEffect, useState } from "react";
import { AUTH_REQUIRED_EVENT, getAccessKey, setAccessKey, verifyAccessKey } from "@/lib/accessKey";

/* Password prompt shown once per device in front of the private shared-data pages. */
export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "locked-out" | "open" | "prompt">("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const saved = getAccessKey();
    (saved ? verifyAccessKey(saved) : Promise.resolve("denied" as const)).then(r => {
      if (!cancelled) setState(r === "ok" ? "open" : r === "locked" ? "locked-out" : "prompt");
    });
    const onRequired = () => setState("prompt");
    window.addEventListener(AUTH_REQUIRED_EVENT, onRequired);
    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_REQUIRED_EVENT, onRequired);
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = await verifyAccessKey(password);
    if (result === "ok") {
      setAccessKey(password);
      setState("open");
    } else {
      setError(result === "locked" ? "TOO MANY TRIES — WAIT 15 MINUTES" : "WRONG PASSWORD");
    }
  }

  if (state === "open") return <>{children}</>;

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {state === "checking" ? null : state === "locked-out" ? (
        <p style={{ fontFamily: "var(--font-mono)", color: "#444" }}>Too many tries — wait 15 minutes.</p>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            autoFocus
            style={{ padding: "12px 14px", fontSize: "15px", border: "1px solid #888", borderRadius: "6px" }}
          />
          {error && <div style={{ color: "#b00020", fontSize: "12px", fontFamily: "var(--font-mono)" }}>{error}</div>}
          <button type="submit" style={{ padding: "10px", borderRadius: "6px", background: "#141414", color: "#f0f0f0", border: "1px solid #888", cursor: "pointer" }}>
            ENTER
          </button>
        </form>
      )}
    </div>
  );
}
