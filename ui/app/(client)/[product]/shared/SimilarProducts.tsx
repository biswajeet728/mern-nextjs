import React from "react";
import Heading from "../../shared/Heading";
import ProductCard from "../../shared/ProductCard";

export default function SimilarProducts() {
  return (
    <div className="w-full">
      <Heading children="Similar Products" />

      <div className="grid grid-col-1 md:grid-cols-4 gap-5">
        <ProductCard fromBrowse />
        <ProductCard fromBrowse />
        <ProductCard fromBrowse />
        <ProductCard fromBrowse />
      </div>
    </div>
  );
}
