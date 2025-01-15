import { oauth2Client } from "@/utils/calendar-agent/calendar";
import { type NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const telegramUserId = req.nextUrl.searchParams.get("telegramUserId");

  if (!telegramUserId) {
    return NextResponse.json(
      { error: "No telegramUserId provided" },
      { status: 400 },
    );
  }

  const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
    state: telegramUserId!,
  });

  return NextResponse.redirect(authUrl);
}
