import React from "react";
import CartTable from "./shared/CartTable";
import SummeryTab from "./shared/SummeryTab";
import { CartItem, Profile } from "@/types";
import { useCart } from "@/store/use-cart";
import { useServerCart } from "@/store/use-server-cart";
import { addMultipleItems, getProductCarts } from "@/services/cart";

function Container({ authStatus }: { authStatus: Profile | null }) {
  const cart = useCart();
  const serverCart = useServerCart();

  const addLocalstorageItemsToServer = async () => {
    const items = cart.items;
    const productIds = items.map((item) => item._id);
    await addMultipleItems(productIds);
    cart.removeAllItems();
  };

  const ids = React.useMemo(() => {
    if (authStatus) {
      if (cart.items.length && !serverCart.items.length) {
        addLocalstorageItemsToServer();
        return cart.removeAllItems();
      } else if (serverCart.items.length && !cart.items.length) {
        return serverCart.items.map((item) => item.productId);
      } else if (serverCart.items.length && cart.items.length) {
        // merge the items
        const clientIds = cart.items.map((item) => item._id);
        const serverIds = serverCart.items.map((item) => item.productId);
        return Array.from(new Set([...clientIds, ...serverIds]));
      }
    } else {
      return cart.items.map((item) => item._id);
    }
  }, [cart, serverCart, authStatus]);

  React.useEffect(() => {
    // When user logs in, check if there are items in local storage and add them to server cart
    if (authStatus && cart.items.length > 0) {
      addLocalstorageItemsToServer();
    }
  }, [authStatus, cart]);

  React.useEffect(() => {
    if (authStatus) {
      serverCart.getCartItems();
    }
  }, [authStatus]);

  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    if (ids?.length) {
      const fetchItems = async () => {
        const res = await getProductCarts(ids);
        setItems(
          res.items.map((item) => ({
            ...item,
            quantity: authStatus
              ? serverCart.items.find(
                  (serverItem) => serverItem.productId === item._id
                )?.quantity || 0
              : cart.items.find((clientItem) => clientItem._id === item._id)
                  ?.quantity || 0,
          }))
        );
      };
      fetchItems();
    }
  }, [cart, serverCart]);

  const handleRemove = (id: string) => {
    cart.removeItem(id);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <>
      <CartTable user={authStatus} items={items} handleRemove={handleRemove} />
      <SummeryTab user={authStatus} items={items} />
    </>
  );
}

export default Container;
