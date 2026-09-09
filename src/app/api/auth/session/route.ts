import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

export async function GET(request: NextRequest) {
  const user = verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  return NextResponse.json(user);
}
