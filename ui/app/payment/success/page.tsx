import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  params: any;
  searchParams: { [key: string]: string };
}

export default function Page({ params, searchParams }: Props) {
  const orderId = searchParams.orderId;

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-12 md:mt-0 mx-3">
        <div className="flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-lg md:text-2xl font-bold text-center mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-sm md:text-basetext-gray-600 text-center mb-4">
          Thank you for your purchase. Your order ID is:
        </p>
        {orderId && (
          <p className="text-gray-800 text-center font-mono text-lg bg-gray-200 p-2 rounded">
            {orderId}
          </p>
        )}
        <div className="mt-6 text-center">
          <a
            href="/orders"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Go to Orders
          </a>
        </div>
      </div>
    </div>
  );
}
