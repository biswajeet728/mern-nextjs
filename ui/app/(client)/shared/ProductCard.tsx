"use client";

import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export default function ProductCard({ fromBrowse = false }) {
  return fromBrowse ? (
    <Card
      placeholder={""}
      className={"w-full md:w-[320px] border border-gray-200"}
    >
      <Link className="w-full" href="/1">
        <CardHeader
          placeholder={""}
          shadow={false}
          floated={false}
          className="h-56"
        >
          <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Link>
      <CardBody placeholder={""}>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            Apple AirPods
          </Typography>
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            $95.00
          </Typography>
        </div>
        <Typography
          placeholder={""}
          variant="small"
          color="gray"
          className="font-normal opacity-75 mons"
        >
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </Typography>
      </CardBody>
      <CardFooter placeholder={""} className="pt-0">
        <div>
          <Button
            placeholder={""}
            ripple={true}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  ) : (
    <Card
      placeholder={""}
      className={"w-full md:w-[360px] border border-gray-200"}
    >
      <Link className="w-full" href="/1">
        <CardHeader
          placeholder={""}
          shadow={false}
          floated={false}
          className="h-56"
        >
          <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Link>
      <CardBody placeholder={""}>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            Apple AirPods
          </Typography>
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            $95.00
          </Typography>
        </div>
        <Typography
          placeholder={""}
          variant="small"
          color="gray"
          className="font-normal opacity-75 mons"
        >
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </Typography>
      </CardBody>
      <CardFooter placeholder={""} className="pt-0">
        <div>
          <Button
            placeholder={""}
            ripple={true}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
