import React from "react";
import CartTable from "./shared/CartTable";
import Heading from "../shared/Heading";
import SummeryTab from "./shared/SummeryTab";
import { checkAuth } from "@/services/auth/checkAuth";

export default async function page() {
  const authStatus = await checkAuth();
  return (
    <div className="p-4">
      <div className="max-w-full md:max-w-screen-xl mx-auto mb-10 mt-20">
        <Heading children={`Your Cart`} />
        <aside className="flex flex-col md:flex-row gap-6 h-full md:h-[450px]">
          <CartTable />
          <SummeryTab />
        </aside>
      </div>
    </div>
  );
}
