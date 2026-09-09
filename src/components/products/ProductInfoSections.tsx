import { Product } from "@/types";
import { getReviewsForProduct } from "@/services/reviews";
import { Rating } from "@/components/ui/Rating";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, ShieldAlert, Package } from "lucide-react";

export async function ProductInfoSections({ product }: { product: Product }) {
  const reviews = await getReviewsForProduct(product.id, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section title="Description">
            <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
          </Section>

          <Section title="Features">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Specifications">
            <dl className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <div key={key} className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <dt className="font-semibold text-gray-700">{key}</dt>
                  <dd className="text-gray-500">{value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {product.whatsIncluded && (
            <Section title="What's Included">
              <ul className="space-y-2">
                {product.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="h-4 w-4 shrink-0 text-ocean-500" /> {item}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {product.safetyInformation && (
            <Section title="Safety Information">
              <div className="flex gap-3 rounded-2xl bg-sunny-50 p-4">
                <ShieldAlert className="h-5 w-5 shrink-0 text-sunny-600" />
                <p className="text-sm text-gray-700">{product.safetyInformation}</p>
              </div>
            </Section>
          )}
        </div>

        <div>
          <Section title="Customer Reviews">
            <div className="mb-5 flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
              <span className="font-display text-3xl font-extrabold text-gray-900">{product.rating.toFixed(1)}</span>
              <div>
                <Rating value={product.rating} size="md" />
                <p className="mt-1 text-xs text-gray-500">Based on {product.reviewCount} reviews</p>
              </div>
            </div>
            <div className="flex flex-col divide-y divide-gray-100">
              {reviews.map((review) => (
                <div key={review.id} className="py-4 first:pt-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">{review.author}</p>
                    <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
                  </div>
                  <Rating value={review.rating} className="mt-1" />
                  <p className="mt-2 text-sm font-semibold text-gray-800">{review.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{review.comment}</p>
                  {review.verifiedPurchase && (
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-leaf-600">
                      <CheckCircle2 className="h-3 w-3" /> Verified Purchase
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 last:mb-0">
      <h2 className="mb-4 font-display text-lg font-bold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}
