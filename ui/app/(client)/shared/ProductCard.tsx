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
import { MainProduct } from "@/types";

export default function ProductCard({
  fromBrowse = false,
  product,
}: {
  fromBrowse?: boolean;
  product: MainProduct;
}) {
  return fromBrowse ? (
    <Card
      placeholder={""}
      className={"w-full md:w-[320px] border border-gray-200"}
    >
      <Link className="w-full" href={`/product/${product?.slug}`}>
        <CardHeader
          placeholder={""}
          shadow={false}
          floated={false}
          className="h-56"
        >
          <img
            src={product?.images[0]?.url || "https://via.placeholder.com/300"}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Link>
      <CardBody placeholder={""}>
        <div className="mb-2 flex items-start justify-between">
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            {product?.name?.length > 40
              ? product?.name?.slice(0, 40) + "......"
              : product?.name || "Product Name"}
          </Typography>
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            Rs. {product?.price || "$95.00"}
          </Typography>
        </div>
        {/* <Typography
          placeholder={""}
          variant="small"
          color="gray"
          className="font-normal opacity-75 mons"
        >
          {product?.description?.length > 80
            ? product?.description?.slice(0, 80) + "......"
            : product?.description}
        </Typography> */}
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
            src={product?.images[0]?.url || "https://via.placeholder.com/300"}
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
            {product?.name?.length > 40
              ? product?.name?.slice(0, 40) + "......"
              : product?.name || "Product Name"}
          </Typography>
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            Rs.{product?.price || "$95.00"}
          </Typography>
        </div>
        {/* <Typography
          placeholder={""}
          variant="small"
          color="gray"
          className="font-normal opacity-75 mons"
        >
          {product?.description?.length > 80
            ? product?.description?.slice(0, 80) + "......"
            : product?.description}
        </Typography> */}
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
