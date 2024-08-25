import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logRequest } from "./utils/logger";

export function middleware(req: NextRequest) {
  const start = Date.now();
  const ip = req.headers.get("x-forwarded-for") || req.ip || "Unknown";

  const res = NextResponse.next();

  const end = Date.now();
  const duration = end - start;

  logRequest(req.method, req.url, ip, duration);

  return res;
}

export const config = {
  matcher: "/:path*",
};
