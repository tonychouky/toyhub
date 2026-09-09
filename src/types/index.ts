// Core domain types for ToyHub.
// These types define the contract between the UI and the data layer.
// When a real backend is introduced, these interfaces should stay stable
// so components do not need to change — only the `services/*` implementations do.

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number; // percentage, derived or explicit
  images: string[];
  rating: number; // 0-5
  reviewCount: number;
  ageRange: AgeRange;
  stock: number;
  sku: string;
  barcode?: string;
  features: string[];
  specifications: Record<string, string>;
  safetyInformation?: string;
  whatsIncluded?: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  createdAt: string; // ISO date, used for "Newest" sort
  soldCount?: number; // used for "Best Selling" sort
  isGiftable?: boolean; // undefined/true = eligible for "Send as a Gift"; false opts a product out
}

export type AgeRange = "0-2" | "3-5" | "6-8" | "9-12" | "13+";

export type CategorySlug =
  | "building-construction"
  | "cars-vehicles"
  | "dolls-figures"
  | "educational"
  | "outdoor"
  | "games-puzzles"
  | "arts-crafts"
  | "stem-science"
  | "baby-toddler";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface GiftWrapping {
  id: string;
  name: string;
  image: string;
  previewImage?: string;
  price: number;
  occasion?: string;
  active: boolean;
}

export interface GiftCard {
  id: string;
  name: string;
  image: string;
  previewImage?: string;
  price: number;
  occasion?: string;
  active: boolean;
}

export interface Recipient {
  fullName: string;
  phone: string;
  email?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    area?: string;
    postalCode?: string;
    country: string;
  };
}

export interface GiftOptions {
  wrapped: boolean;
  wrappingId?: string;
  cardId?: string;
  message?: string;
  /** True when this line ships directly to `recipient` instead of the buyer's own checkout address. */
  sendAsGift?: boolean;
  recipient?: Recipient;
  /** Hides pricing from the recipient-facing gift receipt when true. */
  isSurprise?: boolean;
  /** A request, not a guarantee — always labelled as such wherever shown. */
  preferredDeliveryDate?: string;
  /** Only shown on the gift receipt when the buyer opts in; irrelevant if isSurprise is false. */
  revealSenderName?: boolean;
}

export interface ShipmentGroup {
  id: string;
  /** undefined = ships to the buyer's own checkout address. */
  recipient?: Recipient;
  itemIndexes: number[];
  shippingCost: number;
  status: OrderStatus;
}

export interface StoreSettings {
  sendAsGiftEnabled: boolean;
  giftWrappingEnabled: boolean;
  giftCardsEnabled: boolean;
  maxGiftMessageLength: number;
  eligibleCategories: CategorySlug[]; // empty = all categories eligible
  scheduledDeliveryEnabled: boolean;
  hidePricesOnSurpriseGifts: boolean;
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  giftIdeasNote?: string;
  productIds: string[];
  categoryIds?: CategorySlug[];
  promotionIds?: string[];
  active: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export type PromotionType =
  | "percentage"
  | "fixed"
  | "buy_x_get_y"
  | "free_shipping"
  | "free_gift_wrapping";

export interface Promotion {
  id: string;
  name: string;
  description?: string;
  type: PromotionType;
  value?: number;
  couponCode?: string;
  startDate: string;
  endDate: string;
  minimumOrderValue?: number;
  productIds?: string[];
  categoryIds?: string[];
  occasionIds?: string[];
  usageLimit?: number;
  active: boolean;
  bannerImage?: string;
}

export type PromotionStatus = "active" | "scheduled" | "expired";

export type EventCategorySlug =
  | "birthday"
  | "weddings"
  | "corporate"
  | "school"
  | "holiday"
  | "new-year"
  | "special-occasions"
  | "fireworks-effects";

export interface EventService {
  id: string;
  slug: EventCategorySlug;
  name: string;
  description: string;
  image: string;
  gallery: string[];
  servicesOffered: string[];
  requiresQuote: boolean;
  eligibilityNotice?: string;
  active: boolean;
}

export interface EventInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  serviceRequested: string;
  budgetRange: string;
  additionalInfo?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  giftOptions?: GiftOptions;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface Address {
  id?: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  giftOptions?: GiftOptions;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  deliveryMethod: string;
  createdAt: string;
  statusHistory: { status: OrderStatus; date: string }[];
  shipmentGroups: ShipmentGroup[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export type SortOption =
  | "relevance"
  | "best-selling"
  | "newest"
  | "price-low-high"
  | "price-high-low"
  | "rating";

export interface ProductFilters {
  categories?: CategorySlug[];
  brands?: string[];
  ageRanges?: AgeRange[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  query?: string;
  sort?: SortOption;
}
