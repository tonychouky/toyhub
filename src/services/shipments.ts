import { Recipient, ShipmentGroup } from "@/types";
import { CartLineLike } from "@/services/promotions";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/services/cart";
import { generateId } from "@/lib/utils";

// -----------------------------------------------------------------------
// Groups cart lines by delivery destination so an order with gifts to
// different people gets separate shipments (and separate shipping costs)
// per recipient, while a normal order collapses to a single implicit group
// that ships to the buyer. Reuses services/cart.ts's shipping constants
// instead of redefining them, so a normal order's shipping cost here is
// identical to what services/cart.ts#calculateTotals already computes.
// -----------------------------------------------------------------------

function recipientKey(recipient: Recipient): string {
  return [recipient.fullName, recipient.phone, recipient.address.line1, recipient.address.city]
    .map((s) => s.trim().toLowerCase())
    .join("|");
}

export function createShipmentGroups(lines: CartLineLike[]): Omit<ShipmentGroup, "status">[] {
  const buyerItemIndexes: number[] = [];
  const recipientGroups = new Map<string, { recipient: Recipient; itemIndexes: number[] }>();

  lines.forEach((line, index) => {
    const recipient = line.item.giftOptions?.sendAsGift ? line.item.giftOptions.recipient : undefined;
    if (!recipient) {
      buyerItemIndexes.push(index);
      return;
    }
    const key = recipientKey(recipient);
    const existing = recipientGroups.get(key);
    if (existing) {
      existing.itemIndexes.push(index);
    } else {
      recipientGroups.set(key, { recipient, itemIndexes: [index] });
    }
  });

  function shippingCostFor(itemIndexes: number[]): number {
    const groupSubtotal = itemIndexes.reduce((sum, i) => sum + lines[i].product.price * lines[i].item.quantity, 0);
    if (groupSubtotal <= 0) return 0;
    return groupSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  }

  const groups: Omit<ShipmentGroup, "status">[] = [];
  if (buyerItemIndexes.length > 0 || recipientGroups.size === 0) {
    groups.push({
      id: generateId("ship"),
      itemIndexes: buyerItemIndexes,
      shippingCost: shippingCostFor(buyerItemIndexes),
    });
  }
  for (const { recipient, itemIndexes } of recipientGroups.values()) {
    groups.push({
      id: generateId("ship"),
      recipient,
      itemIndexes,
      shippingCost: shippingCostFor(itemIndexes),
    });
  }
  return groups;
}
