import React from "react";
import BackView from "./shared/BackView";
import SingleProduct from "./shared/SingleProduct";
import SimilarProducts from "./shared/SimilarProducts";
import { getAllProducts, getSingleProduct } from "@/services/products";

export default async function page({ params }: { params: { slug: string } }) {
  const product = await getSingleProduct(params.slug);
  const products = await getAllProducts();
  return (
    <div className="p-4">
      <div className="max-w-screen-xl mx-auto mt-20">
        <div className="mb-4">
          <BackView />
        </div>

        <div className="w-full">
          <SingleProduct product={product.product} />
        </div>

        <div className="mt-4">
          <SimilarProducts
            products={products}
            currentProductId={product?.product?._id}
            currentProductCategory={product?.product?.category}
          />
        </div>
      </div>
    </div>
  );
}
