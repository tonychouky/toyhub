import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Customer } from "@/types";

async function withOrderStats(user: { id: string; name: string; email: string; phone: string | null; createdAt: Date }): Promise<Customer> {
  const orders = await prisma.order.findMany({ where: { customerId: user.id }, select: { total: true } });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? undefined,
    addresses: [],
    createdAt: user.createdAt.toISOString(),
    totalOrders: orders.length,
    totalSpent: +orders.reduce((sum, o) => sum + o.total, 0).toFixed(2),
  };
}

export async function GET() {
  const users = await prisma.user.findMany({ where: { role: "customer" } });
  const customers = await Promise.all(users.map(withOrderStats));
  return NextResponse.json(customers);
}
