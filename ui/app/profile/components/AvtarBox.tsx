"use client";

import { Profile } from "@/types";
import Image from "next/image";
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useGlobalStoreContext } from "../../Providers/GlobalStoreProvider";

export default function AvtarBox({
  setPic,
}: {
  setPic: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { userProfilePic, user } = useGlobalStoreContext();
  return (
    <div className="h-28 w-28 relative rounded-full">
      <Image
        alt="img"
        src={userProfilePic}
        fill
        objectFit="cover"
        className="absolute inset-0 w-full h-full rounded-full"
      />

      {!user?.profile?.isSocialLogin && (
        <div
          className="
        absolute
        -bottom-1
        -right-2
        p-1
        rounded-full
        cursor-pointer
      "
        >
          <input
            type="file"
            id="img-file"
            className="hidden"
            name="files"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPic(URL.createObjectURL(file));
              }
            }}
          />
          <label
            htmlFor="img-file"
            className="
            flex
            items-center
            justify-center
            bg-black
            p-1
            w-9
            h-9
            cursor-pointer
            rounded-full
        "
          >
            <IoCloudUploadOutline className="text-white" size="1.1rem" />
          </label>
        </div>
      )}
    </div>
  );
}
