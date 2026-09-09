import { CartTotals, GiftCard, GiftOptions, GiftWrapping, Recipient } from "@/types";
import * as cartService from "@/services/cart";
import { calculateDiscount, CartLineLike, DiscountResult } from "@/services/promotions";
import { getGiftWrappingOptions, getGiftCardOptions } from "@/services/gift-options";
import { createShipmentGroups } from "@/services/shipments";
import { validateRecipient } from "@/services/recipients";
import { ShipmentGroup } from "@/types";

// -----------------------------------------------------------------------
// Gift configuration + order-level aggregation. calculateGiftOrder() is the
// single place the cart page and checkout page both call for gift fees,
// promo discounts, and shipment grouping — replacing what used to be two
// separate, duplicated `useMemo` blocks.
// -----------------------------------------------------------------------

export interface GiftConfigurationInput {
  wrapped: boolean;
  sendAsGift?: boolean;
  recipient?: Recipient;
  wrappingId?: string;
  cardId?: string;
  message?: string;
  isSurprise?: boolean;
  preferredDeliveryDate?: string;
  revealSenderName?: boolean;
}

export function createGiftConfiguration(input: GiftConfigurationInput): GiftOptions {
  return {
    wrapped: input.wrapped,
    wrappingId: input.wrappingId,
    cardId: input.cardId,
    message: input.message?.trim() || undefined,
    sendAsGift: input.sendAsGift,
    recipient: input.sendAsGift ? input.recipient : undefined,
    isSurprise: input.sendAsGift ? input.isSurprise : undefined,
    preferredDeliveryDate: input.sendAsGift ? input.preferredDeliveryDate : undefined,
    revealSenderName: input.sendAsGift ? input.revealSenderName : undefined,
  };
}

export function validateGiftConfiguration(
  options: GiftOptions | undefined,
  maxMessageLength = 300
): { valid: boolean; errors: string[] } {
  if (!options) return { valid: true, errors: [] };
  const errors: string[] = [];

  if (options.sendAsGift) {
    const { valid, errors: recipientErrors } = validateRecipient(options.recipient);
    if (!valid) errors.push(...(Object.values(recipientErrors).filter(Boolean) as string[]));
  }
  if (options.message && options.message.length > maxMessageLength) {
    errors.push(`Gift message must be ${maxMessageLength} characters or fewer.`);
  }
  return { valid: errors.length === 0, errors };
}

export interface GiftOrderResult {
  totals: CartTotals;
  giftFeesTotal: number;
  shipmentGroups: Omit<ShipmentGroup, "status">[];
  discount: DiscountResult;
  wrappings: GiftWrapping[];
  cards: GiftCard[];
}

export async function calculateGiftOrder(lines: CartLineLike[], couponCode?: string): Promise<GiftOrderResult> {
  const totals = cartService.calculateTotals(
    lines.map((l) => l.item),
    lines.map((l) => l.product)
  );

  const [discount, wrappings, cards] = await Promise.all([
    calculateDiscount(lines, couponCode),
    getGiftWrappingOptions(),
    getGiftCardOptions(),
  ]);

  const giftFeesTotal = lines.reduce((sum, { item }) => {
    if (!item.giftOptions?.wrapped) return sum;
    const wrapping = wrappings.find((w) => w.id === item.giftOptions?.wrappingId);
    const card = cards.find((c) => c.id === item.giftOptions?.cardId);
    const feePerUnit = (discount.freeGiftWrapping ? 0 : wrapping?.price ?? 0) + (card?.price ?? 0);
    return sum + feePerUnit * item.quantity;
  }, 0);

  const shipmentGroups = createShipmentGroups(lines);

  return { totals, giftFeesTotal, shipmentGroups, discount, wrappings, cards };
}
