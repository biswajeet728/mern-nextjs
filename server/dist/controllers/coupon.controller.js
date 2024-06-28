"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCouponCode = exports.getCoupons = exports.createCoupon = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const Coupon_1 = __importDefault(require("../models/Coupon"));
const helper_1 = require("../utils/helper");
exports.createCoupon = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { title, code, validUpto, discount } = req.body;
    const coupon = new Coupon_1.default({
        title,
        code,
        validUpto,
        discount,
    });
    await coupon.save();
    res.json({ success: true, coupon });
});
exports.getCoupons = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const coupons = await Coupon_1.default.find().select("-__v -createdAt -updatedAt");
    res.json({ success: true, coupons });
});
exports.verifyCouponCode = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { code } = req.body;
    const coupon = await Coupon_1.default.findOne({ code });
    if (!coupon) {
        return next(new helper_1.ErrorHandler("Coupon not found", 404));
    }
    const currentDate = new Date();
    const couponDate = new Date(coupon.validUpto);
    if (currentDate <= couponDate) {
        return res.json({ valid: true, discount: coupon.discount });
    }
    return res.json({ valid: false, discount: 0 });
});
