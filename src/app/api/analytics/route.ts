import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateId } from "@/lib/utils";

export async function GET() {
  const rows = await prisma.analyticsEvent.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
  return NextResponse.json(rows.map((r) => ({ ...r, payload: r.payload ? JSON.parse(r.payload) : undefined })));
}

export async function POST(request: NextRequest) {
  const { event, payload } = await request.json();
  const row = await prisma.analyticsEvent.create({
    data: { id: generateId("evt"), event, payload: payload ? JSON.stringify(payload) : null },
  });
  return NextResponse.json(row);
}
