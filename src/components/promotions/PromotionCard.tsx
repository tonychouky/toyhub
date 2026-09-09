import Link from "next/link";
import { Tag, Percent, DollarSign, Truck, Gift, Package } from "lucide-react";
import { Promotion } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { getOccasionById } from "@/services/occasions";

const TYPE_ICON: Record<Promotion["type"], typeof Percent> = {
  percentage: Percent,
  fixed: DollarSign,
  buy_x_get_y: Package,
  free_shipping: Truck,
  free_gift_wrapping: Gift,
};

async function promotionLink(promo: Promotion): Promise<string> {
  if (promo.occasionIds?.length) {
    const occasion = await getOccasionById(promo.occasionIds[0]);
    if (occasion) return `/occasions/${occasion.slug}`;
  }
  if (promo.categoryIds?.length) return `/shop?category=${promo.categoryIds[0]}`;
  return "/shop";
}

export async function PromotionCard({ promotion, badge }: { promotion: Promotion; badge?: string }) {
  const Icon = TYPE_ICON[promotion.type];
  const href = await promotionLink(promotion);

  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-3xl border border-gray-100 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" />
        </span>
        {badge && <Badge variant="sale">{badge}</Badge>}
      </div>
      <div>
        <h3 className="font-display text-base font-bold text-gray-900">{promotion.name}</h3>
        {promotion.description && <p className="mt-1 text-sm text-gray-500">{promotion.description}</p>}
      </div>
      {promotion.couponCode && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
          <Tag className="h-3 w-3" /> {promotion.couponCode}
        </span>
      )}
    </Link>
  );
}
