import { env } from "@/env";
import { Bot } from "grammy";
import { NextResponse } from "next/server";

const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    await bot.api.sendMessage(payload.message.chat.id, "bhag yaha kya hai");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in webhook:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
