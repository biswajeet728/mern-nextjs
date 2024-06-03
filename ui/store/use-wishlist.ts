import {
  WishlistItem,
  createNewWishlist,
  fetchWishlist,
  removeWishlistItem,
} from "@/services/wishlist";
import { AxiosError } from "axios";
import { toast } from "sonner"; // Assuming this is correct
import { create } from "zustand";

export interface WishlistState {
  items: WishlistItem[];
  addItem: (productId: string) => Promise<void>; // Change return type to Promise<void>
  getWishlistItems: () => Promise<void>; // Add this function
  removeWishlistItem: (productId: string) => Promise<void>; // Add this function
  epmtyWishlist: () => void; // Add this function
}

export const useWishlist = create<WishlistState>((set, get) => ({
  items: [],
  addItem: async (productId: string) => {
    try {
      const res = await createNewWishlist(productId);
      if (res) {
        set((state) => ({
          items: [...state.items, res], // Add the new item to the state
        })); // Update the state
        toast.success("Item added to wishlist"); // Provide a success message
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
  getWishlistItems: async () => {
    try {
      const res = await fetchWishlist();
      set({ items: res });
      return; // Return void
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred"); // Provide a fallback message
      } else {
        toast.error("An error occurred");
      }
    }
  },
  removeWishlistItem: async (productId: string) => {
    try {
      // Assuming this is the correct function
      const res = await removeWishlistItem(productId);
      if (res) {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId), // Remove the item from the state
        })); // Update the state
        toast.success("Item removed from wishlist"); // Provide a success message
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
  epmtyWishlist: () => {
    set({ items: [] }); // Empty the wishlist
  },
}));
