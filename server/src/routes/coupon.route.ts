import {
  createCoupon,
  getCoupons,
  verifyCouponCode,
} from "@/controllers/coupon.controller";
import { isAdmin } from "@/middlewares/admin.middleware";
import express from "express";

const router = express.Router();

router.post("/create-coupon", isAdmin, createCoupon);
router.get("/", isAdmin, getCoupons);
router.post("/verify-coupon", verifyCouponCode);

export default router;
