"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CouponSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    validUpto: {
        type: Date,
        required: false,
    },
    discount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
CouponSchema.index({ validUpto: 1 }, { expireAfterSeconds: 0 });
const Coupon = (0, mongoose_1.model)("Coupon", CouponSchema);
exports.default = Coupon;
