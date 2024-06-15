import React from "react";
import Heading from "../shared/Heading";
import ProductCard from "../shared/ProductCard";
import { MainProduct } from "@/types";

function NewArrival({ products }: { products: MainProduct[] }) {
  return (
    <div className="px-4 pb-4">
      <Heading children="New Arrival" />

      <div className="flex flex-col md:flex-row gap-2 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default NewArrival;
