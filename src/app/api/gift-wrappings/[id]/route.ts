import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toGiftWrapping } from "@/lib/serialize";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.giftWrapping.findUnique({ where: { id: params.id } });
  return NextResponse.json(row ? toGiftWrapping(row) : null);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const patch = await request.json();
  const row = await prisma.giftWrapping.update({ where: { id: params.id }, data: patch }).catch(() => null);
  return NextResponse.json(row ? toGiftWrapping(row) : null);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.giftWrapping.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
