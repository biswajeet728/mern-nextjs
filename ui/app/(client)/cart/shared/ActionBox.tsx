"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { GoX } from "react-icons/go";

export default function ActionBox() {
  return (
    <div>
      <Button
        placeholder={""}
        color="red"
        size="sm"
        variant="outlined"
        ripple
        className="hidden md:flex items-center gap-1 shadow-none rounded-full mons"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 font-semibold mons"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        Remove
      </Button>
      <Button
        placeholder={""}
        color="red"
        size="sm"
        variant="outlined"
        ripple
        className="block md:hidden"
      >
        <GoX size={20} />
      </Button>
    </div>
  );
}
