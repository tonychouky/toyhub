import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateId } from "@/lib/utils";

export async function GET() {
  const rows = await prisma.notificationLogEntry.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const { type, orderId, summary } = await request.json();
  const row = await prisma.notificationLogEntry.create({
    data: { id: generateId("notif"), type, orderId, summary },
  });
  return NextResponse.json(row);
}
