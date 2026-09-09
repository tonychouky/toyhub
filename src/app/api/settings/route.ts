import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toStoreSettings } from "@/lib/serialize";

const DEFAULTS = {
  id: 1,
  sendAsGiftEnabled: true,
  giftWrappingEnabled: true,
  giftCardsEnabled: true,
  maxGiftMessageLength: 300,
  eligibleCategories: "[]",
  scheduledDeliveryEnabled: true,
  hidePricesOnSurpriseGifts: true,
};

export async function GET() {
  const row = (await prisma.storeSettings.findUnique({ where: { id: 1 } })) ?? (await prisma.storeSettings.create({ data: DEFAULTS }));
  return NextResponse.json(toStoreSettings(row));
}

export async function PATCH(request: NextRequest) {
  const patch = await request.json();
  const data = { ...patch };
  if ("eligibleCategories" in data) data.eligibleCategories = JSON.stringify(data.eligibleCategories);

  const row = await prisma.storeSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { ...DEFAULTS, ...data },
  });
  return NextResponse.json(toStoreSettings(row));
}
