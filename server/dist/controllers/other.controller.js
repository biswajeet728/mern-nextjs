"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByIds = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const Product_1 = __importDefault(require("../models/Product"));
const helper_1 = require("../utils/helper");
const mongoose_1 = require("mongoose");
exports.getProductsByIds = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    let ids = req.body.ids;
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    const isValid = ids.every((id) => (0, mongoose_1.isValidObjectId)(id));
    if (!isValid) {
        return next(new helper_1.ErrorHandler("Invalid product id", 400));
    }
    const products = await Product_1.default.find({ _id: { $in: ids } });
    if (!products) {
        return next(new helper_1.ErrorHandler("Products not found", 404));
    }
    const extractedData = products.map((product) => {
        const { _id, name, price, salePrice, images, category } = product;
        return {
            _id,
            name,
            price: salePrice != null ? salePrice : price,
            images,
            category,
        };
    });
    res.json({ success: true, items: extractedData });
});
