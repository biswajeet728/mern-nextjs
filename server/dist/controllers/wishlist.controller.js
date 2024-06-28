"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemFromWishlist = exports.getWishlist = exports.createNewWishlist = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const Product_1 = __importDefault(require("../models/Product"));
const Wishlist_1 = __importDefault(require("../models/Wishlist"));
const helper_1 = require("../utils/helper");
const mongoose_1 = require("mongoose");
exports.createNewWishlist = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { productId } = req.body;
    if (!(0, mongoose_1.isValidObjectId)(productId)) {
        return next(new helper_1.ErrorHandler("Invalid data", 400));
    }
    const wishlist = await Wishlist_1.default.findOne({ user: req.user.id });
    if (!wishlist) {
        const newWishlist = await Wishlist_1.default.create({
            user: req.user.id,
            items: {
                productId,
            },
        });
        return res.status(201).json({
            success: true,
            items: newWishlist,
            message: "Item added to Wishlist",
        });
    }
    const isExist = wishlist.items.find((item) => item.productId.toString() === productId);
    if (isExist) {
        return next(new helper_1.ErrorHandler("Product already exists in the Wishlist", 400));
    }
    await Wishlist_1.default.updateOne({ user: req.user.id }, { $push: { items: { productId } } });
    await wishlist.save();
    res.json({ success: true });
});
exports.getWishlist = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const wishlist = await Wishlist_1.default.findOne({ user: req.user.id });
    if (!wishlist) {
        return res.json({ success: false, items: [] });
    }
    const items = wishlist.items.map((item) => item.productId);
    const productData = await Product_1.default.find({ _id: { $in: items } });
    if (!productData) {
        return next(new helper_1.ErrorHandler("Products not found", 404));
    }
    const extractedData = productData.map((product) => {
        const { _id, name, price, salePrice, images } = product;
        return {
            _id,
            name,
            price: salePrice != null ? salePrice : price,
            image: images[0].url,
        };
    });
    res.json({ success: true, items: extractedData });
});
exports.removeItemFromWishlist = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { productId } = req.query;
    if (!(0, mongoose_1.isValidObjectId)(productId)) {
        return next(new helper_1.ErrorHandler("Invalid product id", 400));
    }
    const wishlist = await Wishlist_1.default.findOne({ user: req.user.id });
    if (wishlist) {
        const itemIndex = wishlist.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return next(new helper_1.ErrorHandler("Product not found in the Wishlist", 404));
        }
        wishlist.items.splice(itemIndex, 1);
    }
    await wishlist.save();
    res.json({ success: true });
});
