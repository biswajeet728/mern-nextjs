"use server";

import { checkAuth } from "@/services/auth/checkAuth";
import { fetchAddress } from "@/services/profile";
import { DefaultResponse } from "@/types";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function updateProfileData(data: FormData) {
  const username = data.get("username");
  const phone = data.get("phone");
  const bio = data.get("bio");

  const cookiesData = cookies();

  try {
    const res = await axios.put<DefaultResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}profile/update-profile-data`,
      {
        username,
        phone,
        bio,
      },
      {
        headers: {
          Authorization: `Bearer ${cookiesData.get("accessToken")?.value}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addAddress(data: FormData) {
  const fullName = data.get("fullName");
  const houseno = data.get("houseno");
  const area = data.get("area");
  const city = data.get("city");
  const state = data.get("state");
  const country = data.get("country");
  const zipCode = data.get("zipCode");
  const landmark = data.get("landmark");
  const phone = data.get("phone");

  const cookiesData = cookies();

  const user = await checkAuth();

  const obj = {
    fullName,
    address: `${houseno}, ${area}`,
    city,
    state,
    country,
    zipCode,
    landmark,
    phone: user?.profile.phone || phone,
  };

  try {
    const res = await axios.post<DefaultResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}profile/add-new-address`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${cookiesData.get("accessToken")?.value}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      return error.response?.data;
    }
  }
}

export async function updateAddress(data: FormData, id: string) {
  const fullName = data.get("fullName");
  const houseno = data.get("houseno");
  const area = data.get("area");
  const city = data.get("city");
  const state = data.get("state");
  const country = data.get("country");
  const zipCode = data.get("zipCode");
  const landmark = data.get("landmark");
  const phone = data.get("phone");

  const cookiesData = cookies();

  const obj = {
    fullName,
    address: `${houseno}, ${area}`,
    city,
    state,
    country,
    zipCode,
    landmark,
    phone,
  };

  try {
    const res = await axios.put<DefaultResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}profile/update-address?id=${id}`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${cookiesData.get("accessToken")?.value}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data;
    }
  }
}

export async function updatePassword(data: FormData) {
  const oldPassword = data.get("oldPassword");
  const newPassword = data.get("newPassword");
  const confirmPassword = data.get("confirmPassword");

  const cookiesData = cookies();

  try {
    const res = await axios.put<DefaultResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}profile/update-password`,
      {
        currentPassword: oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${cookiesData.get("accessToken")?.value}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return error.response?.data;
    }
  }
}
