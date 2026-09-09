import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toOccasion } from "@/lib/serialize";
import { generateId, slugify } from "@/lib/utils";

const INCLUDE = { products: { select: { id: true } }, promotions: { select: { id: true } } };

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const slug = sp.get("slug");
  if (slug !== null) {
    const row = await prisma.occasion.findUnique({ where: { slug }, include: INCLUDE });
    return NextResponse.json(row ? toOccasion(row) : null);
  }

  const activeOnly = sp.get("activeOnly") !== "0";
  const limit = sp.get("limit") ? Number(sp.get("limit")) : undefined;
  const rows = await prisma.occasion.findMany({
    where: activeOnly ? { active: true } : undefined,
    include: INCLUDE,
    take: limit,
  });
  return NextResponse.json(rows.map(toOccasion));
}

export async function POST(request: NextRequest) {
  const input = await request.json();
  const row = await prisma.occasion.create({
    data: {
      id: generateId("occ"),
      name: input.name,
      slug: input.slug?.trim() ? slugify(input.slug) : slugify(input.name),
      description: input.description,
      bannerImage: input.bannerImage,
      giftIdeasNote: input.giftIdeasNote || null,
      active: input.active ?? true,
      startDate: input.startDate ? new Date(input.startDate) : null,
      endDate: input.endDate ? new Date(input.endDate) : null,
      products: input.productIds ? { connect: input.productIds.map((id: string) => ({ id })) } : undefined,
      promotions: input.promotionIds ? { connect: input.promotionIds.map((id: string) => ({ id })) } : undefined,
    },
    include: INCLUDE,
  });
  return NextResponse.json(toOccasion(row));
}
