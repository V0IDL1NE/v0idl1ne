import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createConfirmToken } from "@/lib/newsletter";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `V0IDL1NE <site@${process.env.RESEND_EMAIL_DOMAIN}>`;
const SITE_URL = "https://v0idl1ne.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot — real users never fill this in, bots often do.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const token = createConfirmToken(email);
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: "Confirm your subscription — V0IDL1NE",
      text: [
        "One click to confirm you actually want these:",
        "",
        confirmUrl,
        "",
        "This link expires in 48 hours. If you didn't request this, ignore it — nothing happens unless you click.",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
