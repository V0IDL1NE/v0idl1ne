"use client";

/* Browser side of the private-page password: remembered per device, sent as a header to /api/crypt-data. */

const STORAGE_KEY = "v0id-access-key";
const HEADER = "x-void-key";
export const AUTH_REQUIRED_EVENT = "v0id-auth-required";

export function getAccessKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setAccessKey(key: string) {
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {
    // storage blocked — the key just won't survive a reload
  }
}

export function clearAccessKey() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function accessHeaders(key = getAccessKey()): Record<string, string> {
  return { [HEADER]: key };
}

/* Call when a request comes back 401: forget the key and ask the gate to show the prompt again. */
export function reportAuthFailure() {
  clearAccessKey();
  window.dispatchEvent(new Event(AUTH_REQUIRED_EVENT));
}

/* Checks a candidate password against the server. Returns "ok", "denied", or "locked". */
export async function verifyAccessKey(key: string): Promise<"ok" | "denied" | "locked"> {
  const res = await fetch("/api/crypt-data?key=__ping", { headers: accessHeaders(key) });
  if (res.ok) return "ok";
  return res.status === 429 ? "locked" : "denied";
}
