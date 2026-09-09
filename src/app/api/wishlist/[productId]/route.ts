import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveOwner } from "@/lib/owner";

function ownerWhere(owner: { userId?: string; visitorId?: string }) {
  return owner.userId ? { userId: owner.userId } : { visitorId: owner.visitorId ?? null, userId: null };
}

export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
  const owner = resolveOwner(request);
  await prisma.wishlistItem.deleteMany({ where: { productId: params.productId, ...ownerWhere(owner) } });
  const rows = await prisma.wishlistItem.findMany({ where: ownerWhere(owner) });
  return NextResponse.json(rows.map((r) => r.productId));
}
