import { CartId } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartState {
  items: CartId[];
  addItem: (item: CartId) => void;
  removeItem: (id: string) => void;
  qtyIncrease: (id: string) => void;
  qtyDecrease: (id: string) => void;
  removeAllItems: () => void;
}

export const useCart = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (item: CartId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i._id === item._id);
        if (existingItem) {
          return toast.error("Item already in cart");
        }

        set({ items: [...get().items, item] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((i) => i._id !== id) });
        toast.success("Item removed from cart");
      },
      qtyIncrease: (id: string) => {
        const currentItems = get().items;
        const item = currentItems.find((i) => i._id === id);
        if (item) {
          item.quantity += 1;
          set({ items: [...currentItems] });
        }
      },
      qtyDecrease: (id: string) => {
        const currentItems = get().items;
        const item = currentItems.find((i) => i._id === id);
        if (item) {
          if (item.quantity === 1) {
            return;
          }
          item.quantity -= 1;
          set({ items: [...currentItems] });
        }
      },
      removeAllItems: () => {
        set({ items: [] });
        // toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
