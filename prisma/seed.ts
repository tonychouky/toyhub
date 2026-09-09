import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { categories } from "../src/data/categories";
import { products } from "../src/data/products";
import { getReviewsForProduct } from "../src/data/reviews";
import { giftWrappings, giftCards } from "../src/data/gift-options";
import { occasions } from "../src/data/occasions";
import { promotions } from "../src/data/promotions";
import { eventServices } from "../src/data/events";
import { customers } from "../src/data/customers";
import { seedOrders } from "../src/data/orders";

// One-time seed: populates SQL Server from the mock data/*.ts arrays that
// used to be read directly by services/* at runtime. Idempotent (upsert by
// id/unique key) so it's safe to re-run against an already-seeded database.

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories...");
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description, image: c.image },
      create: { slug: c.slug, name: c.name, description: c.description, image: c.image },
    });
  }

  console.log(`Seeding ${products.length} products...`);
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        brand: p.brand,
        categorySlug: p.category,
        slug: p.slug,
        description: p.description,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: p.discount,
        images: JSON.stringify(p.images),
        rating: p.rating,
        reviewCount: p.reviewCount,
        ageRange: p.ageRange,
        stock: p.stock,
        sku: p.sku,
        barcode: p.barcode,
        features: JSON.stringify(p.features),
        specifications: JSON.stringify(p.specifications),
        safetyInformation: p.safetyInformation,
        whatsIncluded: p.whatsIncluded ? JSON.stringify(p.whatsIncluded) : null,
        isBestSeller: !!p.isBestSeller,
        isNew: !!p.isNew,
        isGiftable: p.isGiftable ?? true,
        createdAt: new Date(p.createdAt),
        soldCount: p.soldCount,
      },
    });
  }

  console.log("Seeding reviews...");
  for (const p of products) {
    const reviews = getReviewsForProduct(p.id, p.reviewCount, p.rating);
    for (const r of reviews) {
      await prisma.review.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          productId: p.id,
          author: r.author,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          date: r.date,
          verifiedPurchase: r.verifiedPurchase,
          helpfulCount: r.helpfulCount,
        },
      });
    }
  }

  console.log("Seeding gift wrappings & cards...");
  for (const w of giftWrappings) {
    await prisma.giftWrapping.upsert({ where: { id: w.id }, update: {}, create: w });
  }
  for (const c of giftCards) {
    await prisma.giftCard.upsert({ where: { id: c.id }, update: {}, create: c });
  }

  console.log("Seeding occasions...");
  for (const o of occasions) {
    await prisma.occasion.upsert({
      where: { id: o.id },
      update: {},
      create: {
        id: o.id,
        name: o.name,
        slug: o.slug,
        description: o.description,
        bannerImage: o.bannerImage,
        giftIdeasNote: o.giftIdeasNote,
        active: o.active,
        startDate: o.startDate ? new Date(o.startDate) : null,
        endDate: o.endDate ? new Date(o.endDate) : null,
        createdAt: new Date(o.createdAt),
        products: { connect: o.productIds.map((id) => ({ id })) },
      },
    });
  }

  console.log("Seeding promotions...");
  for (const promo of promotions) {
    await prisma.promotion.upsert({
      where: { id: promo.id },
      update: {},
      create: {
        id: promo.id,
        name: promo.name,
        description: promo.description,
        type: promo.type,
        value: promo.value,
        couponCode: promo.couponCode,
        startDate: new Date(promo.startDate),
        endDate: new Date(promo.endDate),
        minimumOrderValue: promo.minimumOrderValue,
        usageLimit: promo.usageLimit,
        active: promo.active,
        bannerImage: promo.bannerImage,
        products: promo.productIds ? { connect: promo.productIds.map((id) => ({ id })) } : undefined,
        categories: promo.categoryIds ? { connect: promo.categoryIds.map((slug) => ({ slug })) } : undefined,
        occasions: promo.occasionIds ? { connect: promo.occasionIds.map((id) => ({ id })) } : undefined,
      },
    });
  }

  console.log("Seeding event services...");
  for (const e of eventServices) {
    await prisma.eventService.upsert({
      where: { id: e.id },
      update: {},
      create: {
        id: e.id,
        slug: e.slug,
        name: e.name,
        description: e.description,
        image: e.image,
        gallery: JSON.stringify(e.gallery),
        servicesOffered: JSON.stringify(e.servicesOffered),
        requiresQuote: e.requiresQuote,
        eligibilityNotice: e.eligibilityNotice,
        active: e.active,
      },
    });
  }

  console.log("Seeding store settings...");
  await prisma.storeSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      sendAsGiftEnabled: true,
      giftWrappingEnabled: true,
      giftCardsEnabled: true,
      maxGiftMessageLength: 300,
      eligibleCategories: JSON.stringify([]),
      scheduledDeliveryEnabled: true,
      hidePricesOnSurpriseGifts: true,
    },
  });

  console.log("Seeding users (admin + customer directory)...");
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@toyhub.com" },
    update: {},
    create: { id: "admin_1", name: "Admin", email: "admin@toyhub.com", passwordHash: adminPasswordHash, role: "admin" },
  });

  // Directory-only customers (never logged in via the mock system before this
  // migration either) get a random, unusable password hash.
  const placeholderHash = await bcrypt.hash(crypto.randomUUID(), 10);
  for (const c of customers) {
    await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        passwordHash: placeholderHash,
        role: "customer",
        createdAt: new Date(c.createdAt),
      },
    });
  }

  console.log(`Seeding ${seedOrders.length} demo orders...`);
  for (const order of seedOrders) {
    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: {
        id: order.id,
        customerId: order.customerId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        subtotal: order.subtotal,
        shipping: order.shipping,
        discount: order.discount,
        tax: order.tax,
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        shippingAddress: JSON.stringify(order.shippingAddress),
        deliveryMethod: order.deliveryMethod,
        createdAt: new Date(order.createdAt),
        statusHistory: JSON.stringify(order.statusHistory),
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            giftOptions: item.giftOptions ? JSON.stringify(item.giftOptions) : null,
          })),
        },
        shipmentGroups: {
          create: order.shipmentGroups.map((g) => ({
            id: g.id,
            recipient: g.recipient ? JSON.stringify(g.recipient) : null,
            itemIndexes: JSON.stringify(g.itemIndexes),
            shippingCost: g.shippingCost,
            status: g.status,
          })),
        },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
