import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Bot } from "grammy";
import { z } from "zod";

export const webhookManagerRouter = createTRPCRouter({
  getInfo: publicProcedure
    .input(z.object({ bot_token: z.string().min(1) }))
    .query(async ({ input }) => {
      const bot = new Bot(input.bot_token);
      try {
        const webhookInfo = await bot.api.getWebhookInfo();
        return {
          ok: true,
          webhookInfo,
          message: "Webhook info retrieved",
        };
      } catch (error) {
        console.error("Error getting webhook info:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to get webhook info",
        );
      }
    }),

  setWebhook: publicProcedure
    .input(
      z.object({
        bot_token: z.string().min(1),
        webhookUrl: z.string().url(),
      }),
    )
    .mutation(async ({ input }) => {
      const bot = new Bot(input.bot_token);
      try {
        await bot.api.setWebhook(input.webhookUrl, {
          allowed_updates: ["message", "edited_message"],
        });
        // const webhookInfo = await bot.api.getWebhookInfo();
        return {
          ok: true,
          //   webhookInfo,
          message: "Webhook set successfully",
        };
      } catch (error) {
        console.error("Error setting webhook:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to set webhook",
        );
      }
    }),

  deleteWebhook: publicProcedure
    .input(z.object({ bot_token: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const bot = new Bot(input.bot_token);
      try {
        await bot.api.deleteWebhook();
        const webhookInfo = await bot.api.getWebhookInfo();
        return {
          ok: true,
          webhookInfo,
          message: "Webhook deleted successfully",
        };
      } catch (error) {
        console.error("Error deleting webhook:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to delete webhook",
        );
      }
    }),
});
