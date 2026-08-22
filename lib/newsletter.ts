import crypto from "crypto";

const TOKEN_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

function getSecret(): string {
  const secret = process.env.NEWSLETTER_TOKEN_SECRET;
  if (!secret) throw new Error("NEWSLETTER_TOKEN_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createConfirmToken(email: string): string {
  const expires = Date.now() + TOKEN_TTL_MS;
  const payload = `${email}|${expires}`;
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  const signature = sign(payload);
  return `${payloadB64}.${signature}`;
}

export function verifyConfirmToken(token: string): string | null {
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  let payload: string;
  try {
    payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expectedSignature = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  const [email, expiresStr] = payload.split("|");
  const expires = Number(expiresStr);
  if (!email || !expires || Date.now() > expires) return null;

  return email;
}
