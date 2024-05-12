"use client";

import { useWishlist } from "@/store/use-wishlist";
import getGoogleOAuth from "@/utils/googleauth";
import { SignInInput, signinSchema } from "@/validators";
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

interface SignInProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormToggle?: () => void;
}

function SignIn({ setOpen, handleFormToggle }: SignInProps) {
  const router = useRouter();
  const params = useSearchParams();
  const redirectPath = params.get("redirect");
  const wishlist = useWishlist();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    getValues,
  } = useForm<SignInInput>({
    resolver: zodResolver(signinSchema),
    mode: "all",
  });

  const handleSignInSubmit = async (data: SignInInput) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signin`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        if (redirectPath) {
          router.push(redirectPath);
        }

        setOpen(false);
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
            Sign In
          </Typography>

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
            Sign In
          </Button>

          <Typography
            placeholder={""}
            className="my-3 text-center"
            variant="h6"
          >
            Or
          </Typography>

          <Link
            href={getGoogleOAuth()}
            className="flex items-center justify-center gap-3 bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 rounded-lg p-2 w-full"
          >
            <FcGoogle size={22} />
            <Typography placeholder={""} variant="h6">
              Login with Google
            </Typography>
          </Link>

          <Typography placeholder={""} className="mt-4 flex justify-center">
            Don't have an account?
            <Typography
              placeholder={""}
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={(e) => {
                e.preventDefault();
                handleFormToggle && handleFormToggle();
              }}
            >
              Sign Up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
}

export default memo(SignIn);
