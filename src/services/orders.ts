import { Order, OrderItem, Address, OrderStatus, ShipmentGroup, PaymentStatus } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Orders service — thin fetch wrapper over app/api/orders/* (SQL Server via
// Prisma).
// -----------------------------------------------------------------------

export interface CreateOrderInput {
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  deliveryMethod: string;
  paymentMethod: string;
  shipmentGroups: Omit<ShipmentGroup, "status">[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const res = await fetch(apiUrl("/api/orders"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

export async function getOrders(customerId?: string): Promise<Order[]> {
  const res = await fetch(apiUrl(`/api/orders${customerId ? `?customerId=${customerId}` : ""}`), { cache: "no-store" });
  return res.json();
}

export async function getOrderById(id: string): Promise<Order | null> {
  const res = await fetch(apiUrl(`/api/orders/${id}`), { cache: "no-store" });
  return res.json();
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  const res = await fetch(apiUrl(`/api/orders/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function updateShipmentStatus(orderId: string, shipmentGroupId: string, status: OrderStatus): Promise<Order | null> {
  const res = await fetch(apiUrl(`/api/orders/${orderId}/shipments/${shipmentGroupId}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Order | null> {
  const res = await fetch(apiUrl(`/api/orders/${id}/payment`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentStatus }),
  });
  return res.json();
}
