"use server";

import { DefaultResponse } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { toast } from "sonner";

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
