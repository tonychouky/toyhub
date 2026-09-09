import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveOwner } from "@/lib/owner";
import { generateId } from "@/lib/utils";

function ownerWhere(owner: { userId?: string; visitorId?: string }) {
  return owner.userId ? { userId: owner.userId } : { visitorId: owner.visitorId ?? null, userId: null };
}

export async function GET(request: NextRequest) {
  const owner = resolveOwner(request);
  const rows = await prisma.wishlistItem.findMany({ where: ownerWhere(owner) });
  return NextResponse.json(rows.map((r) => r.productId));
}

export async function POST(request: NextRequest) {
  const owner = resolveOwner(request);
  const { productId } = await request.json();

  const existing = await prisma.wishlistItem.findFirst({ where: { ...ownerWhere(owner), productId } });
  if (!existing) {
    await prisma.wishlistItem.create({ data: { id: generateId("wish"), ...owner, productId } });
  }

  const rows = await prisma.wishlistItem.findMany({ where: ownerWhere(owner) });
  return NextResponse.json(rows.map((r) => r.productId));
}
