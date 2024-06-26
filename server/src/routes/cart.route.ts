import express from "express";

import { isAuthenticated } from "@/middlewares/auth.middleware";
import {
  addMultipleItemsToCart,
  clearCart,
  createNewCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "@/controllers/cart.controller";
import { getProductsByIds } from "@/controllers/other.controller";

const router = express.Router();

router.post("/create", isAuthenticated, createNewCart);
router.post("/create-multiple-cart", isAuthenticated, addMultipleItemsToCart);
router.get("/", isAuthenticated, getCartItems);
router.post("/get-cart-items", getProductsByIds);
router.post("/remove-cart-item", isAuthenticated, deleteCartItem);
router.put("/update-cart-item", isAuthenticated, updateCartItem);
router.put("/clear-cart", isAuthenticated, clearCart);

export default router;
