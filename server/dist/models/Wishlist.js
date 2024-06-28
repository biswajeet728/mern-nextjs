"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WishlistSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
        },
    ],
});
const Wishlist = mongoose_1.models.Wishlist || (0, mongoose_1.model)("Wishlist", WishlistSchema);
exports.default = Wishlist;
