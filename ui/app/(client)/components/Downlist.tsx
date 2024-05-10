"use client";

import React from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";

function Downlist() {
  return (
    <div className="px-4">
      <div className="mt-3 max-w-full mx-auto mb-4">
        <div className="h-full md:h-[550px] flex flex-col justify-center md:flex-row gap-3">
          <Card
            placeholder={""}
            className="group relative w-full p-3 bg-white border border-blue-gray-100 overflow-hidden transition-all duration-500 md:flex-1 h-[300px] md:h-full"
          >
            <CardBody
              placeholder={""}
              className="h-full bg-blue-gray-50 flex items-center justify-center
              rounded-md shadow-none py-2"
            >
              <img
                src="/images/football.png"
                alt="profile-picture"
                className="w-32 h-32 object-cover"
              />
            </CardBody>
            {/* create animated overlay when hover with tailwind css */}
            <div className="absolute inset-0 bg-gradient-to-t rounded-md group-hover:from-gray-800 group-hover:to-transparent transition-all duration-500 translate-y-[60%] group-hover:translate-y-0"></div>
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
              <Typography
                placeholder={""}
                color="white"
                className="text-2xl font-bold mt-12 mb-3 group-hover:text-blue-gray-50 mons"
              >
                Sports
              </Typography>
              <Typography
                placeholder={""}
                color="white"
                className="text-sm group-hover:text-blue-gray-50 mons italic"
              >
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              </Typography>

              <Link href={`/shop?cat=${process.env.NEXT_PUBLIC_SPORTS_CAT_ID}`}>
                <Button
                  placeholder={""}
                  variant="gradient"
                  size="md"
                  className="mt-3"
                >
                  Browse
                </Button>
              </Link>
            </div>
          </Card>
          <div className="flex flex-col gap-3 flex-1">
            <Card
              placeholder={""}
              className="group relative bg-white p-3 w-full border border-blue-gray-100 overflow-hidden transition-all duration-500 h-[300px] md:h-full"
            >
              {/* <CardHeader
                placeholder={""}
                floated={false}
                className="h-full bg-blue-gray-50 flex items-center justify-center
              rounded-none shadow-none"
              >
                <img
                  src="/images/coat.png"
                  alt="profile-picture"
                  className="w-32 h-32 object-cover"
                />
              </CardHeader> */}
              <CardBody
                placeholder={""}
                className="h-full bg-blue-gray-50 flex items-center justify-center
              rounded-md shadow-none py-2"
              >
                <img
                  src="/images/coat.png"
                  alt="profile-picture"
                  className="w-32 h-32 object-cover"
                />
              </CardBody>

              <div className="absolute inset-0 bg-gradient-to-t rounded-md group-hover:from-gray-800 group-hover:to-transparent transition-all duration-500 translate-y-[30%] group-hover:translate-y-[10%]"></div>
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <Typography
                  placeholder={""}
                  color="white"
                  className="text-2xl font-bold mt-12 mb-3 group-hover:text-blue-gray-50 mons"
                >
                  Fashion
                </Typography>
                <Typography
                  placeholder={""}
                  color="white"
                  className="text-sm group-hover:text-blue-gray-50 mons italic"
                >
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                </Typography>
                <Link
                  href={`/shop?cat=${process.env.NEXT_PUBLIC_FASHION_CAT_ID}`}
                >
                  <Button
                    placeholder={""}
                    variant="gradient"
                    size="md"
                    className="mt-3"
                  >
                    Browse
                  </Button>
                </Link>
              </div>
            </Card>
            <Card
              placeholder={""}
              className="group relative w-full bg-white p-3 border border-blue-gray-100 overflow-hidden transition-all duration-500 h-[300px] md:h-full"
            >
              {/* <CardHeader
                placeholder={""}
                floated={false}
                className="h-full bg-blue-gray-50 flex items-center justify-center
              rounded-none shadow-none py-2"
              >
                <img
                  src="/images/electronic.png"
                  alt="profile-picture"
                  className="w-32 h-32 object-cover"
                />
              </CardHeader> */}
              <CardBody
                placeholder={""}
                className="h-full bg-blue-gray-50 flex items-center justify-center
              rounded-md shadow-none py-2"
              >
                <img
                  src="/images/electronic.png"
                  alt="profile-picture"
                  className="w-32 h-32 object-cover"
                />
              </CardBody>

              <div className="absolute inset-0 bg-gradient-to-t rounded-md group-hover:from-gray-800 group-hover:to-transparent transition-all duration-500 translate-y-[60%] group-hover:translate-y-[10%]"></div>
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <Typography
                  placeholder={""}
                  color="white"
                  className="text-2xl font-bold mt-12 mb-3 group-hover:text-blue-gray-50 mons"
                >
                  Electronics
                </Typography>
                <Typography
                  placeholder={""}
                  color="white"
                  className="text-sm group-hover:text-blue-gray-50 mons italic"
                >
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                </Typography>
                <Link
                  href={`/shop?cat=${process.env.NEXT_PUBLIC_ELECTRONICS_CAT_ID}`}
                >
                  <Button
                    placeholder={""}
                    variant="gradient"
                    size="md"
                    className="mt-3"
                  >
                    Browse
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Downlist;
