import express from "express";

import { isAuthenticated } from "@/middlewares/auth.middleware";
import { createOrder, instantCheckOut } from "@/controllers/order.controller";
const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/instant-checkout", isAuthenticated, instantCheckOut);

export default router;
