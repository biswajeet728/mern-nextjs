"use client";

import React from "react";
import CartTable from "./shared/CartTable";
import SummeryTab from "./shared/SummeryTab";
import { useGlobalStoreContext } from "../Providers/GlobalStoreProvider";

function Container() {
  const { items, handleRemove, user } = useGlobalStoreContext();

  return (
    <>
      <CartTable user={user} items={items} handleRemove={handleRemove} />
      <SummeryTab />
    </>
  );
}

export default Container;
