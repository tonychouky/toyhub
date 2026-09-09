"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/services/products";
import { Product } from "@/types";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    getProductById(params.id).then(setProduct);
  }, [params.id]);

  if (product === undefined) {
    return <p className="text-sm text-gray-500">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-gray-500">Product not found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl">Edit Product</h1>
        <p className="mt-1 text-sm text-gray-500">{product.name}</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
