"use client";

import { Button } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

export default function HomeBanner() {
  return (
    <div className="px-4 mb-4">
      <div className="bg-white border border-blue-gray-100 p-3 rounded-md">
        <div className="bg-blue-gray-50 px-4 py-5 md:py-14 rounded-md h-full">
          <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 md:gap-0">
            <div>
              <h1 className="text-3xl md:text-4xl text-center font-bold text-blue-gray-800 mons">
                SazzyStore
              </h1>
              <p className="text-center mt-2 text-base md:text-lg text-blue-gray-600 mons">
                "SazzyStore: Unleashing chic trends, affordable finds, and
                seamless shopping joy."
              </p>

              <div className="hidden md:flex justify-center">
                <Button
                  placeholder={""}
                  variant="gradient"
                  size="md"
                  className="mt-4"
                >
                  Explore
                </Button>
              </div>
            </div>
            <Image
              src="/images/banner-img.png"
              alt="banner"
              width={500}
              height={300}
              className="rounded-md shadow-md object-cover bg-white w-64 h-56 md:w-auto md:h-auto"
            />
          </div>

          <div className="block md:hidden">
            <Button
              placeholder={""}
              variant="gradient"
              size="md"
              className="w-full mt-6"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
