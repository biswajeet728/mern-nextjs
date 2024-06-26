"use client";

import { updatePassword } from "@/lib/server.actions";
import { Button } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

function ChangePassword() {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submitData = (data: FormData) => {
    startTransition(async () => {
      if (data.get("newPassword") !== data.get("confirmPassword")) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const res = await updatePassword(data);
        if (res?.success) {
          router.refresh();
          toast.success(res.message || "Password Changed !");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
          toast.error(error.response?.data.message || "An error occurred");
          return error.response?.data;
        }
      }
    });
  };
  return (
    <form action={submitData}>
      <div className="mt-3 w-full">
        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Current Password"
            name="oldPassword"
            id="old-password"
            className="w-full md:w-1/2 border border-gray-200 rounded-md p-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            id="new-password"
            className="w-full md:w-1/2 border border-gray-200 rounded-md p-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirm-password"
            className="w-full md:w-1/2 border border-gray-200 rounded-md p-2 focus:outline-none"
          />
        </div>

        <Button
          placeholder={""}
          color="blue"
          className="mt-3 w-full flex items-center justify-center md:w-[170px] py-3 px-1 mons font-semibold"
          ripple
          size="sm"
          type="submit"
          loading={isPending}
        >
          Change Password
        </Button>
      </div>
    </form>
  );
}

export default ChangePassword;
