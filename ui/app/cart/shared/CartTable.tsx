"use client";

import React from "react";
import QuantityBox from "./QuantityBox";
import ActionBox from "./ActionBox";
import { CartItem, Profile } from "@/types";

export default function CartTable({
  user,
  items,
  handleRemove,
}: {
  user: Profile | null;
  items: CartItem[];
  handleRemove: (id: string) => void;
}) {
  return (
    <div className="flex-1 p-2 bg-gray-50 shadow-md rounded-md h-full w-full overflow-y-hidden md:overflow-y-scroll mt-10 md:mt-0">
      <div className="hidden pb-2 w-full md:flex items-center gap-3 justify-between">
        <div className="w-full flex-1">Product</div>
        <div className="w-full flex-[0.5]">Price</div>
        <div className="w-full flex-[0.5]">Quantity</div>
        <div className="w-full flex-[0.5]">Actions</div>
      </div>
      <hr className="hidden md:block w-full border-1 border-gray-500 mb-2" />

      {items.length === 0 && (
        <div className="flex items-center justify-center h-full w-full">
          <span className="text-2xl">No items in cart</span>
        </div>
      )}

      {items.map((item, index) => (
        <div
          className="overflow-x-scroll md:overflow-x-hidden pb-2 md:pb-0"
          key={index}
        >
          <div className="flex items-center w-full justify-between gap-3 mb-3">
            <div className="w-full flex-[0] md:flex-1">
              <div className="hidden md:block">
                <img
                  src={item.images[0].url || "https://via.placeholder.com/150"}
                  alt="product"
                  className="w-24 h-24 md:w-28 md:h-28 object-cover self-center mb-2"
                />
                <span className="hidden md:block">{item.name}</span>

                {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
              </div>
            </div>
            <div className="w-full -ml-2 md:ml-0 md:flex-[0.5]">
              <span className="text-lg font-bold md:font-normal mons">
                {item.price ? `Rs. ${item.price}` : "N/A"}
              </span>
            </div>
            <div className="w-full flex-[0.6]">
              <QuantityBox item={item} user={user} />
            </div>
            <div className="w-full flex-[0.5]">
              <ActionBox item={item} handleRemove={handleRemove} />
            </div>
          </div>
          <div className="block md:hidden">
            <img
              src={item.images[0].url || "https://via.placeholder.com/150"}
              alt="product"
              className="w-28 h-28 object-cover self-center mb-2"
            />
            <span className="hidden md:block">{item.name}</span>

            {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
          </div>
          <span className="block text-base font-bold md:font-normal md:text-lg md:hidden">
            {item.name}
          </span>
        </div>
      ))}

      {/* <hr className="w-full border-1 border-gray-500 mb-5 md:mb-2 mt-3 md:mt-0" /> */}
    </div>
  );
}
