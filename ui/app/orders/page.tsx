import React from "react";
import Heading from "../shared/Heading";
import { OrderTabs } from "./OrderTabs";
import { cookies } from "next/headers";
import { getOrders } from "@/services/orders";
import { checkAuth } from "@/services/auth/checkAuth";
import { redirect } from "next/navigation";

// order status = placed, shipped, out for delivery, delivered

export default async function page() {
  const user = await checkAuth();

  if (!user) {
    return redirect("/?login=true&redirect=/orders");
  }

  const cookieValue = cookies().get("accessToken");

  const res = await getOrders(cookieValue?.value!);

  const receivedOrders = res.data.filter(
    (order) => order.orderStatus === "received"
  );
  const confirmedOrders = res.data.filter(
    (order) => order.orderStatus === "confirmed"
  );
  const outForDeliveryOrders = res.data.filter(
    (order) => order.orderStatus === "out_for_deliver"
  );
  const deliveredOrders = res.data.filter(
    (order) => order.orderStatus === "delivered"
  );

  return (
    <div className="p-4 max-w-[1100px] mx-auto min-h-screen">
      <div className="max-w-full mt-44 md:mt-20">
        <Heading children={`Your Orders`} />
        <article className="p-2 border border-gray-300 border-opacity-45 rounded-md">
          <OrderTabs
            receivedOrders={receivedOrders}
            confirmedOrders={confirmedOrders}
            outForDeliveryOrders={outForDeliveryOrders}
            deliveredOrders={deliveredOrders}
          />
        </article>
      </div>
    </div>
  );
}
