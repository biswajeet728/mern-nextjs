"use client";

import React from "react";
import {
  Collapse,
  Typography,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { IoFootball } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { IoLaptopOutline } from "react-icons/io5";

const navListMenuItems = [
  {
    title: "Sports",
    icon: IoFootball,
  },
  {
    title: "Fashion",
    icon: GiClothes,
  },
  {
    title: "Electronics",
    icon: IoLaptopOutline,
  },
];

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ icon, title }, key) => (
    <a href="#" key={key}>
      <MenuItem placeholder={""} className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {" "}
          {React.createElement(icon, {
            strokeWidth: 2,
            className: "h-6 text-gray-900 w-6 mons",
          })}
        </div>
        <div>
          <Typography
            placeholder={""}
            variant="h6"
            color="blue-gray"
            className="flex items-center mons"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <div className="p-3">
      {/* create overlay */}

      <div className="relative cursor-default">
        <Image
          src="/images/bg-2.jpg"
          alt="hero"
          width={1920}
          height={0}
          sizes="100%"
          className="rounded-md shadow-md h-[625px] object-cover w-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-0"></div>

        <div className="absolute top-2 left-2">
          <Menu
            open={isMenuOpen}
            handler={setIsMenuOpen}
            offset={{ mainAxis: 20 }}
            placement="bottom"
            allowHover={true}
          >
            <MenuHandler>
              <Typography
                placeholder={""}
                as="div"
                variant="small"
                className="font-semibold mons"
              >
                <ListItem
                  placeholder={""}
                  className="flex items-center gap-2 pr-4 font-semibold text-black bg-white rounded-none w-fit"
                  selected={isMenuOpen || isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                >
                  Categories
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`hidden h-3 w-3 transition-transform lg:block ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`block h-3 w-3 transition-transform lg:hidden ${
                      isMobileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </ListItem>
              </Typography>
            </MenuHandler>
            <MenuList
              placeholder={""}
              className="hidden ml-5 -mt-3 max-w-screen-sm rounded-none lg:block"
            >
              <ul className="grid grid-cols-3 outline-none outline-0">
                {renderItems}
              </ul>
            </MenuList>
          </Menu>
          <div className="block lg:hidden bg-white mt-2">
            <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
          </div>
        </div>

        {/* content */}
        <div className="absolute top-1/3 w-full text-center px-4">
          <Typography
            placeholder={""}
            as="text"
            variant="h3"
            className="text-white z-10 mons font-medium text-xl md:text-3xl"
          >
            Curated Collections, Unmatched Quality, Your Lifestyle Upgrade!
          </Typography>
          <Typography
            placeholder={""}
            as="text"
            variant="h5"
            className="text-white z-10 mons mt-2 font-medium md:w-1/2 mx-auto leading-8 text-base md:text-xl"
          >
            Explore handpicked products for fashion, electronics, home, and
            beyond. Elevate your style and comfort today!"
          </Typography>

          <Button placeholder={""} variant="filled" size="md" className="mt-4">
            Shart Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
