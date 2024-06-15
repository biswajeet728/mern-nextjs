// @ts-ignore
"use client";

import React, { useCallback } from "react";
import { Dialog } from "@material-tailwind/react";

import SignUp from "./shared/SignUp";
import SignIn from "./shared/SignIn";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ForgotPass from "./shared/ForgotPass";

export function AuthModal({ open, setOpen }: any) {
  const [formType, setFormType] = React.useState<
    "login" | "register" | "forgotpass"
  >("login");
  const router = useRouter();

  const { reset } = useForm({
    mode: "all",
  });

  const handleFormToggle = useCallback((type: string) => {
    setFormType(
      type === "login"
        ? "login"
        : type === "register"
        ? "register"
        : "forgotpass"
    );
    reset();
  }, []);

  return (
    <Dialog
      placeholder={""}
      size="md"
      open={open}
      handler={() => {
        setOpen(false);
        router.push("/");
        setFormType("login");
      }}
      className="bg-transparent shadow-none"
    >
      {formType === "register" ? (
        <SignUp
          setOpen={() => setOpen(false)}
          handleFormToggle={handleFormToggle}
        />
      ) : formType === "forgotpass" ? (
        <ForgotPass
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
