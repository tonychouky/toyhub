import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toReview } from "@/lib/serialize";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 8);
  const rows = await prisma.review.findMany({ where: { productId: params.id }, take: limit });
  return NextResponse.json(rows.map(toReview));
}
