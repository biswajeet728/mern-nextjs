import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

export interface AddressItem {
  _id: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  phone: number;
  landmark?: string;
  isDefault: boolean;
}

export interface Address {
  sucess: boolean;
  items: AddressItem[];
}

export const fetchAddress = async () => {
  const cookie = cookies();
  const accessToken = cookie.get("accessToken");

  if (!accessToken) return null;

  const res = await axiosInstance.get<Address>(`profile/get-address`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  return res.data;
};

// export const removeWishlistItem = async (productId: string) => {
//   const res = await axiosInstance.delete(
//     `wishlist/remove-wishlist-item?productId=${productId}`
//   );
//   return res.data;
// };
