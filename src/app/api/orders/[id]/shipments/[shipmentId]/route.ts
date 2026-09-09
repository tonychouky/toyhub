import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toOrder } from "@/lib/serialize";

export async function PATCH(request: NextRequest, { params }: { params: { id: string; shipmentId: string } }) {
  const { status } = await request.json();
  await prisma.shipmentGroup.updateMany({ where: { id: params.shipmentId, orderId: params.id }, data: { status } });
  const row = await prisma.order.findUnique({ where: { id: params.id }, include: { items: true, shipmentGroups: true } });
  return NextResponse.json(row ? toOrder(row) : null);
}
