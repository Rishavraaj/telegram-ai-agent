import { env } from "@/env";
import { determineMessageType } from "@/utils/telegram";
import { Bot } from "grammy";
import { NextResponse } from "next/server";

const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // console.log("payload", payload);
    const messageType = await determineMessageType(payload.message);

    console.log("messageType", messageType);

    // if (messageType) {
    //   await bot.api.sendMessage(payload.message.chat.id, messageType);
    // }

    if (messageType) {
      const response = await fetch("http://localhost:3001/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: messageType }),
      });

      const data = await response.json();

      console.log("data", data);

      if (data.error) {
        await bot.api.sendMessage(payload.message.chat.id, data.error);
      } else {
        const result =
          typeof data.response === "string"
            ? data.response
            : JSON.stringify(data.response, null, 2);

        console.log("result", result);

        await bot.api.sendMessage(payload.message.chat.id, result);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in webhook:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
