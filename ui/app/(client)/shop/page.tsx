import React from "react";
import FilterSideBar from "./components/FilterSideBar";
import ProductView from "./components/ProductView";

export default function page() {
  return (
    <main className="w-full mons">
      <div className="p-4">
        <div className="w-full flex flex-col md:flex-row gap-4">
          <FilterSideBar />
          <ProductView />
        </div>
      </div>
    </main>
  );
}
