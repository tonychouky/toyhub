import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProduct } from "@/lib/serialize";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.product.findFirst({ where: { OR: [{ id: params.id }, { slug: params.id }] } });
  return NextResponse.json(row ? toProduct(row) : null);
}

const JSON_ARRAY_FIELDS = new Set(["images", "features", "whatsIncluded"]);

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const patch = await request.json();
  const data: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(patch)) {
    if (key === "category") {
      data.categorySlug = value;
    } else if (key === "specifications") {
      data.specifications = JSON.stringify(value);
    } else if (JSON_ARRAY_FIELDS.has(key)) {
      data[key] = value === undefined ? undefined : JSON.stringify(value);
    } else if (key === "id" || key === "createdAt") {
      // never mutate
    } else {
      data[key] = value;
    }
  }

  const existing = await prisma.product.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json(null, { status: 404 });

  const row = await prisma.product.update({ where: { id: params.id }, data });
  return NextResponse.json(toProduct(row));
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.review.deleteMany({ where: { productId: params.id } });
  await prisma.product.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
