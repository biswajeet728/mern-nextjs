"use client";

import { Button, Input } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="w-full">
      <Input
        crossOrigin={""}
        type="search"
        color="black"
        label="Search Products.."
        size="md"
        onChange={(e) => {
          if (searchParams.get("q")) {
            router.push("/shop");
          } else {
            router.push(`/shop?q=${e.target.value}`);
          }
        }}
        onBlur={() => {
          router.push("/shop");
        }}
        onFocus={(e) => {
          router.push(`/shop?q=${e.target.value}`);
        }}
      />
    </div>
  );
}
