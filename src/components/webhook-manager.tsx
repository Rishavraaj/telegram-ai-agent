"use client";
import React, { useCallback } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const WebhookInfoSchema = z.object({
  bot_token: z.string().min(1),
  webhookUrl: z.string().url().optional(),
});

type WebhookInfo = z.infer<typeof WebhookInfoSchema>;

const WebhookManager = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const bot_token = searchParams.get("bot_token");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const form = useForm<WebhookInfo>({
    resolver: zodResolver(WebhookInfoSchema),
    defaultValues: {
      bot_token: bot_token ?? "",
    },
  });

  const getInfo = api.webhookManager.getInfo.useQuery(
    { bot_token: bot_token || form.getValues("bot_token") },
    { enabled: Boolean(bot_token) },
  );

  const setWebhook = api.webhookManager.setWebhook.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      getInfo.refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteWebhook = api.webhookManager.deleteWebhook.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      form.setValue("webhookUrl", "");
      getInfo.refetch();
      router.push(pathname);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleGetInfo = async () => {
    const bot_token = form.getValues("bot_token");
    if (!bot_token) {
      toast.error("Please enter a bot token");
      return;
    }
    const result = await getInfo.refetch();
    if (result.data) {
      if (result.data.webhookInfo.url) {
        form.setValue("webhookUrl", result.data.webhookInfo.url);
      }
      toast.success(result.data.message);
      router.push(
        pathname +
          "?" +
          createQueryString("bot_token", form.getValues("bot_token")),
      );
    }
  };

  const handleSetWebhook = () => {
    const { bot_token, webhookUrl } = form.getValues();
    if (!bot_token) {
      toast.error("Please enter a bot token");
      return;
    }
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }
    setWebhook.mutate({ bot_token, webhookUrl });
  };

  const handleDeleteWebhook = () => {
    const bot_token = form.getValues("bot_token");
    if (!bot_token) {
      toast.error("Please enter a bot token");
      return;
    }
    deleteWebhook.mutate({ bot_token });
  };

  return (
    <div className="w-full max-w-xl space-y-6 p-4">
      <Form {...form}>
        {!Boolean(bot_token) && (
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="bot_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bot Token</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your bot token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleGetInfo}
                variant="outline"
                disabled={getInfo.isLoading}
              >
                {getInfo.isFetching ? "Loading..." : "Manage Webhook"}
              </Button>
            </div>
          </form>
        )}

        {Boolean(bot_token) && (
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/api/telegram/webhook"
                      {...field}
                      defaultValue={getInfo.data?.webhookInfo.url}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleSetWebhook}
                disabled={setWebhook.isPending}
              >
                {setWebhook.isPending
                  ? "Loading..."
                  : getInfo.data?.webhookInfo.url
                    ? "Update URL"
                    : "Set Webhook"}
              </Button>
              <Button
                type="button"
                onClick={handleDeleteWebhook}
                disabled={deleteWebhook.isPending}
                variant="destructive"
              >
                {deleteWebhook.isPending ? "Loading..." : "Delete Webhook"}
              </Button>
            </div>
          </form>
        )}
      </Form>

      {getInfo.data?.webhookInfo.url && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Webhook Information:</h3>
          <pre className="overflow-auto whitespace-pre-wrap text-sm">
            {JSON.stringify(getInfo.data.webhookInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default WebhookManager;
