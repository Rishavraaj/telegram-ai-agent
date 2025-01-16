import WebhookManager from "@/components/webhook-manager";
import { Suspense } from "react";

export default function WebhookManagerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <WebhookManager />
      </Suspense>
    </main>
  );
}
