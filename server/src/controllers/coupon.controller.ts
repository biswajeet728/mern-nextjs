import { TryCatch } from "@/middlewares/error.middleware";
import Coupon from "@/models/Coupon";
import { ErrorHandler } from "@/utils/helper";
import { RequestHandler } from "express";

export const createCoupon: RequestHandler = TryCatch(async (req, res, next) => {
  const { title, code, validUpto, discount } = req.body;

  const coupon = new Coupon({
    title,
    code,
    validUpto,
    discount,
  });

  await coupon.save();
  res.json({ success: true, coupon });
});

export const getCoupons: RequestHandler = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find().select("-__v -createdAt -updatedAt");
  res.json({ success: true, coupons });
});

export const verifyCouponCode: RequestHandler = TryCatch(
  async (req, res, next) => {
    const { code } = req.body;

    // todo: add service layer with dependency injection.
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    // validate expiry
    const currentDate = new Date();
    const couponDate = new Date(coupon.validUpto);

    if (currentDate <= couponDate) {
      return res.json({ valid: true, discount: coupon.discount });
    }

    return res.json({ valid: false, discount: 0 });
  }
);
