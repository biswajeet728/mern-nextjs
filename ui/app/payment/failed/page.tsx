import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  params: any;
  searchParams: { [key: string]: string };
}

export default function PaymentFailurePage({ params, searchParams }: Props) {
  const orderId = searchParams.orderId;

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <ExclamationCircleIcon className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Payment Failed</h1>
        <p className="text-gray-600 text-center mb-4">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        {orderId && (
          <p className="text-gray-800 text-center font-mono text-lg bg-gray-200 p-2 rounded">
            Order ID: {orderId}
          </p>
        )}
        <div className="mt-6 text-center">
          <a
            href="/shop"
            className="inline-block bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Place Order Again
          </a>
        </div>
      </div>
    </div>
  );
}
