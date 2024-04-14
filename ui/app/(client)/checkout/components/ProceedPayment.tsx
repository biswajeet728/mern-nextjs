"use client";

import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

export default function ProceedPayment() {
  return (
    <div className="flex-[0.99]">
      <div className="w-full mb-3">
        <h2 className="font-medium mons text-xl">Order Summery</h2>
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
            Rs.4000
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="mons font-semibold text-base text-black">
            TAX(In Toal):
          </h3>
          <div className="bg-gray-50 rounded-md shadow-md py-2 px-5">
            Rs.500
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
            Rs.4500
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button
            placeholder={""}
            color="green"
            className="mt-10"
            variant="gradient"
            disabled
          >
            Pay Using Razorpay
          </Button>
        </div>
      </div>
    </div>
  );
}
