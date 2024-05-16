"use client";

import { addMultipleItems, getProductCarts } from "@/services/cart";
import { WishlistItem } from "@/services/wishlist";
import { useCart } from "@/store/use-cart";
import { useServerCart } from "@/store/use-server-cart";
import { useWishlist } from "@/store/use-wishlist";
import { CartItem, Profile } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

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
