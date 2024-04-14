import React from "react";
import Heading from "../shared/Heading";
import ProductCard from "../shared/ProductCard";

function BestSelling() {
  return (
    <div className="px-4 pb-4">
      <Heading children="Best Selling" />

      <div className="flex flex-col md:flex-row gap-5 md:gap-2 flex-wrap">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default BestSelling;
