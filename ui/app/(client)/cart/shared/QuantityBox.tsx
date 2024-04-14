"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { GoDash, GoPlus } from "react-icons/go";

export default function QuantityBox() {
  return (
    <div className="flex items-center gap-3">
      {/* create quantity increase and decrease */}
      <Button placeholder={""} size="sm" variant="text" ripple>
        <GoDash size={20} />
      </Button>
      <div className="bg-gray-200 w-10 h-8 flex items-center justify-center shadow-md">
        1
      </div>
      <Button placeholder={""} size="sm" variant="text" ripple>
        <GoPlus size={20} />
      </Button>
    </div>
  );
}
