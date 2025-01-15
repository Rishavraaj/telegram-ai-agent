import { env } from "@/env";
import { determineMessageType } from "@/utils/telegram";
import { Bot } from "grammy";
import { NextResponse } from "next/server";

const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const loadingMessage = await bot.api.sendMessage(
      payload.message.chat.id,
      "🔄 🤖 ⚡️ Agent is processing your request... 🎯 🚀",
    );

    const messageType = await determineMessageType(payload.message);

    if (messageType) {
      const response = await fetch(
        `${env.NEXT_PUBLIC_APP_URL}/api/calendar?telegramUserId=${payload.message.chat.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: messageType }),
        },
      );

      const data = await response.json();

      // Delete loading message
      await bot.api.deleteMessage(
        payload.message.chat.id,
        loadingMessage.message_id,
      );

      if (data.error) {
        const connectUrl = `${env.NEXT_PUBLIC_APP_URL}/api/auth/google?telegramUserId=${payload.message.chat.id}`;
        await bot.api.sendMessage(
          payload.message.chat.id,
          `${data.error}\n\nPlease connect your Google Calendar:`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Connect Google Calendar",
                    url: connectUrl,
                  },
                ],
              ],
            },
          },
        );
      } else {
        await bot.api.sendMessage(payload.message.chat.id, data.result, {
          parse_mode: "Markdown",
        });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in webhook:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
