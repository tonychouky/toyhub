import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCartItem } from "@/lib/serialize";
import { resolveOwner } from "@/lib/owner";
import { generateId } from "@/lib/utils";

function ownerWhere(owner: { userId?: string; visitorId?: string }) {
  return owner.userId ? { userId: owner.userId } : { visitorId: owner.visitorId ?? null, userId: null };
}

/** "Send as a Gift" always creates a new, distinct line — never merges. */
export async function POST(request: NextRequest) {
  const owner = resolveOwner(request);
  const { productId, quantity, giftOptions } = await request.json();

  await prisma.cartItem.create({
    data: { id: generateId("line"), ...owner, productId, quantity, giftOptions: JSON.stringify(giftOptions) },
  });

  const rows = await prisma.cartItem.findMany({ where: ownerWhere(owner), orderBy: { createdAt: "asc" } });
  return NextResponse.json(rows.map(toCartItem));
}
