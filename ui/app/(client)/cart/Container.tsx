"use client";

import React from "react";
import CartTable from "./shared/CartTable";
import SummeryTab from "./shared/SummeryTab";
import { useCartContext } from "../Providers/CartProvider";

function Container() {
  const { items, handleRemove, user } = useCartContext();

  return (
    <>
      <CartTable user={user} items={items} handleRemove={handleRemove} />
      <SummeryTab user={user} items={items} />
    </>
  );
}

export default Container;
