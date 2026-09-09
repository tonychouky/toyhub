import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toOrder } from "@/lib/serialize";
import { generateId } from "@/lib/utils";

const INCLUDE = { items: true, shipmentGroups: true };

export async function GET(request: NextRequest) {
  const customerId = request.nextUrl.searchParams.get("customerId");
  const rows = await prisma.order.findMany({
    where: customerId ? { customerId } : undefined,
    include: INCLUDE,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(rows.map(toOrder));
}

export async function POST(request: NextRequest) {
  const input = await request.json();
  const now = new Date();
  const id = generateId("order").toUpperCase();

  const row = await prisma.order.create({
    data: {
      id,
      customerId: input.customerId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      subtotal: input.subtotal,
      shipping: input.shipping,
      discount: input.discount,
      tax: input.tax,
      total: input.total,
      status: "placed",
      paymentStatus: "paid",
      paymentMethod: input.paymentMethod,
      shippingAddress: JSON.stringify(input.shippingAddress),
      deliveryMethod: input.deliveryMethod,
      createdAt: now,
      statusHistory: JSON.stringify([{ status: "placed", date: now.toISOString() }]),
      items: {
        create: input.items.map((item: Record<string, unknown>) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          giftOptions: item.giftOptions ? JSON.stringify(item.giftOptions) : null,
        })),
      },
      shipmentGroups: {
        create: input.shipmentGroups.map((g: Record<string, unknown>) => ({
          id: g.id,
          recipient: g.recipient ? JSON.stringify(g.recipient) : null,
          itemIndexes: JSON.stringify(g.itemIndexes),
          shippingCost: g.shippingCost,
          status: "placed",
        })),
      },
    },
    include: INCLUDE,
  });

  return NextResponse.json(toOrder(row));
}
