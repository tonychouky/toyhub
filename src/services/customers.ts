import { Customer } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Customers service — admin-facing read layer. totalOrders/totalSpent are
// computed from real Order rows (see app/api/customers) rather than stored
// counters, so they can never drift out of sync.
// -----------------------------------------------------------------------

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(apiUrl("/api/customers"), { cache: "no-store" });
  return res.json();
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const res = await fetch(apiUrl(`/api/customers/${id}`), { cache: "no-store" });
  return res.json();
}
