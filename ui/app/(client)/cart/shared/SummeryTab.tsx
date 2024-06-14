"use client";

import { Button, Input } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { useGlobalStoreContext } from "../../Providers/GlobalStoreProvider";

export default function SummeryTab({}: {}) {
  const {
    totalAmount: total,
    items,
    user,
    setOpenAuthModal,
    openAuthModal,
  } = useGlobalStoreContext();
  return (
    <div className="flex-[0.55]">
      <div className="w-full mb-3">
        <h2 className="font-medium mons text-xl">Price Summery</h2>
      </div>
      <hr
        className="
        border-1
        border-blue-gray-100
        w-full
        mb-3
      "
      />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="mons font-semibold text-lg text-black">SubTotal:</h3>
          <div className="bg-gray-50 rounded-md shadow-md py-2 px-5">
            {total ? `Rs. ${total}` : "N/A"}
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="mons font-semibold text-lg text-black">Shipping:</h3>
          <div className="bg-green-400 rounded-md shadow-md py-2 px-5 text-gray-100">
            Free
          </div>
        </div>
        <hr
          className="
        border-1
        border-blue-gray-100
        w-full
        mb-3
      "
        />

        <div className="flex items-center justify-between">
          <h3 className="mons font-semibold text-lg text-black">
            Grand Total:
          </h3>
          <div className="bg-gray-50 rounded-md shadow-md py-2 px-5">
            {total ? `Rs. ${total}` : "N/A"}
          </div>
        </div>

        <div className="flex items-center justify-end">
          {user ? (
            <Link href={"/checkout"}>
              <Button
                placeholder={""}
                className="mt-10"
                variant="gradient"
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Link>
          ) : (
            <Button
              placeholder={""}
              className="mt-10"
              variant="gradient"
              onClick={() => setOpenAuthModal(!openAuthModal)}
            >
              Login To Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
