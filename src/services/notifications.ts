import { Order, OrderStatus, ShipmentGroup } from "@/types";
import { apiUrl } from "@/lib/api-url";

// -----------------------------------------------------------------------
// Notification service — mock implementation. Every function here is the
// integration point for a real provider later (a transactional email
// service like SES/Postmark/SendGrid for email, Twilio for SMS): rewrite
// the body to make a real API call, keep the signature, and no caller needs
// to change. For now, calls are logged to SQL Server (NotificationLogEntry)
// so the behavior is inspectable during development/demos instead of
// silently doing nothing.
// -----------------------------------------------------------------------

async function log(type: string, orderId: string, summary: string) {
  await fetch(apiUrl("/api/notifications"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, orderId, summary }),
  });
}

/** TODO(real backend): send an email/SMS to shipmentGroup.recipient — never log recipient PII. */
export async function notifyGiftRecipient(order: Order, shipmentGroup: ShipmentGroup): Promise<void> {
  await log("gift_recipient", order.id, "Someone has sent you a gift from ToyHub.");
}

/** TODO(real backend): send a transactional order-confirmation email to the buyer. */
export async function notifyBuyerOrderConfirmation(order: Order): Promise<void> {
  await log("buyer_order_confirmation", order.id, `Order ${order.id} confirmed.`);
}

/** TODO(real backend): notify the buyer (and optionally the recipient) of a shipment status change. */
export async function notifyShipmentUpdate(order: Order, shipmentGroup: ShipmentGroup, status: OrderStatus): Promise<void> {
  await log("shipment_update", order.id, `Shipment ${shipmentGroup.id} status changed to ${status}.`);
}
