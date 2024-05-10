import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SearchResults({ searchResults }: { searchResults: ProductType[] }) {
  return (
    <div className="!z-50 absolute top-10 left-0 bg-white w-full rounded-sm border border-gray-500 border-opacity-65 text-black p-2">
      {searchResults.map((product) => (
        <Link href={`/product/${product.slug}`} key={product._id}>
          <div className="flex gap-2 p-2 hover:bg-gray-100">
            <div className="w-20 h-14 relative bg-gray-200 rounded-md border border-gray-300 border-opacity-60">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="absolute inset-0 w-full h-full rounded-md object-fill"
              />
            </div>
            <div>
              <div className="text-sm font-semibold">{product.name}</div>
              <div className="text-xs text-gray-600 font-semibold">
                Rs.{product.price}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
