import { env } from "@/env";
import { determineMessageType } from "@/utils/telegram";
import { Bot } from "grammy";
import { NextResponse } from "next/server";

const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const messageType = await determineMessageType(payload.message);

    if (messageType) {
      await bot.api.sendMessage(payload.message.chat.id, messageType);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in webhook:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
