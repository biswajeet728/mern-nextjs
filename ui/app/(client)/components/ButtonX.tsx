"use client";

import { Button } from "@material-tailwind/react";
import React from "react";

function ButtonX({ title, pic }: any) {
  return (
    <Button placeholder={""} color="blue" type="submit" disabled={!pic}>
      {title}
    </Button>
  );
}

export default ButtonX;
