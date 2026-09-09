import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toEventService } from "@/lib/serialize";

export async function GET() {
  const rows = await prisma.eventService.findMany({ where: { active: true } });
  return NextResponse.json(rows.map(toEventService));
}
