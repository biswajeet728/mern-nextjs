"use client";

import React, { useEffect } from "react";
import WishListCard from "./shared/WishListCard";
import { useWishlist } from "@/store/use-wishlist";
import { Profile } from "@/types";

function Container({ user }: { user: Profile | null }) {
  const wishlist = useWishlist();

  React.useEffect(() => {
    if (user) {
      wishlist.getWishlistItems();
    }
  }, [user]);

  const handleRemove = (productId: string) => {
    wishlist.removeWishlistItem(productId);
  };

  return (
    <>
      {wishlist.items.length === 0 && (
        <div className="w-full h-[500px]">
          <div className="p-3 bg-blue-gray-800 rounded-md w-fit">
            <h2 className="text-base text-white">Your wishlist is empty</h2>
          </div>
        </div>
      )}

      {wishlist.items.map((item) => (
        <WishListCard key={item._id} item={item} handleRemove={handleRemove} />
      ))}
    </>
  );
}

export default Container;
