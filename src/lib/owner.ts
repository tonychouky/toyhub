import { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

const VISITOR_COOKIE = "toyhub_visitor_id";

/** Resolves "who is making this cart/wishlist request" — the logged-in user if any, else the anonymous visitor id set by middleware.ts. */
export function resolveOwner(request: NextRequest): { userId?: string; visitorId?: string } {
  const user = verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (user) return { userId: user.id };
  const visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  return { visitorId };
}
