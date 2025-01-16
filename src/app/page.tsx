import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
        <Link href="/webhook-manager">
          <Button variant={"link"}>Webhook Manager</Button>
        </Link>
      </main>
    </HydrateClient>
  );
}
