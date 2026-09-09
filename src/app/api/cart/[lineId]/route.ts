import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCartItem } from "@/lib/serialize";
import { resolveOwner } from "@/lib/owner";

function ownerWhere(owner: { userId?: string; visitorId?: string }) {
  return owner.userId ? { userId: owner.userId } : { visitorId: owner.visitorId ?? null, userId: null };
}

export async function PATCH(request: NextRequest, { params }: { params: { lineId: string } }) {
  const owner = resolveOwner(request);
  const body = await request.json();

  if (typeof body.quantity === "number" && body.quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { id: params.lineId, ...ownerWhere(owner) } });
  } else {
    const data: Record<string, unknown> = {};
    if (typeof body.quantity === "number") data.quantity = body.quantity;
    if ("giftOptions" in body) data.giftOptions = body.giftOptions ? JSON.stringify(body.giftOptions) : null;
    await prisma.cartItem.updateMany({ where: { id: params.lineId, ...ownerWhere(owner) }, data });
  }

  const rows = await prisma.cartItem.findMany({ where: ownerWhere(owner), orderBy: { createdAt: "asc" } });
  return NextResponse.json(rows.map(toCartItem));
}

export async function DELETE(request: NextRequest, { params }: { params: { lineId: string } }) {
  const owner = resolveOwner(request);
  await prisma.cartItem.deleteMany({ where: { id: params.lineId, ...ownerWhere(owner) } });
  const rows = await prisma.cartItem.findMany({ where: ownerWhere(owner), orderBy: { createdAt: "asc" } });
  return NextResponse.json(rows.map(toCartItem));
}
