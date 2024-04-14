"use client";

import axiosInstance from "@/lib/axios";
import { DefaultResponse } from "@/types";
import { SignUpInput, signUpSchema } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

interface SignUpProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormToggle: () => void;
}

function SignUp({ setOpen, handleFormToggle }: SignUpProps) {
  const router = useRouter();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    getValues,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const handleSignInSubmit = async (data: SignUpInput) => {
    try {
      const res = await axiosInstance.post<DefaultResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signup`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message || "Account Registered successfully");
        router.refresh();
      }
      handleFormToggle && handleFormToggle();
    } catch (error) {
      // check if the error is an AxiosError
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          toast.error(error.response.data.message || "An error occurred");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignInSubmit)}>
      <Card placeholder={""} className="mx-auto w-full max-w-[28rem]">
        <CardBody placeholder={""} className="flex flex-col gap-4">
          <Typography
            placeholder={""}
            variant="h4"
            color="blue-gray"
            className="mons"
          >
            Sign Up
          </Typography>

          <div>
            <Typography placeholder={""} className="mb-2" variant="h6">
              Your Username
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              label="Username"
              size="lg"
              {...registerForm("username")}
            />
            {errors.username && (
              <span className="text-red-500 w-full">
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <Typography placeholder={""} className="mb-2" variant="h6">
              Your Email
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              label="Email"
              size="lg"
              {...registerForm("email")}
            />
            {errors.email && (
              <span className="text-red-500 w-full">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Typography placeholder={""} className="mb-2" variant="h6">
              Your Password
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              label="Password"
              size="lg"
              type="password"
              {...registerForm("password")}
            />
            {errors.password && (
              <span className="text-red-500 w-full">
                {errors.password.message}
              </span>
            )}
          </div>
        </CardBody>

        <CardFooter placeholder={""} className="pt-0">
          <Button
            placeholder={""}
            variant="gradient"
            fullWidth
            className="items-center justify-center gap-2"
            type="submit"
            loading={isSubmitting}
            disabled={!isValid}
          >
            Sign Up
          </Button>

          <Typography
            placeholder={""}
            className="my-3 text-center"
            variant="h6"
          >
            Or
          </Typography>

          <Button
            placeholder={""}
            className="flex items-center justify-center gap-3"
            fullWidth
            onClick={() => console.log("Login with Google")} // Implement Google login
          >
            <FcGoogle size={22} />
            Login with Google
          </Button>

          <Typography placeholder={""} className="mt-4 flex justify-center">
            Already have an account?{" "}
            <Typography
              placeholder={""}
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={(e) => {
                e.preventDefault();
                handleFormToggle();
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
}

export default memo(SignUp);
