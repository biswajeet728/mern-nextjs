"use client";

import React, { useEffect, useState } from "react";

import {
  Button,
  Navbar,
  Typography,
  Input,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import UserBox from "./UserBox";

import { LuHeart, LuShoppingCart } from "react-icons/lu";
import { AuthModal } from "./AuthModal";
import { useSearchParams } from "next/navigation";
import { ProductResponse, ProductType, Profile } from "@/types";
import axios from "axios";
import SearchResults from "./shared/SearchResults";
import { useCartContext } from "../Providers/CartProvider";

function Header({ authStatus }: { authStatus: Profile | null }) {
  const { items, handleRemove, user } = useCartContext();
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const openLogin = searchParams.get("login");

  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);

  useEffect(() => {
    if (openLogin) {
      setOpen(true);
    }

    return () => {
      setOpen(false);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!queryText) {
        setSearchResults([]);
        return false;
      }

      try {
        const res = await axios.get<ProductResponse>(
          `${process.env.NEXT_PUBLIC_CATALOGUE_URL}products`,
          {
            params: {
              q: queryText,
            },
          }
        );

        setSearchResults(res.data.products);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          setSearchResults([]);
        }
      }
    })();
  }, [queryText]);

  const handleCloseSearchResults = () => {
    setSearchResults([]); // Clear search results
    setQueryText(""); // Clear query text
  };

  return (
    <div>
      <Navbar
        placeholder={""}
        variant="filled"
        fullWidth
        className={`w-full fixed shadow-none border border-b border-blue-gray-100 bg-gray-200 px-4 py-3 z-50`}
      >
        <div className="flex flex-col md:flex-row justify-between gap-3 text-white">
          <div className="flex gap-2 items-center">
            <Image
              src={"/images/logo.png"}
              alt="SazzyStore"
              width={40}
              height={30}
            />
            <Typography
              placeholder={""}
              as="a"
              href="/"
              variant="h5"
              className="text-lg mt-2 md:mt-0 md:text-xl mr-4 cursor-pointer pb-1 xmd:py-1.5 text-black rounded-md mons"
            >
              SazzyStore
            </Typography>

            <div className="hidden items-center gap-6 w-fit md:flex">
              <Link href="/">
                <Typography
                  placeholder={""}
                  variant="h6"
                  className="cursor-pointer text-black mons font-semibold"
                >
                  Home
                </Typography>
              </Link>
              <Link href="/shop">
                <Typography
                  placeholder={""}
                  variant="h6"
                  className="cursor-pointer text-black mons font-semibold"
                >
                  Shop
                </Typography>
              </Link>
              <Link href="/about">
                <Typography
                  placeholder={""}
                  variant="h6"
                  className="cursor-pointer text-black mons font-semibold"
                >
                  About Us
                </Typography>
              </Link>
            </div>
          </div>
          <div className="relative flex w-full gap-2 md:w-max lg:-ml-20 mt-1">
            <Input
              crossOrigin={"white" as const}
              type="search"
              color="black"
              label="Type here..."
              className="mons"
              value={queryText}
              containerProps={{
                className: "w-full md:min-w-[450px] mons",
              }}
              onChange={(e) => setQueryText(e.target.value)}
            />

            {searchResults.length > 0 && (
              <SearchResults
                searchResults={searchResults}
                handleClose={handleCloseSearchResults}
              />
            )}
          </div>
          <div>
            <div className="flex -mb-2 mt-2 w-full gap-5 md:hidden">
              <Link href="/">
                <span className="cursor-pointer text-black mons font-semibold text-sm">
                  Home
                </span>
              </Link>
              <Link href="/shop">
                <span className="cursor-pointer text-black mons font-semibold text-sm">
                  Shop
                </span>
              </Link>
              <Link href="/about">
                <span className="cursor-pointer text-black mons font-semibold text-sm">
                  About Us
                </span>
              </Link>
            </div>

            {authStatus && (
              <Link
                href="/wishlist"
                className={`block md:hidden absolute bottom-[13px] right-20 md:right-12 md:relative md:top-[1px] lg:top-0right-0`}
              >
                <IconButton placeholder={""} variant="filled" className="px-6">
                  <LuHeart size={18} />
                </IconButton>
              </Link>
            )}

            <Link
              href="/cart"
              className="block md:hidden absolute bottom-3 right-5 md:right-8 md:relative md:top-0 lg:top-0right-0"
            >
              <Badge content={items.length} className="px-[6px]">
                <IconButton
                  placeholder={""}
                  variant="outlined"
                  className="px-6"
                >
                  <LuShoppingCart size={18} />
                </IconButton>
              </Badge>
            </Link>
          </div>

          <div className="">
            <div className="flex items-center">
              {authStatus && (
                <Link
                  href="/wishlist"
                  className={`hidden md:block absolute top-5 right-36 md:right-12 md:relative md:top-[0px] lg:top-0right-0`}
                >
                  <IconButton
                    placeholder={""}
                    variant="filled"
                    className="px-6"
                  >
                    <LuHeart size={18} />
                  </IconButton>
                </Link>
              )}

              <Link
                href="/cart"
                className="hidden md:block absolute top-5 right-20 md:right-8 md:relative md:top-0 lg:top-0right-0"
              >
                <Badge content={items.length} className="px-[6px]">
                  <IconButton
                    placeholder={""}
                    variant="outlined"
                    className="px-6"
                  >
                    <LuShoppingCart size={18} />
                  </IconButton>
                </Badge>
              </Link>
              <div className="absolute top-3 right-4 md:relative md:top-0 md:top-0right-0">
                {authStatus ? (
                  <UserBox user={authStatus} />
                ) : (
                  <Button
                    size="md"
                    placeholder={""}
                    variant="gradient"
                    className="mons capitalize md:py-[11px]"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(!open);
                    }}
                  >
                    Login / Register
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Navbar>

      <AuthModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default Header;
