import React from "react";
// import { MdOutlineVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
// import Spinner from "../components/Spinner";

interface Props {
  params: any;
  searchParams: { [key: string]: string };
}

export default async function page({ params, searchParams }: Props) {
  return (
    <div className="max-w-6xl mx-auto h-[80vh]">
      <div className="h-[80%] flex items-center justify-center">
        <div>
          <GoUnverified className="text-9xl text-red-500 mx-auto" />

          <h1 className="text-2xl text-center mt-3">
            Some error occurred while verifying your email.
          </h1>
          <p
            className="
                  text-center mt-2
                  text-red-300
                  "
          >
            Invalid Token or Alrady Used !!
          </p>
        </div>
      </div>
    </div>
  );
}
