"use client";

import { ProductSingle } from "@/services/products";
import { MainProduct } from "@/types";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

import { GoDash, GoPlus } from "react-icons/go";

const data = [
  {
    imgelink:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    imgelink:
      "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    imgelink:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    imgelink:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  },
];

export default function SingleProduct({ product }: { product: MainProduct }) {
  const [active, setActive] = React.useState(product?.images[0]?.url);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div className="col-span-full md:col-span-2 bg-blue-gray-50 px-3 py-2">
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[420px]"
              src={active}
              alt=""
            />
          </div>
          {product?.images.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {product?.images?.map(({ url }, index) => (
                <div key={index}>
                  <img
                    onClick={() => setActive(url)}
                    src={url}
                    className="h-20 w-full sm:max-w-full cursor-pointer rounded-lg object-cover object-center"
                    alt="gallery-image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-full md:col-span-2">
        <Typography
          placeholder={""}
          color="blue-gray"
          className="text-base md:text-xl font-bold mons"
        >
          {product?.name}
        </Typography>

        <Typography
          placeholder={""}
          color="blue-gray"
          className="text-base md:text-lg font-medium text-gray-700 mons mt-3"
        >
          {product?.description}
        </Typography>

        <div className="bg-white shadow-md border-2 border-gray-200 mt-4 rounded-md">
          <div className="grid grid-cols-2 gap-2 p-4">
            <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="text-base font-medium mons"
              >
                Price
              </Typography>
              {product?.salePrice !== null ? (
                <div className="flex items-center gap-3">
                  <Typography
                    placeholder={""}
                    color="blue-gray"
                    className="text-base font-medium mons line-through text-red-400"
                  >
                    Rs.{product?.price}
                  </Typography>
                  <Typography
                    placeholder={""}
                    color="blue-gray"
                    className="text-base font-medium mons"
                  >
                    Rs.{product?.salePrice}
                  </Typography>
                </div>
              ) : (
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="text-base font-medium mons"
                >
                  Rs.{product?.price}
                </Typography>
              )}
            </div>
            <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="text-base font-medium mons"
              >
                Category
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="text-base font-medium mons"
              >
                {product?.category}
              </Typography>
            </div>
            {/* <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="text-base font-medium mons"
              >
                Brand
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="text-base font-medium mons"
              >
                Apple
              </Typography>
            </div> */}
            <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="text-base font-medium mons"
              >
                Stock
              </Typography>
              {product?.stock > 0 ? (
                <div className="px-3 py-1 bg-green-500 rounded-md w-fit">
                  <Typography
                    placeholder={""}
                    color="blue-gray"
                    className="text-base font-medium mons text-white"
                  >
                    In Stock
                  </Typography>
                </div>
              ) : (
                <div className="px-3 py-1 bg-red-500 rounded-md w-fit">
                  <Typography
                    placeholder={""}
                    color="blue-gray"
                    className="text-base font-medium mons text-white"
                  >
                    Out of Stock
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 flex gap-4 items-center">
            {/* create quantity increase and decrease */}
            <Button
              placeholder={""}
              size="sm"
              variant="text"
              ripple
              disabled={product?.stock === 0}
            >
              <GoDash size={24} />
            </Button>
            <div className="bg-gray-200 w-12 h-10 flex items-center justify-center shadow-md">
              1
            </div>
            <Button
              placeholder={""}
              size="sm"
              variant="text"
              ripple
              disabled={product?.stock === 0}
            >
              <GoPlus size={24} />
            </Button>
          </div>
          <div className="pb-4 mt-4 px-4 flex gap-4">
            <Button
              placeholder={""}
              variant="filled"
              className="bg-blue-400"
              ripple
              disabled={product?.stock === 0}
            >
              Add to Cart
            </Button>
            <Button
              placeholder={""}
              variant="outlined"
              ripple
              disabled={product?.stock === 0}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
