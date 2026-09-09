import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toOrder } from "@/lib/serialize";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { paymentStatus } = await request.json();
  const row = await prisma.order
    .update({ where: { id: params.id }, data: { paymentStatus }, include: { items: true, shipmentGroups: true } })
    .catch(() => null);
  return NextResponse.json(row ? toOrder(row) : null);
}
