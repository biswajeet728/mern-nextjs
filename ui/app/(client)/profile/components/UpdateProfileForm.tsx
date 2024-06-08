"use client";

import { updateProfileData } from "@/lib/server.actions";
import { Profile } from "@/types";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

export default function UpdateProfileForm({ user }: { user: Profile | null }) {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submitData = (data: FormData) => {
    startTransition(async () => {
      const res = await updateProfileData(data);
      if (res?.success) {
        router.refresh();
        toast.success(res.message || "Updated !");
      }
    });
  };
  return (
    <form action={submitData} className="space-y-6">
      <div className="space-y-6">
        <Input
          label="Username"
          crossOrigin={""}
          defaultValue={user?.profile.username || ""}
          name="username"
        />
        <Input
          label="Email Address"
          crossOrigin={""}
          defaultValue={user?.profile.email || ""}
          className="cursor-not-allowed pointer-events-none"
        />
        <Input
          label="Mobile Number"
          crossOrigin={""}
          defaultValue={user?.profile.phone || ""}
          maxLength={10}
          max={10}
          name="phone"
          onChange={(e) => {
            // check if the number is valid with regex
            const number = e.target.value;
            if (!/^\d+$/.test(number)) {
              e.target.setCustomValidity("Enter a valid number");
            } else if (
              number.length !== 10 ||
              !["6", "7", "8", "9"].includes(number[0])
            ) {
              e.target.setCustomValidity("Enter a valid number");
            } else {
              e.target.setCustomValidity("");
            }
          }}
        />
        <Textarea
          label="Add Bio"
          defaultValue={user?.profile.bio || ""}
          name="bio"
        />
      </div>
      <div className="mt-2">
        <Button
          placeholder={""}
          color="red"
          size="md"
          ripple
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          Update
        </Button>
      </div>
    </form>
  );
}
