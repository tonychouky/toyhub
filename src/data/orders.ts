import { Order } from "@/types";

// Demo orders used to seed LocalStorage on first admin visit so the admin
// dashboard and reports have realistic data before any real checkout has
// happened. See services/orders.ts#seedDemoOrdersIfEmpty — this never
// overwrites orders a real customer has already placed.

function statusHistoryFor(status: Order["status"], createdAt: string): Order["statusHistory"] {
  const sequence: Order["status"][] = [
    "placed",
    "confirmed",
    "preparing",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];
  const idx = sequence.indexOf(status);
  const base = new Date(createdAt).getTime();
  return sequence.slice(0, idx + 1).map((s, i) => ({
    status: s,
    date: new Date(base + i * 1000 * 60 * 60 * 20).toISOString(),
  }));
}

const seedRows: Array<{
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: Order["status"];
  paymentStatus: Order["paymentStatus"];
  createdAt: string;
  items: { productId: string; name: string; image: string; price: number; quantity: number }[];
  city: string;
  country: string;
}> = [
  {
    id: "ORDER_A1B2C3",
    customerId: "cust_001",
    customerName: "Layla Haddad",
    customerEmail: "layla.haddad@example.com",
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-08-02T09:00:00.000Z",
    city: "Beirut",
    country: "Lebanon",
    items: [
      { productId: "p001", name: "MegaBlocks Skyline Tower", image: "https://picsum.photos/seed/megablocks-skyline-tower-1/900/900", price: 49.99, quantity: 1 },
      { productId: "p008", name: "Die-Cast Classic Cars 8-Pack", image: "https://picsum.photos/seed/die-cast-classic-cars-8-pack-1/900/900", price: 19.99, quantity: 2 },
    ],
  },
  {
    id: "ORDER_D4E5F6",
    customerId: "cust_002",
    customerName: "Marcus Chen",
    customerEmail: "marcus.chen@example.com",
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2026-08-20T14:30:00.000Z",
    city: "San Francisco",
    country: "United States",
    items: [
      { productId: "p006", name: "Turbo RC Rally Racer", image: "https://picsum.photos/seed/turbo-rc-rally-racer-1/900/900", price: 89.99, quantity: 1 },
    ],
  },
  {
    id: "ORDER_G7H8I9",
    customerId: "cust_003",
    customerName: "Sofia Rossi",
    customerEmail: "sofia.rossi@example.com",
    status: "preparing",
    paymentStatus: "paid",
    createdAt: "2026-08-28T11:15:00.000Z",
    city: "Milan",
    country: "Italy",
    items: [
      { productId: "p003", name: "Magnetic Tiles Deluxe 100pc", image: "https://picsum.photos/seed/magnetic-tiles-deluxe-100pc-1/900/900", price: 59.99, quantity: 1 },
      { productId: "p007", name: "Wooden Pull-Along Fire Truck", image: "https://picsum.photos/seed/wooden-pull-along-fire-truck-1/900/900", price: 24.99, quantity: 1 },
    ],
  },
  {
    id: "ORDER_J1K2L3",
    customerId: "cust_004",
    customerName: "Omar Al-Sayed",
    customerEmail: "omar.alsayed@example.com",
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2026-09-01T08:00:00.000Z",
    city: "Dubai",
    country: "United Arab Emirates",
    items: [
      { productId: "p004", name: "Steel Girder Crane Engineering Kit", image: "https://picsum.photos/seed/steel-girder-crane-engineering-kit-1/900/900", price: 44.5, quantity: 1 },
    ],
  },
  {
    id: "ORDER_M4N5O6",
    customerId: "cust_005",
    customerName: "Emma Johnson",
    customerEmail: "emma.johnson@example.com",
    status: "placed",
    paymentStatus: "pending",
    createdAt: "2026-09-03T17:45:00.000Z",
    city: "London",
    country: "United Kingdom",
    items: [
      { productId: "p005", name: "Castle Kingdom Building Set", image: "https://picsum.photos/seed/castle-kingdom-building-set-1/900/900", price: 79.99, quantity: 1 },
    ],
  },
  {
    id: "ORDER_P7Q8R9",
    customerId: "cust_006",
    customerName: "Yuki Tanaka",
    customerEmail: "yuki.tanaka@example.com",
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-07-18T10:00:00.000Z",
    city: "Tokyo",
    country: "Japan",
    items: [
      { productId: "p002", name: "Junior Architect Bridge Set", image: "https://picsum.photos/seed/junior-architect-bridge-set-1/900/900", price: 34.99, quantity: 2 },
    ],
  },
  {
    id: "ORDER_S1T2U3",
    customerId: "cust_001",
    customerName: "Layla Haddad",
    customerEmail: "layla.haddad@example.com",
    status: "out_for_delivery",
    paymentStatus: "paid",
    createdAt: "2026-09-02T12:00:00.000Z",
    city: "Beirut",
    country: "Lebanon",
    items: [
      { productId: "p006", name: "Turbo RC Rally Racer", image: "https://picsum.photos/seed/turbo-rc-rally-racer-1/900/900", price: 89.99, quantity: 1 },
    ],
  },
  {
    id: "ORDER_V4W5X6",
    customerId: "cust_003",
    customerName: "Sofia Rossi",
    customerEmail: "sofia.rossi@example.com",
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2026-06-11T09:30:00.000Z",
    city: "Milan",
    country: "Italy",
    items: [
      { productId: "p008", name: "Die-Cast Classic Cars 8-Pack", image: "https://picsum.photos/seed/die-cast-classic-cars-8-pack-1/900/900", price: 19.99, quantity: 1 },
    ],
  },
];

export const seedOrders: Order[] = seedRows.map((row) => {
  const subtotal = row.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 60 ? 0 : 6.99;
  const discount = 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax - discount) * 100) / 100;
  return {
    id: row.id,
    customerId: row.customerId,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    items: row.items,
    subtotal,
    shipping,
    discount,
    tax,
    total,
    status: row.status,
    paymentStatus: row.paymentStatus,
    paymentMethod: "Visa ending in 4242",
    shippingAddress: {
      fullName: row.customerName,
      line1: "123 Main Street",
      city: row.city,
      state: "",
      postalCode: "00000",
      country: row.country,
      phone: "+1 555 000 0000",
    },
    deliveryMethod: "Standard Shipping",
    createdAt: row.createdAt,
    shipmentGroups: [
      {
        id: `${row.id}_SHIP1`,
        itemIndexes: row.items.map((_, i) => i),
        shippingCost: shipping,
        status: row.status,
      },
    ],
    statusHistory:
      row.status === "cancelled"
        ? [
            { status: "placed", date: row.createdAt },
            { status: "cancelled", date: row.createdAt },
          ]
        : statusHistoryFor(row.status, row.createdAt),
  };
});
