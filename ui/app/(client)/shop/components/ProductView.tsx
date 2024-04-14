import React from "react";
import SearchInput from "../shared/SearchInput";
import Image from "next/image";
import ProductCard from "../../shared/ProductCard";

export default function ProductView() {
  return (
    <div className="flex-1 h-full p-2 bg-white border border-blue-gray-100">
      <div>
        <SearchInput />
      </div>
      <div className="my-3 p-3 bg-blue-gray-50">
        <div className="hidden md:block relative h-[300px]">
          <Image
            src={"/images/shop-banner.png"}
            alt="banner"
            width={1920}
            height={0}
            className="rounded-md w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-md"></div>

          <div className="absolute top-1/3 left-5">
            <h3 className="text-white text-center font-medium text-xl mons">
              Streamlined Selections, Seamless Shopping!
            </h3>
            <h4 className="text-white text-base text-center font-medium">
              Filter. Choose. Buy. Elevate Your Shopping Experience.
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-0 md:mt-5 w-fit">
          <ProductCard fromBrowse />
          <ProductCard fromBrowse />
          <ProductCard fromBrowse />
          <ProductCard fromBrowse />
          <ProductCard fromBrowse />
          <ProductCard fromBrowse />
        </div>
      </div>
    </div>
  );
}
