import React from "react";
import Heading from "../shared/Heading";
import { OrderTabs } from "./OrderTabs";

// order status = placed, shipped, out for delivery, delivered

export default function page() {
  return (
    <div className="p-4 max-w-[1100px] mx-auto min-h-screen">
      <div className="max-w-full mt-44 md:mt-20">
        <Heading children={`Your Orders`} />
        <article className="p-2 border border-gray-300 border-opacity-45 rounded-md">
          <OrderTabs />
        </article>
      </div>
    </div>
  );
}
