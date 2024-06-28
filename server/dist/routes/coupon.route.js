"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_controller_1 = require("../controllers/coupon.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/create-coupon", auth_middleware_1.isAdmin, coupon_controller_1.createCoupon);
router.get("/", auth_middleware_1.isAdmin, coupon_controller_1.getCoupons);
router.post("/verify-coupon", coupon_controller_1.verifyCouponCode);
exports.default = router;
