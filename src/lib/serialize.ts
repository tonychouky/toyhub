// Converts Prisma rows (which store JSON-shaped fields as NVarChar text,
// since SQL Server has no native JSON/array/enum column types) into the app's
// plain TS domain types from src/types/index.ts. Centralized here because
// several of these (Product especially) get mapped from many different API
// routes.

import type {
  Product as PrismaProduct,
  Review as PrismaReview,
  GiftWrapping as PrismaGiftWrapping,
  GiftCard as PrismaGiftCard,
  Occasion as PrismaOccasion,
  Promotion as PrismaPromotion,
  EventService as PrismaEventService,
  EventInquiry as PrismaEventInquiry,
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
  ShipmentGroup as PrismaShipmentGroup,
  User as PrismaUser,
  StoreSettings as PrismaStoreSettings,
  CartItem as PrismaCartItem,
  WishlistItem as PrismaWishlistItem,
} from "@prisma/client";
import type {
  Product,
  Review,
  GiftWrapping,
  GiftCard,
  Occasion,
  Promotion,
  EventService,
  EventInquiry,
  Order,
  OrderItem,
  ShipmentGroup,
  AuthUser,
  StoreSettings,
  AgeRange,
  CategorySlug,
  OrderStatus,
  PaymentStatus,
  PromotionType,
  EventCategorySlug,
  CartItem,
} from "@/types";

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function toProduct(row: PrismaProduct): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.categorySlug as CategorySlug,
    slug: row.slug,
    description: row.description,
    price: row.price,
    originalPrice: row.originalPrice ?? undefined,
    discount: row.discount ?? undefined,
    images: parseJson<string[]>(row.images, []),
    rating: row.rating,
    reviewCount: row.reviewCount,
    ageRange: row.ageRange as AgeRange,
    stock: row.stock,
    sku: row.sku,
    barcode: row.barcode ?? undefined,
    features: parseJson<string[]>(row.features, []),
    specifications: parseJson<Record<string, string>>(row.specifications, {}),
    safetyInformation: row.safetyInformation ?? undefined,
    whatsIncluded: row.whatsIncluded ? parseJson<string[]>(row.whatsIncluded, []) : undefined,
    isBestSeller: row.isBestSeller,
    isNew: row.isNew,
    isGiftable: row.isGiftable,
    createdAt: row.createdAt.toISOString(),
    soldCount: row.soldCount ?? undefined,
  };
}

export function toReview(row: PrismaReview): Review {
  return {
    id: row.id,
    productId: row.productId,
    author: row.author,
    rating: row.rating,
    title: row.title,
    comment: row.comment,
    date: row.date,
    verifiedPurchase: row.verifiedPurchase,
    helpfulCount: row.helpfulCount,
  };
}

export function toGiftWrapping(row: PrismaGiftWrapping): GiftWrapping {
  return {
    id: row.id,
    name: row.name,
    image: row.image,
    previewImage: row.previewImage ?? undefined,
    price: row.price,
    occasion: row.occasion ?? undefined,
    active: row.active,
  };
}

export function toGiftCard(row: PrismaGiftCard): GiftCard {
  return {
    id: row.id,
    name: row.name,
    image: row.image,
    previewImage: row.previewImage ?? undefined,
    price: row.price,
    occasion: row.occasion ?? undefined,
    active: row.active,
  };
}

export function toOccasion(row: PrismaOccasion & { products?: { id: string }[]; promotions?: { id: string }[] }): Occasion {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    bannerImage: row.bannerImage,
    giftIdeasNote: row.giftIdeasNote ?? undefined,
    productIds: row.products?.map((p) => p.id) ?? [],
    promotionIds: row.promotions?.map((p) => p.id) ?? [],
    active: row.active,
    startDate: row.startDate?.toISOString(),
    endDate: row.endDate?.toISOString(),
    createdAt: row.createdAt.toISOString(),
  };
}

export function toPromotion(
  row: PrismaPromotion & { products?: { id: string }[]; categories?: { slug: string }[]; occasions?: { id: string }[] }
): Promotion {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    type: row.type as PromotionType,
    value: row.value ?? undefined,
    couponCode: row.couponCode ?? undefined,
    startDate: row.startDate.toISOString(),
    endDate: row.endDate.toISOString(),
    minimumOrderValue: row.minimumOrderValue ?? undefined,
    productIds: row.products?.map((p) => p.id),
    categoryIds: row.categories?.map((c) => c.slug),
    occasionIds: row.occasions?.map((o) => o.id),
    usageLimit: row.usageLimit ?? undefined,
    active: row.active,
    bannerImage: row.bannerImage ?? undefined,
  };
}

export function toEventService(row: PrismaEventService): EventService {
  return {
    id: row.id,
    slug: row.slug as EventCategorySlug,
    name: row.name,
    description: row.description,
    image: row.image,
    gallery: parseJson<string[]>(row.gallery, []),
    servicesOffered: parseJson<string[]>(row.servicesOffered, []),
    requiresQuote: row.requiresQuote,
    eligibilityNotice: row.eligibilityNotice ?? undefined,
    active: row.active,
  };
}

export function toEventInquiry(row: PrismaEventInquiry): EventInquiry {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    eventType: row.eventType,
    eventDate: row.eventDate,
    eventLocation: row.eventLocation,
    guestCount: row.guestCount,
    serviceRequested: row.serviceRequested,
    budgetRange: row.budgetRange,
    additionalInfo: row.additionalInfo ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

export function toOrderItem(row: PrismaOrderItem): OrderItem {
  return {
    productId: row.productId,
    name: row.name,
    image: row.image,
    price: row.price,
    quantity: row.quantity,
    giftOptions: row.giftOptions ? parseJson(row.giftOptions, undefined) : undefined,
  };
}

export function toShipmentGroup(row: PrismaShipmentGroup): ShipmentGroup {
  return {
    id: row.id,
    recipient: row.recipient ? parseJson(row.recipient, undefined) : undefined,
    itemIndexes: parseJson<number[]>(row.itemIndexes, []),
    shippingCost: row.shippingCost,
    status: row.status as OrderStatus,
  };
}

export function toOrder(row: PrismaOrder & { items: PrismaOrderItem[]; shipmentGroups: PrismaShipmentGroup[] }): Order {
  return {
    id: row.id,
    customerId: row.customerId,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    items: row.items.map(toOrderItem),
    subtotal: row.subtotal,
    shipping: row.shipping,
    discount: row.discount,
    tax: row.tax,
    total: row.total,
    status: row.status as OrderStatus,
    paymentStatus: row.paymentStatus as PaymentStatus,
    paymentMethod: row.paymentMethod,
    shippingAddress: parseJson(row.shippingAddress, {
      fullName: "",
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
    }),
    deliveryMethod: row.deliveryMethod,
    createdAt: row.createdAt.toISOString(),
    statusHistory: parseJson(row.statusHistory, []),
    shipmentGroups: row.shipmentGroups.map(toShipmentGroup),
  };
}

export function toAuthUser(row: PrismaUser): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role as "customer" | "admin",
  };
}

export function toCartItem(row: PrismaCartItem): CartItem {
  return {
    id: row.id,
    productId: row.productId,
    quantity: row.quantity,
    giftOptions: row.giftOptions ? parseJson(row.giftOptions, undefined) : undefined,
  };
}

export function toWishlistProductId(row: PrismaWishlistItem): string {
  return row.productId;
}

export function toStoreSettings(row: PrismaStoreSettings): StoreSettings {
  return {
    sendAsGiftEnabled: row.sendAsGiftEnabled,
    giftWrappingEnabled: row.giftWrappingEnabled,
    giftCardsEnabled: row.giftCardsEnabled,
    maxGiftMessageLength: row.maxGiftMessageLength,
    eligibleCategories: parseJson<CategorySlug[]>(row.eligibleCategories, []),
    scheduledDeliveryEnabled: row.scheduledDeliveryEnabled,
    hidePricesOnSurpriseGifts: row.hidePricesOnSurpriseGifts,
  };
}
