"use client";

import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { GoArrowLeft } from "react-icons/go";

export default function BackView() {
  return (
    <Button placeholder={""} variant="outlined" size="sm">
      <Typography
        placeholder={""}
        as="a"
        href="/shop"
        variant="h5"
        className="hidden sm:block text-sm mt-2 md:mt-0 md:text-base cursor-pointer rounded-md mons font capitalize"
      >
        Go back
      </Typography>

      <GoArrowLeft size={24} className="block sm:hidden" />
    </Button>
  );
}
