"use client";

import axios from "axios";
import React from "react";
import { toast } from "sonner";

interface Props {
  params: any;
  searchParams: { [key: string]: string };
}

export default function Page({ params, searchParams }: Props) {
  const submitData = async (data: FormData) => {
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirm-password") as string;

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}profile/reset-password/${searchParams?.token}/user/${searchParams.id}`,
        {
          password,
        }
      );

      if (res.data.success) {
        toast.success("Password reset successfully");
        // redirect to home page after 5 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[80vh]">
      <div className="h-full flex flex-col items-center justify-center mx-3">
        <div>
          <div className="text-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-16 h-16 mx-auto md:w-20 md:h-20"
            />
            <h1 className="text-2xl font-semibold text-black mt-3">
              Sazzy Store
            </h1>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitData(new FormData(e.currentTarget));
          }}
          className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mx-4 border border-gray-400 mt-5 border-opacity-70"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter new password"
              name="password"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              name="confirm-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
