import {
  addMultipleItems,
  clearCart,
  createNewCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "@/services/cart";
import { AxiosError } from "axios";
import { toast } from "sonner"; // Assuming this is correct
import { create } from "zustand";

export interface ServerCartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: ServerCartItem[];
  addItem: (productId: string, quantity: number) => Promise<void>; // Change return type to Promise<void>
  getCartItems: () => Promise<void>; // Change return type to Promise<void>
  removeItem: (id: string) => void;
  handleUpdate: (type: string, id: string) => void;
  clearCart: () => void;
}

export const useServerCart = create<CartState>((set, get) => ({
  items: [],
  addItem: async (productId: string, quantity: number) => {
    try {
      const res = await createNewCart(productId, quantity);
      if (res) {
        set((state) => ({ items: [...state.items, { productId, quantity }] })); // Use function form of set
        toast.success("Item added to cart");
        return; // Return void
      }
      return; // Return void
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred"); // Provide a fallback message
      } else {
        toast.error("An error occurred");
      }
    }
  },
  getCartItems: async () => {
    // Implement this function
    try {
      const res = await getCartItems();
      if (res) {
        set({ items: res.items });
        return; // Return void
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred"); // Provide a fallback message
      } else {
        toast.error("An error occurred");
      }
    }
  },
  removeItem: async (id: string) => {
    try {
      const res = await deleteCartItem(id);
      if (res) {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== id),
        })); // Use function form of set
        toast.success("Item removed from cart");
        return; // Return void
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred"); // Provide a fallback message
      } else {
        toast.error("An error occurred");
      }
    }
  },
  handleUpdate: async (type: string, id: string) => {
    try {
      const res = await updateCartItem(type, id);
      if (res.success) {
        if (type === "increase") {
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })); // Use function form of set
        } else if (type === "decrease") {
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          })); // Use function form of set
        }
        return; // Return void
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred"); // Provide a fallback message
      } else {
        toast.error("An error occurred");
      }
    } // Implement this function
  },

  clearCart: async () => {
    const res = await clearCart();

    if (res) {
      set({ items: [] });
      return; // Return void
    }
  },
}));
