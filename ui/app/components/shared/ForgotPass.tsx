"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { toast } from "sonner";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormToggle?: (type: string) => void;
}

function ForgotPass({ setOpen, handleFormToggle }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = React.useState("");

  const handleSignInSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}profile/forgot-password`,
        {
          email,
        }
      );

      if (res.data.success) {
        toast.success("Reset password link sent to email");

        setOpen(false);
        // router.refresh();
      }
      setOpen(false);
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
    <form onSubmit={handleSignInSubmit}>
      <Card placeholder={""} className="mx-auto w-full max-w-[28rem]">
        <CardBody placeholder={""} className="flex flex-col gap-4">
          <Typography
            placeholder={""}
            variant="h4"
            color="blue-gray"
            className="mons"
          >
            Forgot Password
          </Typography>

          <div>
            <Typography placeholder={""} className="mb-2" variant="h6">
              Enter your registered email
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardBody>

        <CardFooter placeholder={""} className="pt-0">
          <Button
            placeholder={""}
            variant="gradient"
            fullWidth
            className="items-center justify-center gap-2"
            type="submit"
            disabled={!email}
          >
            Send Reset Link
          </Button>

          <Typography placeholder={""} className="mt-4 flex justify-center">
            Return to Login?
            <Typography
              placeholder={""}
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={(e) => {
                e.preventDefault();
                handleFormToggle && handleFormToggle("login");
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

export default memo(ForgotPass);
