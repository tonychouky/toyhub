import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toGiftWrapping } from "@/lib/serialize";
import { generateId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const activeOnly = request.nextUrl.searchParams.get("activeOnly") !== "0";
  const rows = await prisma.giftWrapping.findMany({ where: activeOnly ? { active: true } : undefined });
  return NextResponse.json(rows.map(toGiftWrapping));
}

export async function POST(request: NextRequest) {
  const input = await request.json();
  const row = await prisma.giftWrapping.create({
    data: {
      id: generateId("gw"),
      name: input.name,
      image: input.image,
      previewImage: input.previewImage || null,
      price: input.price,
      occasion: input.occasion || null,
      active: input.active ?? true,
    },
  });
  return NextResponse.json(toGiftWrapping(row));
}
