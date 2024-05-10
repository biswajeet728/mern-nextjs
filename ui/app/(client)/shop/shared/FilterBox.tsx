"use client";

import React from "react";
import {
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Slider,
  Typography,
} from "@material-tailwind/react";
import { CategoryType, MainProduct } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBox({
  categories,
  products,
}: {
  categories: CategoryType[];
  products: MainProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // find max and min price from all products
  // const maxPrice = React.useMemo(() => {
  //   return Math.max(...products.map((product) => Number(product.price)));
  // }, [products]);

  return (
    <div>
      <hr className="border-t border-blue-gray-100 my-2" />
      <div className="h-full bg-blue-gray-50 p-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold mons">Categories</h3>
        </div>
        <Card placeholder={""} className="w-full max-w-[30rem] mt-2 rounded-md">
          <List placeholder={""} className="flex-wrap">
            {categories.map((category) => (
              <ListItem
                placeholder={""}
                className="p-0 w-fit"
                key={category._id}
              >
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-2 py-2"
                >
                  <ListItemPrefix placeholder={""} className="mr-3">
                    <Checkbox
                      crossOrigin={""}
                      placeholder={""}
                      id="horizontal-list-react"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      checked={searchParams.get("cat") === category._id}
                      onChange={() => {
                        if (searchParams.get("cat") === category._id) {
                          router.push(`/shop`);
                        } else {
                          router.push(`/shop?cat=${category._id}`);
                        }
                      }}
                    />
                  </ListItemPrefix>
                  <Typography
                    placeholder={""}
                    color="blue-gray"
                    className="font-medium text-sm mons"
                  >
                    {category.name}
                  </Typography>
                </label>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
      <hr className="border-t border-blue-gray-100 my-2" />
      <div className="h-full w-full bg-blue-gray-50 p-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold mons">Product Type</h3>
        </div>
        <Card
          placeholder={""}
          className="max-w-full md:max-w-[21rem] mt-2 rounded-md"
        >
          <List
            placeholder={""}
            className="flex-wrap md:flex-row md:flex-nowrap"
          >
            <ListItem placeholder={""} className="p-0">
              <label
                htmlFor="horizontal-list-react"
                className="flex w-full cursor-pointer items-center px-2 py-2"
              >
                <ListItemPrefix placeholder={""} className="mr-3">
                  <Checkbox
                    crossOrigin={""}
                    placeholder={""}
                    id="horizontal-list-react"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                    checked={searchParams.get("isBestSelling") === "true"}
                    onChange={() => {
                      if (searchParams.get("isBestSelling") === "true") {
                        router.push(`/shop`);
                      } else {
                        router.push(`/shop?isBestSelling=true`);
                      }
                    }}
                  />
                </ListItemPrefix>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium text-base mons"
                >
                  Best Selling
                </Typography>
              </label>
            </ListItem>
            <ListItem placeholder={""} className="p-0">
              <label
                htmlFor="horizontal-list-vue"
                className="flex w-full cursor-pointer items-center px-2 py-2"
              >
                <ListItemPrefix placeholder={""} className="mr-3">
                  <Checkbox
                    crossOrigin={""}
                    id="horizontal-list-vue"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                    checked={searchParams.get("isFeatured") === "true"}
                    onChange={() => {
                      if (searchParams.get("isFeatured") === "true") {
                        router.push(`/shop`);
                      } else {
                        router.push(`/shop?isFeatured=true`);
                      }
                    }}
                  />
                </ListItemPrefix>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium text-base mons"
                >
                  New Arrivals
                </Typography>
              </label>
            </ListItem>
          </List>
        </Card>
      </div>
      {/* <hr className="border-t border-blue-gray-100 my-2" />
      <div className="h-full bg-blue-gray-50 p-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold mons">Price</h3>
        </div>
        <div className="bg-white py-4 px-2 mt-2 shadow-md rounded-md">
          <div className="w-full md:!w-96">
            <Slider
              placeholder={""}
              defaultValue={
                searchParams.get("price")
                  ? Number(searchParams.get("price"))
                  : 0
              }
              onChange={(e: any) => {
                if (searchParams.get("price")) {
                  router.push(`/shop`);
                } else {
                  router.push(`/shop?price=${Math.ceil(e.target.value)}`);
                }
              }}
              min={0}
              className="!w-full"
            />

            <div className="w-full mt-2 flex items-center justify-between">
              <div>
                {searchParams.get("price")
                  ? Number(searchParams.get("price"))
                  : 0}
              </div>
              <div>{maxPrice}</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex justify-start mt-3">
        <Button
          placeholder={""}
          onClick={() => {
            router.push("/shop");
          }}
          color="red"
          size="sm"
          ripple={false}
          className="mons"
          disabled={
            searchParams.get("cat") === null &&
            searchParams.get("isBestSelling") === null &&
            searchParams.get("isFeatured") === null &&
            searchParams.get("page") === null &&
            searchParams.get("q") === null
          }
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
