import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toEventService } from "@/lib/serialize";

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const row = await prisma.eventService.findUnique({ where: { slug: params.slug } });
  return NextResponse.json(row ? toEventService(row) : null);
}
