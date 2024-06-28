"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    orderItems: {
        type: [
            {
                productId: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
    },
    address: {
        type: Object,
        ref: "Address",
        required: true,
    },
    user: {
        type: new mongoose_1.Schema({
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
                required: false,
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
                    required: false,
                },
                public_id: {
                    type: String,
                    required: false,
                },
            },
        }),
        required: true,
    },
    discountTotal: {
        type: Number,
        required: false,
        default: 0,
    },
    finalTotal: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: types_1.OrderStatus,
        default: types_1.OrderStatus.RECEIVED,
    },
    paymentStatus: {
        type: String,
        enum: types_1.PaymentStatus,
        default: types_1.PaymentStatus.PENDING,
    },
    paymentId: {
        type: String,
        required: false,
        default: null,
    },
}, { timestamps: true });
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
