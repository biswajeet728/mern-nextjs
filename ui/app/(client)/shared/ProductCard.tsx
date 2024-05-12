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
import { MainProduct, Profile, ProfileType } from "@/types";
import { useCart } from "@/store/use-cart";
import { useServerCart } from "@/store/use-server-cart";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

export default function ProductCard({
  fromBrowse = false,
  product,
}: {
  fromBrowse?: boolean;
  product: MainProduct;
}) {
  const cart = useCart();
  const serverCart = useServerCart();

  const handleCart = async (product: MainProduct) => {
    try {
      const user = await axiosInstance.get<Profile>("/auth/me");

      if (user) {
        handleAddToServerCart(product);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        handleAddToCart(product);
      }
    }
  };

  const handleAddToCart = (product: MainProduct) => {
    cart.addItem({
      _id: product._id,
      quantity: 1,
    });
  };

  const handleAddToServerCart = (product: MainProduct, quantity = 1) => {
    serverCart.addItem(product._id, quantity);
  };

  return fromBrowse ? (
    <Card
      placeholder={""}
      className={"w-full md:w-[320px] border border-gray-200"}
    >
      <CardHeader
        placeholder={""}
        shadow={false}
        floated={false}
        className="h-56"
      >
        <Link href={`/product/${product?.slug}`} target="_blank">
          <img
            src={product?.images[0]?.url || "https://via.placeholder.com/300"}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </Link>
      </CardHeader>
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
            onClick={() => handleCart(product)}
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
        <div className="mb-2 flex items-center justify-between">
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            {product?.name?.length > 40
              ? product?.name?.slice(0, 40) + "......"
              : product?.name || "Unavailable"}
          </Typography>
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium mons"
          >
            Rs.{product?.price || "N/A"}
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
            onClick={() => handleCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
