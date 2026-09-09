import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toPromotion } from "@/lib/serialize";

const INCLUDE = { products: { select: { id: true } }, categories: { select: { slug: true } }, occasions: { select: { id: true } } };

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.promotion.findUnique({ where: { id: params.id }, include: INCLUDE });
  return NextResponse.json(row ? toPromotion(row) : null);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const patch = await request.json();
  const { productIds, categoryIds, occasionIds, startDate, endDate, ...rest } = patch;

  const row = await prisma.promotion
    .update({
      where: { id: params.id },
      data: {
        ...rest,
        startDate: startDate !== undefined ? new Date(startDate) : undefined,
        endDate: endDate !== undefined ? new Date(endDate) : undefined,
        products: productIds ? { set: productIds.map((id: string) => ({ id })) } : undefined,
        categories: categoryIds ? { set: categoryIds.map((slug: string) => ({ slug })) } : undefined,
        occasions: occasionIds ? { set: occasionIds.map((id: string) => ({ id })) } : undefined,
      },
      include: INCLUDE,
    })
    .catch(() => null);
  return NextResponse.json(row ? toPromotion(row) : null);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.promotion.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
