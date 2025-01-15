import { ConnectCalendarButton } from "./_components/ConnectCalendarButton";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
        <h1 className="text-4xl font-bold">AI Calendar Assistant</h1>
        <p className="text-lg text-gray-400">
          Connect your Google Calendar to get started
        </p>
        <ConnectCalendarButton />
      </main>
    </HydrateClient>
  );
}
