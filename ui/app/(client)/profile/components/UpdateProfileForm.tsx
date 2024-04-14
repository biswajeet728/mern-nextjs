"use client";

import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";

export default function UpdateProfileForm() {
  return (
    <form>
      <div className="space-y-6">
        <Input label="Username" crossOrigin={""} />
        <Input label="Email Address" crossOrigin={""} />
        <Input label="Mobile Number" crossOrigin={""} />
        <Textarea label="Add Bio" />
      </div>
      <div className="mt-2">
        <Button placeholder={""} color="red" size="md" ripple>
          Update
        </Button>
      </div>
    </form>
  );
}
