import { HydrateClient } from "@/trpc/server";
import SetupWebhookButton from "./_components/setup-webhook-button";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
        <SetupWebhookButton />
      </main>
    </HydrateClient>
  );
}
