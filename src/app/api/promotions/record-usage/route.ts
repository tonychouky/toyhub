import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { ids } = await request.json();
  if (Array.isArray(ids)) {
    for (const id of ids) {
      await prisma.promotion.update({ where: { id }, data: { usageCount: { increment: 1 } } }).catch(() => null);
    }
  }
  return NextResponse.json({ ok: true });
}
