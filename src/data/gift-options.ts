import { GiftCard, GiftWrapping } from "@/types";

// Local mock gift-configuration catalog. Mirrors data/categories.ts — the
// admin overlay in services/gift-options.ts layers create/update/delete on
// top of these arrays, the same way services/products.ts does for the
// product catalog.

export const giftWrappings: GiftWrapping[] = [
  {
    id: "gw001",
    name: "Christmas Red",
    image: "https://picsum.photos/seed/gift-wrap-christmas-red/600/600",
    previewImage: "https://picsum.photos/seed/gift-wrap-christmas-red-preview/300/300",
    price: 4.99,
    occasion: "christmas",
    active: true,
  },
  {
    id: "gw002",
    name: "Christmas Green",
    image: "https://picsum.photos/seed/gift-wrap-christmas-green/600/600",
    previewImage: "https://picsum.photos/seed/gift-wrap-christmas-green-preview/300/300",
    price: 4.99,
    occasion: "christmas",
    active: true,
  },
  {
    id: "gw003",
    name: "Birthday Celebration",
    image: "https://picsum.photos/seed/gift-wrap-birthday/600/600",
    previewImage: "https://picsum.photos/seed/gift-wrap-birthday-preview/300/300",
    price: 3.99,
    occasion: "birthday",
    active: true,
  },
  {
    id: "gw004",
    name: "Premium Gold",
    image: "https://picsum.photos/seed/gift-wrap-gold/600/600",
    previewImage: "https://picsum.photos/seed/gift-wrap-gold-preview/300/300",
    price: 6.99,
    active: true,
  },
  {
    id: "gw005",
    name: "Elegant White",
    image: "https://picsum.photos/seed/gift-wrap-white/600/600",
    previewImage: "https://picsum.photos/seed/gift-wrap-white-preview/300/300",
    price: 5.49,
    active: true,
  },
  {
    id: "gw006",
    name: "Children's Party",
    image: "https://picsum.photos/seed/gift-wrap-party/600/600",
    previewImage: "https://picsum.photos/seed/gift-wrap-party-preview/300/300",
    price: 3.49,
    occasion: "birthday",
    active: true,
  },
];

export const giftCards: GiftCard[] = [
  {
    id: "gc001",
    name: "Happy Birthday",
    image: "https://picsum.photos/seed/gift-card-birthday/600/400",
    previewImage: "https://picsum.photos/seed/gift-card-birthday-preview/300/200",
    price: 2.99,
    occasion: "birthday",
    active: true,
  },
  {
    id: "gc002",
    name: "Merry Christmas",
    image: "https://picsum.photos/seed/gift-card-christmas/600/400",
    previewImage: "https://picsum.photos/seed/gift-card-christmas-preview/300/200",
    price: 2.99,
    occasion: "christmas",
    active: true,
  },
  {
    id: "gc003",
    name: "Congratulations",
    image: "https://picsum.photos/seed/gift-card-congrats/600/400",
    previewImage: "https://picsum.photos/seed/gift-card-congrats-preview/300/200",
    price: 2.99,
    occasion: "graduation",
    active: true,
  },
  {
    id: "gc004",
    name: "Thank You",
    image: "https://picsum.photos/seed/gift-card-thanks/600/400",
    previewImage: "https://picsum.photos/seed/gift-card-thanks-preview/300/200",
    price: 2.49,
    active: true,
  },
  {
    id: "gc005",
    name: "Happy Anniversary",
    image: "https://picsum.photos/seed/gift-card-anniversary/600/400",
    previewImage: "https://picsum.photos/seed/gift-card-anniversary-preview/300/200",
    price: 2.99,
    active: true,
  },
  {
    id: "gc006",
    name: "Best Wishes",
    image: "https://picsum.photos/seed/gift-card-wishes/600/400",
    previewImage: "https://picsum.photos/seed/gift-card-wishes-preview/300/200",
    price: 2.49,
    active: true,
  },
];
