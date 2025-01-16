import WebhookManager from "@/components/webhook-manager";
import Link from "next/link";
import { Suspense } from "react";

export default function WebhookManagerPage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col justify-center p-4">
      <Link
        href="/"
        className="font-semibold text-blue-500 underline-offset-2 hover:underline"
      >
        Back to home
      </Link>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <WebhookManager />
        </Suspense>
      </div>
    </main>
  );
}
