import { Order, OrderStatus, PaymentStatus } from "@/types";
import { Schema, model } from "mongoose";

const OrderSchema = new Schema<Order>(
  {
    orderItems: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          images: {
            type: [
              {
                url: {
                  type: String,
                  required: true,
                },
                public_id: {
                  type: String,
                  required: true,
                },
              },
            ],
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    }, // body
    address: {
      type: Object,
      ref: "Address",
      required: true,
    }, // body
    user: {
      type: new Schema({
        username: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        bio: {
          type: String,
        },
        isSocialLogin: {
          type: Boolean,
          default: false,
        },
        googlePicture: {
          type: String,
        },
        avatar: {
          url: {
            type: String,
            required: true,
          },
          public_id: {
            type: String,
            required: true,
          },
        },
      }),
      required: true,
    },
    discountTotal: {
      type: Number,
      required: false,
      default: 0,
    }, // body
    finalTotal: {
      type: Number,
      required: true,
    }, // body
    orderStatus: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.RECEIVED,
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.PENDING,
    },
    paymentId: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);
export default Order;
