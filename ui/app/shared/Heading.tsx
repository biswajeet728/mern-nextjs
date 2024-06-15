import React from "react";
import { CgCheckR } from "react-icons/cg";

export default function Heading({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="py-4 text-center md:text-left flex items-center justify-center md:justify-start gap-2"
      {...props}
    >
      <CgCheckR className="text-xl text-green-500" />
      <h2 className="text-xl font-bold mons">{children}</h2>
    </div>
  );
}
