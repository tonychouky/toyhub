import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toOccasion } from "@/lib/serialize";

const INCLUDE = { products: { select: { id: true } }, promotions: { select: { id: true } } };

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.occasion.findUnique({ where: { id: params.id }, include: INCLUDE });
  return NextResponse.json(row ? toOccasion(row) : null);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const patch = await request.json();
  const { productIds, promotionIds, startDate, endDate, ...rest } = patch;

  const row = await prisma.occasion
    .update({
      where: { id: params.id },
      data: {
        ...rest,
        startDate: startDate !== undefined ? (startDate ? new Date(startDate) : null) : undefined,
        endDate: endDate !== undefined ? (endDate ? new Date(endDate) : null) : undefined,
        products: productIds ? { set: productIds.map((id: string) => ({ id })) } : undefined,
        promotions: promotionIds ? { set: promotionIds.map((id: string) => ({ id })) } : undefined,
      },
      include: INCLUDE,
    })
    .catch(() => null);
  return NextResponse.json(row ? toOccasion(row) : null);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.occasion.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
