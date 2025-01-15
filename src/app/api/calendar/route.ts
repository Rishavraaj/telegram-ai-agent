import { type NextRequest, NextResponse } from "next/server";
import { calendarAgent } from "@/utils/calendar-agent";
import { oauth2Client } from "@/utils/calendar-agent/calendar";
import { getTokens } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    // Get tokens from cookies
    const telegramUserId = req.nextUrl.searchParams.get("telegramUserId");

    if (!telegramUserId) {
      return NextResponse.json(
        { error: "No telegramUserId provided" },
        { status: 400 },
      );
    }

    const tokens = await getTokens(telegramUserId);

    // Check if we have valid credentials
    if (!tokens) {
      return NextResponse.json(
        { error: "Not authenticated", authUrl: "/api/auth/google" },
        { status: 401 },
      );
    }

    // Set credentials from cookies
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_type: "Bearer",
    });

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const agent = await calendarAgent();
    const result = await agent.invoke({ input: prompt });
    return NextResponse.json({ result: result.output });
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    // If token is expired or invalid, redirect to auth
    if (
      errorMessage.includes("invalid_grant") ||
      errorMessage.includes("Invalid Credentials")
    ) {
      return NextResponse.json(
        { error: "Authentication expired", authUrl: "/api/auth/google" },
        { status: 401 },
      );
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
