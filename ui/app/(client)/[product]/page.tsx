import React from "react";
import BackView from "./shared/BackView";
import SingleProduct from "./shared/SingleProduct";
import SimilarProducts from "./shared/SimilarProducts";

export default function page() {
  return (
    <div className="p-4">
      <div className="max-w-screen-xl mx-auto mt-1">
        <div className="mb-4">
          <BackView />
        </div>

        <div className="w-full">
          <SingleProduct />
        </div>

        <div className="mt-4">
          <SimilarProducts />
        </div>
      </div>
    </div>
  );
}
