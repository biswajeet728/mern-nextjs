import axiosInstance from "@/lib/axios";

export interface CartProduct {
  sucess: boolean;
  items: {
    _id: string;
    name: string;
    price: number;
    images: [
      {
        url: string;
        public_id: string;
      }
    ];
    category: string;
  }[];
}

export const createNewCart = async (productId: string, quantity: number) => {
  const res = await axiosInstance.post(`cart/create`, {
    productId,
    quantity,
  });
  return res.data;
};

export const getCartItems = async () => {
  const res = await axiosInstance.get(`cart`);
  return res.data;
};

export const getProductCarts = async (ids: string[]) => {
  const res = await axiosInstance.post<CartProduct>(`cart/get-cart-items`, {
    ids,
  });
  return res.data;
};

export const addMultipleItems = async (productIds: string[]) => {
  const res = await axiosInstance.post(`cart/create-multiple-cart`, {
    productIds,
  });
  return res.data;
};

export const deleteCartItem = async (id: string) => {
  const res = await axiosInstance.post(`cart/remove-cart-item?id=${id}`);
  return res.data;
};

export const updateCartItem = async (type: string, id: string) => {
  const res = await axiosInstance.put<{ success: boolean }>(
    `cart/update-cart-item?type=${type}&id=${id}`
  );
  return res.data;
};
