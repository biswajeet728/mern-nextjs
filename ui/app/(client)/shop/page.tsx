import React from "react";
import FilterSideBar from "./components/FilterSideBar";
import ProductView from "./components/ProductView";
import { getAllProducts } from "@/services/products";

export default async function page({
  searchParams,
}: {
  searchParams: {
    cat: string;
    page: number;
    isBestSelling: boolean | string;
    isFeatured: boolean | string;
    // price: string;
    q: string;
  };
}) {
  const products = await getAllProducts({
    category: searchParams.cat,
    isBestSelling: searchParams.isBestSelling,
    isFeatured: searchParams.isFeatured,
    // price: searchParams.price,
    page: searchParams.page || 1,
    q: searchParams.q,
  });
  return (
    <main className="w-full mons">
      <div className="p-4">
        <div className="w-full flex flex-col md:flex-row gap-2 mt-20">
          <FilterSideBar />
          <ProductView products={products.products} limit={products.limit} />
        </div>
      </div>
    </main>
  );
}
