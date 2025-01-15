import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware triggered:", request.method, request.url);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/telegram/:path*",
};
