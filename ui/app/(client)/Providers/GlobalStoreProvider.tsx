"use client";

import { checkAuth } from "@/services/auth/checkAuth";
import { addMultipleItems, getProductCarts } from "@/services/cart";
import { AddressItem } from "@/services/profile";
import { WishlistItem } from "@/services/wishlist";
import { useCart } from "@/store/use-cart";
import { useServerCart } from "@/store/use-server-cart";
import { useWishlist } from "@/store/use-wishlist";
import {
  CartItem,
  DefaultResponse,
  Profile,
  SingleAddress,
  UpdateProfileResponse,
} from "@/types";
import axios, { AxiosError } from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { toast } from "sonner";

interface ServerCartItem {
  productId: string;
  quantity: number;
  // Add other properties as needed
}

interface ServerCart {
  items: ServerCartItem[];
  getCartItems: () => void;
  // Add other methods as needed
}

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  user: Profile | null;
  serverCart: ServerCart;
  handleRemove: (id: string) => void;
  handleUpdate: (type: string, id: string) => void;
  wishlist: WishlistItem[];
  totalAmount: number;
  openAuthModal: boolean;
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  userProfilePic: string;
  setUserProfilePic: React.Dispatch<React.SetStateAction<string>>;
  updateProfilePicture(data: FormData): Promise<UpdateProfileResponse>;
  pic: string;
  setPic: React.Dispatch<React.SetStateAction<string>>;
  getOneAddress(id: string): Promise<SingleAddress | undefined>;
  deleteAddress(id: string): Promise<{
    message: string;
    success: boolean;
    id: string;
  }>;
  updateDefaultAddress(id: string): Promise<DefaultResponse>;
  selectedAddress: AddressItem | undefined;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<AddressItem | undefined>
  >;
}

const GloblStoreContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{
  children: React.ReactNode;
  user: Profile | null;
}> = ({ children, user }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const cart = useCart(); // Assuming this function is defined somewhere
  const serverCart = useServerCart(); // Assuming this function is defined somewhere
  const wishlist = useWishlist(); // Assuming this function is defined somewhere

  const [userProfilePic, setUserProfilePic] = useState<string>(
    user?.profile.avatar?.url || "/images/user.png"
  );
  const [pic, setPic] = React.useState<string>("");
  const [selectedAddress, setSelectedAddress] = React.useState<AddressItem>();

  const ids = useMemo(
    () =>
      user
        ? serverCart.items.map((item) => item.productId)
        : cart.items.map((item) => item._id),
    [user, cart.items, serverCart.items]
  );

  useEffect(() => {
    if (user) {
      serverCart.getCartItems();
      if (cart.items.length > 0) {
        const productIds = cart.items.map((item) => item._id);
        addMultipleItems(productIds).then(() => {
          cart.removeAllItems();
        });
      }
      wishlist.getWishlistItems();
    } else {
      wishlist.epmtyWishlist();
    }
  }, [user, cart.items]);

  useEffect(() => {
    if (ids.length > 0) {
      getProductCarts(ids).then((res) => {
        setItems(
          res.items.map((item) => ({
            ...item,
            quantity: user
              ? serverCart.items.find(
                  (serverItem) => serverItem.productId === item._id
                )?.quantity || 0
              : cart.items.find((clientItem) => clientItem._id === item._id)
                  ?.quantity || 0,
          }))
        );
      });
    } // Implement your logic for fetching and updating items
  }, [user, ids]);

  const handleRemove = (id: string) => {
    if (user) {
      serverCart.removeItem(id);
    } else {
      cart.removeItem(id);
    }
    setItems(items.filter((item) => item._id !== id));
  };

  const handleUpdate = (type: string, id: string) => {
    if (user) {
      serverCart.handleUpdate(type, id);
    } else {
      if (type === "increase") {
        cart.qtyIncrease(id);
      } else {
        cart.qtyDecrease(id);
      }
    }
  };

  const calculateTotalAmount = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  async function updateProfilePicture(data: FormData) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}profile/update-pic`,
        data,
        {
          withCredentials: true,
        }
      );
      setUserProfilePic(res.data.pic_url);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  }

  async function getOneAddress(id: string) {
    try {
      const res = await axios.get<SingleAddress>(
        `${process.env.NEXT_PUBLIC_API_URL}profile/one-address?id=${id}`,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  }

  async function deleteAddress(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}profile/delete-address?id=${id}`,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  }

  async function updateDefaultAddress(id: string) {
    console.log(id);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}profile/update-default-address`,
        {
          id,
        },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  }

  const contextValue: CartContextType = {
    items,
    setItems,
    user,
    serverCart,
    handleRemove,
    handleUpdate,
    wishlist: wishlist.items,
    totalAmount: calculateTotalAmount(),
    openAuthModal,
    setOpenAuthModal,
    userProfilePic,
    setUserProfilePic,
    updateProfilePicture,
    pic,
    setPic,
    getOneAddress,
    deleteAddress,
    updateDefaultAddress,
    selectedAddress,
    setSelectedAddress,
  };

  return (
    <GloblStoreContext.Provider value={contextValue}>
      {children}
    </GloblStoreContext.Provider>
  );
};

export const useGlobalStoreContext = (): CartContextType => {
  const context = useContext(GloblStoreContext);
  if (context === undefined) {
    throw new Error("useGlobalStoreContext must be used within a CartProvider");
  }
  return context;
};
