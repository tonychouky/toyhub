import { EventInquiry, EventService } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Events service — event-service catalog reads from app/api/events (SQL
// Server). Inquiry submission posts to app/api/event-inquiries, isolated
// behind this one function so it can be rewired to a real email/CRM
// notification later without touching EventRequestForm.
// -----------------------------------------------------------------------

export async function getEventServices(): Promise<EventService[]> {
  const res = await fetch(apiUrl("/api/events"), { cache: "no-store" });
  return res.json();
}

export async function getEventServiceBySlug(slug: string): Promise<EventService | null> {
  const res = await fetch(apiUrl(`/api/events/${slug}`), { cache: "no-store" });
  return res.json();
}

export type EventInquiryInput = Omit<EventInquiry, "id" | "createdAt">;

export async function submitEventInquiry(input: EventInquiryInput): Promise<EventInquiry> {
  const res = await fetch(apiUrl("/api/event-inquiries"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}
