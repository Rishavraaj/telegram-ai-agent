"use client";

import { useState } from "react";

export function ConnectCalendarButton() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      window.location.href = "/api/auth/google";
    } catch (error) {
      console.error("Error connecting to Google Calendar:", error);
    }
    setIsConnecting(false);
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="rounded-full bg-blue-500 px-10 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
    >
      {isConnecting ? "Connecting..." : "Connect Google Calendar"}
    </button>
  );
}
