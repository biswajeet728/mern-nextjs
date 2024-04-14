"use client";

import { Button, Input } from "@material-tailwind/react";
import React from "react";

export default function SearchInput() {
  return (
    <div className="w-full">
      <Input
        crossOrigin={""}
        type="search"
        color="black"
        label="Search Products.."
        size="md"
        placeholder="Search Products.."
      />
    </div>
  );
}
