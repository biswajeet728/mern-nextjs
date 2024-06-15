import React from "react";
import { LuCheckCircle } from "react-icons/lu";

function Delivered() {
  return (
    <div className="h-[420px] !overflow-y-scroll scrollbar-none">
      {[1, 2].map((item) => (
        <div className="border border-gray-300 border-opacity-50 mb-4 py-3 px-2 rounded-md">
          <div className="flex justify-between">
            <div>
              <div className="flex items-start gap-2">
                <span className="text-xs md:text-sm">Order ID:</span>
                <span className="text-xs md:text-sm font-semibold">
                  123456789
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs md:text-sm">Order Date:</span>
                <span className="text-xs md:text-sm font-semibold">
                  12/12/2021
                </span>
              </div>
            </div>
            <div className="border border-yellow-500 rounded-md py-2 px-3 flex items-center gap-2">
              <LuCheckCircle className="w-4 h-4 text-yellow-300" />
              <span className="text-xs md:text-sm font-medium tracking-wide text-yellow-300">
                Delivered
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-2">
            <img
              src="https://via.placeholder.com/150"
              alt="product"
              className="w-24 h-24 object-cover"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">Product Name:</span>
                <span className="text-xs md:text-sm font-semibold">
                  Product Name
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">Quantity:</span>
                <span className="text-xs md:text-sm font-semibold">1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">Total Price:</span>
                <span className="text-xs md:text-sm font-semibold">
                  Rs.40000
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Delivered;
