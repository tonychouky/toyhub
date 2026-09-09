import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toGiftCard } from "@/lib/serialize";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.giftCard.findUnique({ where: { id: params.id } });
  return NextResponse.json(row ? toGiftCard(row) : null);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const patch = await request.json();
  const row = await prisma.giftCard.update({ where: { id: params.id }, data: patch }).catch(() => null);
  return NextResponse.json(row ? toGiftCard(row) : null);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.giftCard.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
