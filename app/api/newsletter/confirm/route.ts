import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { verifyConfirmToken } from "@/lib/newsletter";

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = "https://v0idl1ne.com";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const email = verifyConfirmToken(token);

  if (!email) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=invalid`);
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("RESEND_AUDIENCE_ID is not set");
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=error`);
  }

  try {
    const { error } = await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend contact create error:", error);
      return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=error`);
    }

    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=ok`);
  } catch (err) {
    console.error("Newsletter confirm error:", err);
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=error`);
  }
}
