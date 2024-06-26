import { ResponseOrder } from "@/types";
import moment from "moment";
import React from "react";

function OutForDelivery({
  outForDeliveryOrders,
}: {
  outForDeliveryOrders: ResponseOrder[];
}) {
  return (
    <div className="h-[420px] !overflow-y-scroll scrollbar-none">
      {outForDeliveryOrders.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <span className="text-xs md:text-sm font-semibold text-gray-500">
            No orders received yet!
          </span>
        </div>
      )}

      {outForDeliveryOrders.map((item, index) => (
        <div
          className="border border-gray-300 border-opacity-50 mb-4 py-3 px-2 rounded-md"
          key={index}
        >
          <div className="flex justify-between">
            <div>
              <div className="flex items-start gap-2">
                <span className="text-xs md:text-sm">Order ID:</span>
                <span className="text-xs md:text-sm font-semibold">
                  {item._id}
                </span>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <span className="text-xs md:text-sm">Order Date:</span>
                <span className="text-xs md:text-sm font-semibold">
                  {moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}
                </span>
              </div>
            </div>
            <div className="border border-yellow-500 rounded-md py-2 px-3">
              <span className="text-xs md:text-sm font-semibold text-yellow-600">
                #Out-For-Delivery
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-2">
            <img
              src={
                item.orderItems[0].images[0].url ||
                "https://placehold.co/600x400"
              }
              alt="product"
              className="w-24 h-24 object-cover"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">Product Name:</span>
                <span className="text-xs md:text-sm font-semibold">
                  {item.orderItems[0].name || "Name"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">Quantity:</span>
                <span className="text-xs md:text-sm font-semibold">
                  {item.orderItems[0].quantity || 1}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">Total Price:</span>
                <span className="text-xs md:text-sm font-semibold">
                  Rs.{" "}
                  {item.discountTotal
                    ? item.discountTotal
                    : item.finalTotal || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OutForDelivery;
