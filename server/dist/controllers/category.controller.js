"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.createCategory = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const Category_1 = __importDefault(require("../models/Category"));
const helper_1 = require("../utils/helper");
exports.createCategory = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { name, isPublished } = req.body;
    if (!name) {
        return next(new helper_1.ErrorHandler("Please add name", 400));
    }
    const category = await Category_1.default.create({
        name,
        slug: name.toLowerCase().replace(/ /g, "-"),
        isPublished,
    });
    await category.save();
    res.status(201).json({
        success: true,
        message: "Added new Category!",
    });
});
exports.getCategories = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { q, isPublished, page = 1 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = 5;
    const skip = (pageNumber - 1) * limitNumber;
    if (!q && !isPublished) {
        const data = await Category_1.default.find({});
        return res.status(200).json({ data });
    }
    let data;
    if (q) {
        data = await Category_1.default.aggregate([
            {
                $search: {
                    index: "category-index",
                    autocomplete: {
                        query: q,
                        path: "name",
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 1,
                            maxExpansions: 256,
                        },
                    },
                },
            },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    isPublished: 1,
                },
            },
        ]);
    }
    else if (isPublished) {
        data = await Category_1.default.find({ isPublished: true })
            .skip(skip)
            .limit(limitNumber)
            .select("name isPublished");
    }
    else {
        data = await Category_1.default.find({}).skip(skip).limit(limitNumber);
    }
    return res.status(200).json({ data, limit: limitNumber });
});
