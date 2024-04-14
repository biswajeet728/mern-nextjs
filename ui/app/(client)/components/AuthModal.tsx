// @ts-ignore
"use client";

import React, { useCallback } from "react";
import { Dialog } from "@material-tailwind/react";

import SignUp from "./shared/SignUp";
import SignIn from "./shared/SignIn";
import { useForm } from "react-hook-form";

export function AuthModal({ open, setOpen }: any) {
  const [formType, setFormType] = React.useState<"login" | "register">("login");

  const { reset } = useForm({
    mode: "all",
  });

  const handleFormToggle = useCallback(() => {
    setFormType((prev) => (prev === "login" ? "register" : "login"));
    reset();
  }, []);

  return (
    <Dialog
      placeholder={""}
      size="md"
      open={open}
      handler={() => setOpen(false)}
      className="bg-transparent shadow-none"
    >
      {formType === "register" ? (
        <SignUp
          setOpen={() => setOpen(false)}
          handleFormToggle={handleFormToggle}
        />
      ) : (
        <SignIn
          setOpen={() => setOpen(false)}
          handleFormToggle={handleFormToggle}
        />
      )}
    </Dialog>
  );
}
