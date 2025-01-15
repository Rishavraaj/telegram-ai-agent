import { env } from "@/env";
import { determineMessageType } from "@/utils/telegram";
import { Bot } from "grammy";
import { NextResponse } from "next/server";

const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // TODO: determine if the message is a text message or a voice message
    console.log("payload : -", payload);
    const messageType = determineMessageType(payload.message);
    // TODO: if it is a text message, send it to the bot

    // TODO: if it is a voice message, first convert it to text and then send it to the bot
    if (messageType)
      await bot.api.sendMessage(payload.message.chat.id, messageType);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in webhook:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
