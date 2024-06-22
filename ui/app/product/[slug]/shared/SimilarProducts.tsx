"use client";

import Heading from "@/app/shared/Heading";
import ProductCard from "@/app/shared/ProductCard";
import { ResponseProduct } from "@/services/products";
import React from "react";

export default function SimilarProducts({
  products,
  currentProductId,
  currentProductCategory,
}: {
  products: ResponseProduct;
  currentProductId: string;
  currentProductCategory: string;
}) {
  const similarProducts = React.useMemo(
    () =>
      products?.products
        ?.filter((product) => product._id !== currentProductId)
        ?.filter((product) => product.category === currentProductCategory),
    [products]
  );

  return (
    <div className="w-full">
      <Heading children="Similar Products" />

      <div className="grid grid-col-1 md:grid-cols-4 gap-5">
        {similarProducts.length === 0 && (
          <div className="col-span-full px-4 py-1 bg-red-500 rounded-md w-fit">
            <p className="text-left text-lg text-white">
              No similar products found
            </p>
          </div>
        )}

        {similarProducts.map((product) => (
          <ProductCard key={product._id} product={product} fromBrowse />
        ))}
      </div>
    </div>
  );
}
