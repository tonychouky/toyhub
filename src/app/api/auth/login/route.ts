import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { toAuthUser } from "@/lib/serialize";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/session";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const authUser = toAuthUser(user);
  const response = NextResponse.json(authUser);
  response.cookies.set(SESSION_COOKIE_NAME, createSessionToken(authUser), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  // Claim any guest cart/wishlist rows recorded under this browser's visitor id.
  const visitorId = request.cookies.get("toyhub_visitor_id")?.value;
  if (visitorId) {
    await prisma.cartItem.updateMany({ where: { visitorId, userId: null }, data: { userId: user.id, visitorId: null } });
    await prisma.wishlistItem.updateMany({ where: { visitorId, userId: null }, data: { userId: user.id, visitorId: null } });
  }

  return response;
}
