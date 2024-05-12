import express from "express";

import { isAuthenticated } from "@/middlewares/auth.middleware";
import {
  createNewWishlist,
  getWishlist,
  removeItemFromWishlist,
} from "@/controllers/wishlist.controller";

const router = express.Router();

router.post("/create", isAuthenticated, createNewWishlist);
router.get("/get-user-wishlist", isAuthenticated, getWishlist);
router.delete("/remove-wishlist-item", isAuthenticated, removeItemFromWishlist);

export default router;
