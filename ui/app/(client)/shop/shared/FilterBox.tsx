"use client";

import React from "react";
import {
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Slider,
  Typography,
} from "@material-tailwind/react";

export default function FilterBox() {
  return (
    <div>
      <hr className="border-t border-blue-gray-100 my-2" />
      <div className="h-full bg-blue-gray-50 p-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold mons">Categories</h3>
        </div>
        <Card placeholder={""} className="w-full max-w-[30rem] mt-2 rounded-md">
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
                  />
                </ListItemPrefix>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium text-sm mons"
                >
                  Sports
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
                  />
                </ListItemPrefix>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium text-sm mons"
                >
                  Fashion
                </Typography>
              </label>
            </ListItem>
            <ListItem placeholder={""} className="p-0">
              <label
                htmlFor="horizontal-list-svelte"
                className="flex w-full cursor-pointer items-center px-2 py-2"
              >
                <ListItemPrefix placeholder={""} className="mr-3">
                  <Checkbox
                    crossOrigin={""}
                    id="horizontal-list-svelte"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium text-sm mons"
                >
                  Electronics
                </Typography>
              </label>
            </ListItem>
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
      <hr className="border-t border-blue-gray-100 my-2" />
      <div className="h-full bg-blue-gray-50 p-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold mons">Price</h3>
        </div>
        <div className="bg-white py-4 px-2 mt-2 shadow-md rounded-md">
          <div className="w-full md:w-96">
            <Slider placeholder={""} defaultValue={50} />
          </div>
        </div>
      </div>
    </div>
  );
}
