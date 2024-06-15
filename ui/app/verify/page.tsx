import { DefaultResponse } from "@/types";
import React from "react";
import { GoUnverified, GoVerified } from "react-icons/go";
import Button from "./components/Button";

interface Props {
  params: any;
  searchParams: { [key: string]: string };
}

export default async function page({ params, searchParams }: Props) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: searchParams.token,
        id: searchParams.id,
      }),
    }
  );

  const data: DefaultResponse = await response.json();

  return (
    <div className="max-w-6xl mx-auto h-[80vh]">
      <div className="h-[80%] flex items-center justify-center">
        {!data.success ? (
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

            <Button />
          </div>
        ) : (
          <div>
            <GoVerified className="text-9xl text-green-500 mx-auto" />

            <h1 className="text-2xl text-center mt-3">
              Your email has been verified successfully.
            </h1>
            <p
              className="
                  text-center mt-2
                  text-red-300
                  "
            >
              You can close this tab now.
            </p>

            <Button />
          </div>
        )}
      </div>
    </div>
  );
}
