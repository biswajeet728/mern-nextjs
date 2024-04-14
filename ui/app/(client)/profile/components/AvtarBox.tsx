"use client";

import Image from "next/image";
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function AvtarBox() {
  return (
    <div className="h-32 w-36 relative">
      <Image
        alt="img"
        src={"/images/user.png"}
        fill
        objectFit="contain"
        className="absolute inset-0 w-full h-full"
      />

      <div
        className="
        absolute
        bottom-0
        right-2
        p-1
        rounded-full
        cursor-pointer
      "
      >
        <input
          type="file"
          id="img-file"
          className="hidden"
          onChange={(e) => console.log(e.target.files)}
        />
        <label
          htmlFor="img-file"
          className="
            flex
            items-center
            justify-center
            bg-black
            p-1
            w-8
            h-8
            cursor-pointer
            rounded-full
        "
        >
          <IoCloudUploadOutline className="text-white" size="1.2rem" />
        </label>
      </div>
      {/* <IoCloudUploadOutline
        size={20}
        className="text-center text-black"
        id="file"
      /> */}
    </div>
  );
}
