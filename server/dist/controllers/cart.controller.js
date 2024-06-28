"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.updateCartItem = exports.deleteCartItem = exports.getCartItems = exports.addMultipleItemsToCart = exports.createNewCart = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const Cart_1 = __importDefault(require("../models/Cart"));
const helper_1 = require("../utils/helper");
const mongoose_1 = require("mongoose");
exports.createNewCart = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!(0, mongoose_1.isValidObjectId)(productId) || isNaN(quantity)) {
        return next(new helper_1.ErrorHandler("Invalid product id", 400));
    }
    const cart = await Cart_1.default.findOne({ userId: req.user.id });
    if (!cart) {
        const newCart = await Cart_1.default.create({
            userId: req.user.id,
            items: [{ productId, quantity }],
        });
        return res
            .status(201)
            .json({ success: true, items: newCart, message: "Item added to Cart" });
    }
    const existItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existItem) {
        return next(new helper_1.ErrorHandler("Product already exists in the Cart", 400));
    }
    cart.items.push({ productId, quantity });
    await cart.save();
    res.json({ success: true });
});
exports.addMultipleItemsToCart = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { productIds } = req.body;
    if (!Array.isArray(productIds)) {
        return next(new helper_1.ErrorHandler("Invalid data", 400));
    }
    if (productIds.some((id) => !(0, mongoose_1.isValidObjectId)(id))) {
        return next(new helper_1.ErrorHandler("Invalid product id", 400));
    }
    const cart = await Cart_1.default.findOne({ userId: req.user.id });
    if (!cart) {
        const newCart = await Cart_1.default.create({
            userId: req.user.id,
            items: productIds.map((id) => ({ productId: id, quantity: 1 })),
        });
        return res.json({ success: true });
    }
    else {
        const existingItems = cart.items.map((item) => item.productId.toString());
        const newItems = productIds.filter((id) => !existingItems.includes(id));
        if (!newItems.length) {
            cart.items.forEach((item) => {
                if (productIds.includes(item.productId.toString())) {
                    item.quantity += 1;
                }
            });
        }
        const items = newItems.map((id) => ({ productId: id, quantity: 1 }));
        cart.items.push(...items);
        await cart.save();
        res.json({
            success: true,
            message: "Items added to Cart",
        });
    }
});
exports.getCartItems = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const cart = await Cart_1.default.findOne({ userId: req.user.id });
    if (!cart) {
        return res.json({ success: true, items: [] });
    }
    res.json({ success: true, items: cart.items });
});
exports.deleteCartItem = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { id } = req.query;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new helper_1.ErrorHandler("Invalid product id", 400));
    }
    const cart = await Cart_1.default.findOne({ userId: req.user.id });
    if (!cart) {
        return next(new helper_1.ErrorHandler("Cart not found", 404));
    }
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === id);
    if (itemIndex === -1) {
        return next(new helper_1.ErrorHandler("Product not found in the Cart", 404));
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.json({ success: true });
});
exports.updateCartItem = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { type, id } = req.query;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new helper_1.ErrorHandler("Invalid data", 400));
    }
    const cart = await Cart_1.default.findOne({ userId: req.user.id });
    if (!cart) {
        return next(new helper_1.ErrorHandler("Cart not found", 404));
    }
    const item = cart.items.find((item) => item.productId.toString() === id);
    if (!item) {
        return next(new helper_1.ErrorHandler("Product not found in the Cart", 404));
    }
    if (type === "increase") {
        item.quantity += 1;
    }
    else {
        if (item.quantity === 1) {
            return next(new helper_1.ErrorHandler("Quantity cannot be less than 1", 400));
        }
        item.quantity -= 1;
    }
    await cart.save();
    res.json({ success: true });
});
exports.clearCart = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const cart = await Cart_1.default.findOne({ userId: req.user.id });
    if (!cart) {
        return next(new helper_1.ErrorHandler("Cart not found", 404));
    }
    cart.items = [];
    await cart.save();
    res.json({ success: true });
});
