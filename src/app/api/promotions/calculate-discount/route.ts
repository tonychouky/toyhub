import { NextRequest, NextResponse } from "next/server";
import { calculateDiscountServer } from "@/lib/server/promotions";

export async function POST(request: NextRequest) {
  const { lines, couponCode } = await request.json();
  const result = await calculateDiscountServer(lines ?? [], couponCode);
  return NextResponse.json(result);
}
