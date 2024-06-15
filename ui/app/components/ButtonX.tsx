"use client";

import { Button } from "@material-tailwind/react";
import React from "react";

function ButtonX({ title, pic, pending }: any) {
  return (
    <Button
      placeholder={""}
      color="blue"
      type="submit"
      disabled={!pic || pending}
      loading={pending}
    >
      {title}
    </Button>
  );
}

export default ButtonX;
