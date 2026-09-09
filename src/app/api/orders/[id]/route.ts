import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toOrder } from "@/lib/serialize";

const INCLUDE = { items: true, shipmentGroups: true };

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.order.findUnique({ where: { id: params.id }, include: INCLUDE });
  return NextResponse.json(row ? toOrder(row) : null);
}

/** Updates order-level status and appends to statusHistory. */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await request.json();
  const existing = await prisma.order.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json(null, { status: 404 });

  const statusHistory = JSON.parse(existing.statusHistory) as { status: string; date: string }[];
  statusHistory.push({ status, date: new Date().toISOString() });

  const row = await prisma.order.update({
    where: { id: params.id },
    data: { status, statusHistory: JSON.stringify(statusHistory) },
    include: INCLUDE,
  });
  return NextResponse.json(toOrder(row));
}
