import { Review } from "@/types";

// Deterministic mock reviews per product (no backend yet). Swap for a real
// reviews API/table later — see services/products.ts for the same pattern.
const SAMPLE_AUTHORS = [
  "Jordan M.", "Priya K.", "Sam T.", "Alex R.", "Morgan L.", "Casey B.",
  "Riley S.", "Taylor W.", "Jamie F.", "Drew H.",
];

const SAMPLE_TITLES = [
  "My kid loves this!", "Great value for the price", "Exceeded expectations",
  "Good but not perfect", "Perfect gift idea", "Well made and durable",
  "Kept them entertained for hours", "Would buy again",
];

const SAMPLE_COMMENTS = [
  "This has been on repeat in our house since it arrived. Well worth it.",
  "Solid build quality and my child figured it out quickly without help.",
  "A bit smaller than I expected from photos, but the quality makes up for it.",
  "Bought this as a birthday gift and it was a huge hit at the party.",
  "Packaging was great and it arrived in perfect condition. Highly recommend.",
  "Took a star off only because the instructions could be clearer.",
  "This kept my kids entertained on a long road trip. Great purchase.",
  "Sturdy, colorful, and exactly as described. Will be buying more from ToyHub.",
];

export function getReviewsForProduct(productId: string, count: number, avgRating: number): Review[] {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const seed = hashCode(productId + i);
    const ratingJitter = ((seed % 3) - 1) * 0.5;
    const rating = Math.max(1, Math.min(5, Math.round(avgRating + ratingJitter)));
    const daysAgo = (seed % 180) + 1;
    reviews.push({
      id: `${productId}_rev${i}`,
      productId,
      author: SAMPLE_AUTHORS[seed % SAMPLE_AUTHORS.length],
      rating,
      title: SAMPLE_TITLES[seed % SAMPLE_TITLES.length],
      comment: SAMPLE_COMMENTS[seed % SAMPLE_COMMENTS.length],
      date: new Date(Date.now() - daysAgo * 86400000).toISOString(),
      verifiedPurchase: seed % 4 !== 0,
      helpfulCount: seed % 40,
    });
  }
  return reviews;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
