"use client";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { FcHome } from "react-icons/fc";

export default function Button() {
  return (
    <Link
      href={"/"}
      className="flex items-center justify-center gap-3 bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 rounded-lg p-2 w-1/3 my-3 self-center mx-auto"
    >
      <FcHome color="#ffffff" size={22} />
      <Typography placeholder={""} variant="h6" className="mt-1">
        Go To Home
      </Typography>
    </Link>
  );
}
