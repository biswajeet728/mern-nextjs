import React from "react";
import AddressBox from "./components/AddressBox";
import ProceedPayment from "./components/ProceedPayment";
import Heading from "../shared/Heading";
import { fetchAddress } from "@/services/profile";

export default async function page() {
  const addressList = await fetchAddress();
  return (
    <div className="p-4">
      <div className="max-w-full md:max-w-screen-xl mx-auto mb-10 mt-20">
        <Heading children="Shipping Address" />
        <aside className="flex flex-col md:flex-row gap-6 h-full">
          <AddressBox addressList={addressList} />
          <ProceedPayment />
        </aside>
      </div>
    </div>
  );
}
