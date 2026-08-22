import type { CSSProperties } from "react";

export type ContactResult = { ok: boolean; error?: string };

export async function sendContact(payload: Record<string, string>): Promise<ContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data.error || "Failed to send" };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error" };
  }
}

// Visually-hidden honeypot field — real visitors never fill this in.
export const honeypotStyle: CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: 1,
  height: 1,
  overflow: "hidden",
};
