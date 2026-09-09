import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, getBestSellers } from "@/services/products";
import { products } from "@/data/products";
import { AGE_RANGE_LABELS, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductActions } from "@/components/products/ProductActions";
import { ProductInfoSections } from "@/components/products/ProductInfoSections";
import { RecentlyViewed } from "@/components/products/RecentlyViewed";
import { SectionHeading } from "@/components/home/CategoryGrid";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { PackageCheck, PackageX } from "lucide-react";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ToyHub`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  const [related, alsoBought] = await Promise.all([
    getRelatedProducts(product, 4),
    getBestSellers(8),
  ]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-500">{product.brand}</p>
              <h1 className="mt-1 font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">{product.name}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Rating value={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-gray-300">|</span>
              <span className="text-xs font-semibold text-gray-500">SKU: {product.sku}</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg font-medium text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {!!product.discount && <Badge variant="sale">Save {product.discount}%</Badge>}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {product.stock > 0 ? (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-leaf-600">
                  <PackageCheck className="h-4 w-4" />
                  {product.stock <= 10 ? `Only ${product.stock} left in stock` : "In Stock"}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
                  <PackageX className="h-4 w-4" /> Out of Stock
                </span>
              )}
              <span className="text-gray-300">|</span>
              <span className="text-sm font-medium text-gray-500">Ages {AGE_RANGE_LABELS[product.ageRange]}</span>
            </div>

            <hr className="border-gray-100" />

            <ProductActions product={product} />

            <p className="text-xs text-gray-400">
              Barcode: {product.barcode} &middot; Free shipping on orders over $50 &middot; 30-day returns
            </p>
          </div>
        </div>
      </div>

      <ProductInfoSections product={product} />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="More like this" title="Related Products" />
          <div className="mt-8">
            <ProductCarousel products={related} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Frequently paired" title="Customers Also Bought" />
        <div className="mt-8">
          <ProductCarousel products={alsoBought} />
        </div>
      </section>

      <RecentlyViewed currentProductId={product.id} />
    </div>
  );
}
