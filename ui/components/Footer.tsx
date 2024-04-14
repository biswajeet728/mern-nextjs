"use client";

import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function Footer() {
  const pathName = usePathname();
  return (
    <div className={pathName === "/auth" ? `hidden` : `px-4 mb-4`}>
      <div className="flex flex-col md:flex-row items-center gap-3 justify-center w-full">
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
            className="text-lg mt-2 md:mt-0 md:text-xl mr-4 cursor-pointer pb-1 md:py-1.5 text-black rounded-md mons"
          >
            SazzyStore
          </Typography>
        </div>

        <div>
          <Typography
            placeholder={""}
            variant="h6"
            className="text-black mons font-semibold text-center"
          >
            &copy; 2024 | Build with{" "}
            <a href={"https://nextjs.org/"} className="text-blue-400">
              Next.js
            </a>{" "}
            by{" "}
            <a href={"https://biswajeet.vercel.com/"} className="text-blue-400">
              Biswajeet Dash
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Footer;
