import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toEventInquiry } from "@/lib/serialize";
import { generateId } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const input = await request.json();
  const row = await prisma.eventInquiry.create({
    data: {
      id: generateId("inq").toUpperCase(),
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      eventType: input.eventType,
      eventDate: input.eventDate,
      eventLocation: input.eventLocation,
      guestCount: input.guestCount,
      serviceRequested: input.serviceRequested,
      budgetRange: input.budgetRange,
      additionalInfo: input.additionalInfo || null,
    },
  });
  return NextResponse.json(toEventInquiry(row));
}
