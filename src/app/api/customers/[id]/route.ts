import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Customer } from "@/types";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json(null);

  const orders = await prisma.order.findMany({ where: { customerId: user.id }, select: { total: true } });
  const customer: Customer = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? undefined,
    addresses: [],
    createdAt: user.createdAt.toISOString(),
    totalOrders: orders.length,
    totalSpent: +orders.reduce((sum, o) => sum + o.total, 0).toFixed(2),
  };
  return NextResponse.json(customer);
}
