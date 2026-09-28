import { timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

/* Server-side gate for the private endpoints (/api/void-chat, /api/design-chat, /api/crypt-data). */

export const ACCESS_HEADER = "x-void-key";

const MAX_FAILURES = 8;
const LOCKOUT_MS = 15 * 60 * 1000;

// Per-instance only (serverless instances don't share memory), but it still turns
// unlimited password guessing into a handful per IP per 15 minutes per instance.
const failures = new Map<string, { count: number; lockedUntil: number }>();

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

function passwordMatches(given: unknown): boolean {
  const expected = process.env.VOID_PASSWORD;
  // No password configured = nobody gets in. Never compare against undefined.
  if (!expected || typeof given !== "string" || given.length === 0) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/*
 * Returns null if the request is allowed, or a Response to send back (401 / 429).
 * `given` is the password from the request body; if omitted, the access header is used.
 */
export function checkAccess(req: NextRequest, given?: unknown): Response | null {
  const ip = clientIp(req);
  const now = Date.now();
  const record = failures.get(ip);

  if (record && record.lockedUntil > now) {
    return new Response("Too many attempts — try again later", { status: 429 });
  }

  const password = given !== undefined ? given : req.headers.get(ACCESS_HEADER);
  if (passwordMatches(password)) {
    failures.delete(ip);
    return null;
  }

  const count = (record?.count ?? 0) + 1;
  failures.set(ip, { count, lockedUntil: count >= MAX_FAILURES ? now + LOCKOUT_MS : 0 });
  if (failures.size > 5000) failures.clear(); // keep memory bounded
  return new Response("Unauthorized", { status: 401 });
}
