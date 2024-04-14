import "server-only";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";
import { cache } from "react";

export const checkAuth = cache(async () => {
  const cookie = cookies();
  const accessToken = cookie.get("accessToken");
  const refreshToken = cookie.get("refreshToken");

  if (!accessToken || !refreshToken) return null;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("An error occurred2222: ", error);
    return null;
  }
});
