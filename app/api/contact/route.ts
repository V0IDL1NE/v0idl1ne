import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "V0IDL1NE@proton.me";
const FROM = `V0IDL1NE Site <site@${process.env.RESEND_EMAIL_DOMAIN}>`;

const MAX_LEN = 5000;

function clean(value: unknown, max = MAX_LEN): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot — real users never fill this in, bots often do.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const kind = body.kind === "report" ? "report" : "submit";

  let subject: string;
  let lines: string[];

  if (kind === "report") {
    const message = clean(body.message);
    const source = clean(body.source, 500);
    const postTitle = clean(body.postTitle, 200);
    const postSlug = clean(body.postSlug, 200);

    if (!message) {
      return NextResponse.json({ error: "Missing description of what's wrong" }, { status: 400 });
    }

    subject = postTitle ? `[REPORT] ${postTitle}` : "[REPORT] Inaccuracy flagged";
    lines = [
      `POST: ${postTitle || "(not specified)"}`,
      postSlug ? `SLUG: ${postSlug}` : "",
      "",
      "WHAT'S WRONG:",
      message,
      "",
      `SOURCE: ${source || "(none provided)"}`,
    ].filter(Boolean);
  } else {
    const category = clean(body.category, 100);
    const title = clean(body.title, 200);
    const info = clean(body.info);
    const source = clean(body.source, 500);

    if (!title || !info) {
      return NextResponse.json({ error: "Missing title or information" }, { status: 400 });
    }

    subject = `[SUBMIT] ${title}`;
    lines = [
      `CATEGORY: ${category || "(not specified)"}`,
      `TITLE: ${title}`,
      "",
      "INFORMATION:",
      info,
      "",
      `SOURCE: ${source || "(none provided)"}`,
    ];
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
