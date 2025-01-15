import { env } from "@/env";
import { Bot } from "grammy";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

    const webhookUrl = `${env.NEXT_PUBLIC_APP_URL}/api/telegram/webhook`;

    await bot.api.setWebhook(webhookUrl, {
      allowed_updates: ["message", "edited_message"],
    });

    const webhookInfo = await bot.api.getWebhookInfo();

    return NextResponse.json({
      ok: true,
      message: "Webhook set successfully",
      webhookInfo,
    });
  } catch (error) {
    console.error("Error setting webhook:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to set webhook",
      },
      { status: 500 },
    );
  }
}
