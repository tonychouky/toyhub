import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toPromotion } from "@/lib/serialize";
import { generateId } from "@/lib/utils";
import { getPromotionStatus } from "@/lib/server/promotions";

const INCLUDE = { products: { select: { id: true } }, categories: { select: { slug: true } }, occasions: { select: { id: true } } };

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const mode = sp.get("mode") ?? "active";
  const rows = await prisma.promotion.findMany({ include: INCLUDE });
  const all = rows.map(toPromotion);
  const now = new Date();

  if (mode === "admin") {
    return NextResponse.json(all.map((p) => ({ ...p, status: getPromotionStatus(p, now) })));
  }
  if (mode === "upcoming") {
    return NextResponse.json(all.filter((p) => getPromotionStatus(p, now) === "scheduled"));
  }
  if (mode === "expiringSoon") {
    const days = Number(sp.get("days") ?? 3);
    const horizon = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return NextResponse.json(
      all.filter((p) => getPromotionStatus(p, now) === "active" && new Date(p.endDate) <= horizon)
    );
  }
  // "active" (default)
  return NextResponse.json(all.filter((p) => getPromotionStatus(p, now) === "active"));
}

export async function POST(request: NextRequest) {
  const input = await request.json();
  const row = await prisma.promotion.create({
    data: {
      id: generateId("promo"),
      name: input.name,
      description: input.description || null,
      type: input.type,
      value: input.value,
      couponCode: input.couponCode || null,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      minimumOrderValue: input.minimumOrderValue,
      usageLimit: input.usageLimit,
      active: input.active ?? true,
      bannerImage: input.bannerImage || null,
      products: input.productIds ? { connect: input.productIds.map((id: string) => ({ id })) } : undefined,
      categories: input.categoryIds ? { connect: input.categoryIds.map((slug: string) => ({ slug })) } : undefined,
      occasions: input.occasionIds ? { connect: input.occasionIds.map((id: string) => ({ id })) } : undefined,
    },
    include: INCLUDE,
  });
  return NextResponse.json(toPromotion(row));
}
