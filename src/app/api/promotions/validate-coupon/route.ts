import { NextRequest, NextResponse } from "next/server";
import { validateCouponServer } from "@/lib/server/promotions";

export async function POST(request: NextRequest) {
  const { code } = await request.json();
  const result = await validateCouponServer(code ?? "");
  return NextResponse.json(result);
}
