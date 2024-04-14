import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInResponse, DefaultResponse } from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL!}auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<DefaultResponse, {}>({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyAccount: builder.mutation<DefaultResponse, {}>({
      query: (credentials) => ({
        url: "verify",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<SignInResponse, {}>({
      query: (credentials) => ({
        url: "signin",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyAccountMutation,
  useLoginMutation,
} = authApi;
