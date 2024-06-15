"use client";

import { MainProduct } from "@/types";
import { Button } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Pagination({
  products,
  limit,
}: {
  products: MainProduct[];
  limit?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="flex items-center gap-2">
      <Button
        placeholder={""}
        color="gray"
        size="sm"
        ripple={false}
        disabled={
          searchParams.get("page") === "1" || searchParams.get("page") === null
        }
        onClick={() => {
          if (searchParams.get("page") === "1") {
            return;
          }
          router.push(`/shop?page=${Number(searchParams.get("page")) - 1}`);
        }}
      >
        Previous
      </Button>
      <Button
        placeholder={""}
        color="blue"
        size="sm"
        ripple={false}
        disabled={products.length < limit!}
        onClick={() => {
          if (searchParams.get("page") === null) {
            router.push(`/shop?page=${Number(searchParams.get("page")) + 2}`);
          } else {
            router.push(`/shop?page=${Number(searchParams.get("page")) + 1}`);
          }
        }}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
