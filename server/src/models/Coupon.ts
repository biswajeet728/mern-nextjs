import { Coupon } from "@/types";
import { Schema, model } from "mongoose";

const CouponSchema = new Schema<Coupon>(
  {
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
  },
  {
    timestamps: true,
  }
);

CouponSchema.index({ validUpto: 1 }, { expireAfterSeconds: 0 });

const Coupon = model("Coupon", CouponSchema);
export default Coupon;
