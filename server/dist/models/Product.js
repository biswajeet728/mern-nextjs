"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
    salePrice: {
        type: Number,
        required: false,
    },
    isBestSelling: {
        type: Boolean,
        default: false,
    },
    stock: {
        type: Number,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
});
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
