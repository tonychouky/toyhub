import { NextRequest, NextResponse } from "next/server";

// Ensures every visitor (logged in or not) has a stable anonymous id, used to
// key guest cart/wishlist rows in SQL Server. Cleared identity: this is not
// an auth mechanism, just "which browser is this" for cart/wishlist ownership
// before/without login. See services/cart.ts / services/wishlist.ts.
const VISITOR_COOKIE = "toyhub_visitor_id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!request.cookies.get(VISITOR_COOKIE)) {
    response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: ONE_YEAR_SECONDS,
      path: "/",
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
