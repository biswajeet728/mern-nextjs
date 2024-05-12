"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { GoDash, GoPlus } from "react-icons/go";
import { useCart } from "@/store/use-cart";
import { CartItem, Profile } from "@/types";
import { useCartContext } from "../../Providers/CartProvider";

export default function QuantityBox({
  item,
  user,
}: {
  item: CartItem;
  user: Profile | null;
}) {
  const { handleUpdate } = useCartContext();

  return (
    <div className="flex items-center gap-3">
      {/* create quantity increase and decrease */}
      <Button
        placeholder={""}
        size="sm"
        variant="text"
        ripple
        onClick={() => handleUpdate("decrease", item._id)}
      >
        <GoDash size={20} />
      </Button>
      <div className="bg-gray-200 w-10 h-8 flex items-center justify-center shadow-md">
        {item.quantity}
      </div>
      <Button
        placeholder={""}
        size="sm"
        variant="text"
        ripple
        onClick={() => handleUpdate("increase", item._id)}
      >
        <GoPlus size={20} />
      </Button>
    </div>
  );
}
