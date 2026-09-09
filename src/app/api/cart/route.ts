import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCartItem } from "@/lib/serialize";
import { resolveOwner } from "@/lib/owner";
import { generateId } from "@/lib/utils";

function ownerWhere(owner: { userId?: string; visitorId?: string }) {
  return owner.userId ? { userId: owner.userId } : { visitorId: owner.visitorId ?? null, userId: null };
}

export async function GET(request: NextRequest) {
  const owner = resolveOwner(request);
  const rows = await prisma.cartItem.findMany({ where: ownerWhere(owner), orderBy: { createdAt: "asc" } });
  return NextResponse.json(rows.map(toCartItem));
}

export async function POST(request: NextRequest) {
  const owner = resolveOwner(request);
  const { productId, quantity } = await request.json();

  // Merge into the first existing *plain* (non-gift) line for this product —
  // a gift-wrapped line is always distinct (see cartService docs, pre-migration).
  const existing = await prisma.cartItem.findFirst({
    where: { ...ownerWhere(owner), productId, giftOptions: null },
  });

  if (existing) {
    await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + quantity } });
  } else {
    await prisma.cartItem.create({
      data: { id: generateId("line"), ...owner, productId, quantity },
    });
  }

  const rows = await prisma.cartItem.findMany({ where: ownerWhere(owner), orderBy: { createdAt: "asc" } });
  return NextResponse.json(rows.map(toCartItem));
}

export async function DELETE(request: NextRequest) {
  const owner = resolveOwner(request);
  await prisma.cartItem.deleteMany({ where: ownerWhere(owner) });
  return NextResponse.json([]);
}
