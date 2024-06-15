import React from "react";
import Heading from "../shared/Heading";
import ProductCard from "../shared/ProductCard";
import { MainProduct } from "@/types";

async function BestSelling({ products }: { products: MainProduct[] }) {
  return (
    <div className="px-4 pb-4">
      <Heading children="Best Selling" />

      <div className="flex flex-col md:flex-row gap-5 md:gap-2 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BestSelling;
