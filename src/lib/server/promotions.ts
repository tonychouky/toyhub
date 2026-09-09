import { prisma } from "@/lib/prisma";
import { toPromotion, toOccasion } from "@/lib/serialize";
import { CartItem, Product, Promotion, PromotionStatus } from "@/types";

// Server-only: shared by every app/api/promotions/* route (list, [id],
// validate-coupon, calculate-discount) so this logic is written once. Not
// imported by any client component.

const INCLUDE = { products: { select: { id: true } }, categories: { select: { slug: true } }, occasions: { select: { id: true } } };

export function getPromotionStatus(promo: Promotion, now: Date = new Date()): PromotionStatus {
  if (!promo.active) return "expired";
  const start = new Date(promo.startDate);
  const end = new Date(promo.endDate);
  if (now < start) return "scheduled";
  if (now > end) return "expired";
  return "active";
}

export interface CouponResult {
  valid: boolean;
  promotion?: Promotion;
  reason?: string;
}

export async function validateCouponServer(code: string): Promise<CouponResult> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { valid: false, reason: "Enter a coupon code." };

  const row = await prisma.promotion.findFirst({ where: { couponCode: trimmed }, include: INCLUDE });
  if (!row) return { valid: false, reason: "This coupon code isn't valid." };
  const promo = toPromotion(row);

  const status = getPromotionStatus(promo);
  if (status === "scheduled") return { valid: false, reason: "This coupon isn't active yet." };
  if (status === "expired") return { valid: false, reason: "This coupon has expired." };
  if (typeof promo.usageLimit === "number" && row.usageCount >= promo.usageLimit) {
    return { valid: false, reason: "This coupon has reached its usage limit." };
  }

  return { valid: true, promotion: promo };
}

export interface CartLineLike {
  item: CartItem;
  product: Product;
}

export interface DiscountResult {
  amount: number;
  freeShipping: boolean;
  freeGiftWrapping: boolean;
  appliedPromotions: Promotion[];
}

async function promoMatchesProduct(promo: Promotion, product: Product): Promise<boolean> {
  const hasScope = !!(promo.productIds?.length || promo.categoryIds?.length || promo.occasionIds?.length);
  if (!hasScope) return true;
  if (promo.productIds?.includes(product.id)) return true;
  if (promo.categoryIds?.includes(product.category)) return true;
  if (promo.occasionIds?.length) {
    const occasionRows = await prisma.occasion.findMany({
      where: { id: { in: promo.occasionIds } },
      include: { products: { select: { id: true } } },
    });
    const relevant = occasionRows.map(toOccasion);
    if (relevant.some((o) => o.productIds.includes(product.id))) return true;
  }
  return false;
}

export async function calculateDiscountServer(lines: CartLineLike[], couponCode?: string): Promise<DiscountResult> {
  const rows = await prisma.promotion.findMany({ include: INCLUDE });
  const now = new Date();
  const active = rows.map(toPromotion).filter((p) => getPromotionStatus(p, now) === "active");
  const automatic = active.filter((p) => !p.couponCode);

  let couponPromo: Promotion | undefined;
  if (couponCode?.trim()) {
    const result = await validateCouponServer(couponCode);
    if (result.valid) couponPromo = result.promotion;
  }

  const candidates = couponPromo ? [...automatic, couponPromo] : automatic;
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.item.quantity, 0);

  let amount = 0;
  let freeShipping = false;
  let freeGiftWrapping = false;
  const appliedPromotions: Promotion[] = [];

  for (const promo of candidates) {
    const matchingLines: { line: CartLineLike; matches: boolean }[] = [];
    for (const line of lines) {
      matchingLines.push({ line, matches: await promoMatchesProduct(promo, line.product) });
    }
    const matched = matchingLines.filter((m) => m.matches).map((m) => m.line);
    const hasScope = !!(promo.productIds?.length || promo.categoryIds?.length || promo.occasionIds?.length);
    const scopeApplies = matched.length > 0 || !hasScope;
    if (!scopeApplies) continue;

    const matchedSubtotal = matched.reduce((sum, l) => sum + l.product.price * l.item.quantity, 0);
    const scopeSubtotal = hasScope ? matchedSubtotal : subtotal;

    if (typeof promo.minimumOrderValue === "number" && subtotal < promo.minimumOrderValue) continue;

    switch (promo.type) {
      case "percentage": {
        if (scopeSubtotal <= 0) continue;
        amount += +(scopeSubtotal * ((promo.value ?? 0) / 100)).toFixed(2);
        appliedPromotions.push(promo);
        break;
      }
      case "fixed": {
        amount += Math.min(promo.value ?? 0, subtotal);
        appliedPromotions.push(promo);
        break;
      }
      case "free_shipping": {
        freeShipping = true;
        appliedPromotions.push(promo);
        break;
      }
      case "free_gift_wrapping": {
        freeGiftWrapping = true;
        appliedPromotions.push(promo);
        break;
      }
      case "buy_x_get_y": {
        const groupSize = (promo.value ?? 1) + 1;
        const units: number[] = [];
        for (const l of matched) {
          for (let i = 0; i < l.item.quantity; i++) units.push(l.product.price);
        }
        units.sort((a, b) => a - b);
        const freeCount = Math.floor(units.length / groupSize);
        if (freeCount > 0) {
          amount += +units.slice(0, freeCount).reduce((s, v) => s + v, 0).toFixed(2);
          appliedPromotions.push(promo);
        }
        break;
      }
    }
  }

  return {
    amount: +Math.min(amount, subtotal).toFixed(2),
    freeShipping,
    freeGiftWrapping,
    appliedPromotions,
  };
}
