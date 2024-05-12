import axiosInstance from "@/lib/axios";

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface WishlistProduct {
  sucess: boolean;
  items: WishlistItem[];
}

export const createNewWishlist = async (productId: string) => {
  const res = await axiosInstance.post(`wishlist/create`, {
    productId,
  });
  return res.data;
};

export const fetchWishlist = async () => {
  const res = await axiosInstance.get<WishlistProduct>(
    `wishlist/get-user-wishlist`
  );
  return res.data.items;
};

export const removeWishlistItem = async (productId: string) => {
  const res = await axiosInstance.delete(
    `wishlist/remove-wishlist-item?productId=${productId}`
  );
  return res.data;
};
