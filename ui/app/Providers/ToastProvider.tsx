"use client";

import React from "react";
import { Toaster, toast } from "sonner";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      richColors
      toastOptions={{
        className: "mons text-base font-bold",
      }}
    />
  );
};
