import express from "express";

import { isAuthenticated } from "@/middlewares/auth.middleware";
import {
  createOrder,
  getOrders,
  instantCheckOut,
} from "@/controllers/order.controller";
const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/instant-checkout", isAuthenticated, instantCheckOut);
router.get("/get-orders", isAuthenticated, getOrders);

export default router;
