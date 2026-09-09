import { StoreSettings } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Store settings — thin fetch wrapper over app/api/settings (single row in
// SQL Server). Components should only ever read gift-feature gating through
// these functions, never hard-code the defaults.
// -----------------------------------------------------------------------

export async function getStoreSettings(): Promise<StoreSettings> {
  const res = await fetch(apiUrl("/api/settings"), { cache: "no-store" });
  return res.json();
}

export async function updateStoreSettings(patch: Partial<StoreSettings>): Promise<StoreSettings> {
  const res = await fetch(apiUrl("/api/settings"), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return res.json();
}
