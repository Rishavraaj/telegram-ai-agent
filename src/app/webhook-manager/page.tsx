import WebhookManager from "@/components/webhook-manager";
import { HydrateClient } from "@/trpc/server";
import React from "react";

const WebhookManagerPage = () => {
  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
        <WebhookManager />
      </div>
    </HydrateClient>
  );
};

export default WebhookManagerPage;
