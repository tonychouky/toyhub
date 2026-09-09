import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Analytics abstraction — mock implementation. `track()` is the only
// function that touches storage; swap its body for a real provider call
// (Segment, GA4, Amplitude, etc.) later without touching any call site,
// since every feature-specific helper below just calls `track()`. Calls are
// fire-and-forget (not awaited by callers) so tracking never blocks the UI.
// -----------------------------------------------------------------------

export function track(event: string, payload?: Record<string, unknown>): void {
  fetch(apiUrl("/api/analytics"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, payload }),
  }).catch(() => {
    // best-effort tracking only
  });
}

export interface AnalyticsEvent {
  event: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

export async function getAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  const res = await fetch(apiUrl("/api/analytics"), { cache: "no-store" });
  return res.json();
}

export const trackGiftButtonClicked = (productId: string) => track("gift_button_clicked", { productId });
export const trackGiftConfigurationStarted = (productId: string) => track("gift_configuration_started", { productId });
export const trackGiftWrappingSelected = (wrappingId: string) => track("gift_wrapping_selected", { wrappingId });
export const trackGiftCardSelected = (cardId: string) => track("gift_card_selected", { cardId });
export const trackGiftMessageAdded = () => track("gift_message_added");
export const trackGiftCheckoutStarted = () => track("gift_checkout_started");
export const trackGiftOrderCompleted = (orderId: string) => track("gift_order_completed", { orderId });
