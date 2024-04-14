"use client";

import Image from "next/image";
import React from "react";
import Heading from "../shared/Heading";
import { Button, Typography } from "@material-tailwind/react";

function page() {
  return (
    <div className="p-4 max-w-full md:max-w-screen-xl mx-auto -mt-3 pb-0 md:pb-12">
      <Heading children="About Us" />
      <div className="h-screen md:h-[65vh]">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-full bg-blue-gray-50 p-3 rounded-md">
            <div className="h-full w-full bg-white shadow-md flex items-center justify-center">
              <Image
                src="/images/about-1.png"
                alt="hero"
                width={350}
                height={350}
                objectFit="cover"
                className="object-cover self-center w-[250px] h-[250px] md:w-auto md:h-auto"
              />
            </div>
          </div>
          <div className="">
            <Typography
              placeholder={""}
              color="blue-gray"
              className="mons text-sm md:text-[17px] font-medium leading-7"
            >
              At Sazzy Store, we are more than just an ecommerce platform – we
              are a passionate community that curates a distinctive shopping
              experience for those who seek style, quality, and innovation.
              Founded with a vision to redefine online shopping, Sazzy Store is
              a haven for fashion enthusiasts and trendsetters alike. Our
              carefully selected collection showcases a fusion of chic
              aesthetics and timeless designs, embodying a commitment to
              individuality and self-expression.
            </Typography>
            <Typography
              placeholder={""}
              color="blue-gray"
              className="mons text-sm md:text-[17px] font-medium leading-7 mt-2 mb-3"
            >
              Driven by a relentless pursuit of customer satisfaction, we pride
              ourselves on delivering not just products, but an immersive
              journey that transcends the traditional boundaries of retail.
              Sazzy Store is not merely a destination for acquiring goods; it is
              a destination for inspiration, discovery, and personal
              empowerment.Welcome to Sazzy Store – where fashion meets passion,
              and every click unveils a world of possibilities.
            </Typography>

            <Button placeholder={""} size="md" variant="gradient">
              Check Our Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
