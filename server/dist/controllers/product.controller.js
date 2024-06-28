"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProduct = exports.getProducts = exports.createProduct = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const Product_1 = __importDefault(require("../models/Product"));
const helper_1 = require("../utils/helper");
const cloudinary_1 = __importDefault(require("cloudinary"));
const Category_1 = __importDefault(require("../models/Category"));
const uploadImage = (filePath) => {
    return cloudinary_1.default.v2.uploader.upload(filePath, {
        width: 1280,
        height: 720,
        crop: "fill",
        folder: "sazzy/products",
    });
};
exports.createProduct = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { name, price, salePrice, description, stock, category, isPublished, isBestSelling, isFeatured, } = req.body;
    if (!name || !price || !description || !stock || !category) {
        return next(new helper_1.ErrorHandler("Please fill in all required fields", 400));
    }
    const newcategory = await Category_1.default.findById(category);
    if (!newcategory) {
        return next(new helper_1.ErrorHandler("Category not found", 404));
    }
    const product = await Product_1.default.create({
        name,
        slug: name.toLowerCase().replace(/ /g, "-"),
        price,
        salePrice,
        description,
        stock,
        category: newcategory.name,
        isPublished: typeof isPublished === "string" && isPublished === "true"
            ? true
            : false,
        isBestSelling: typeof isBestSelling === "string" && isBestSelling === "true"
            ? true
            : false,
        isFeatured: typeof isFeatured === "string" && isFeatured === "true" ? true : false,
    });
    if (!req.files) {
        return next(new helper_1.ErrorHandler("Please upload an images", 400));
    }
    const { files } = req.files;
    const isMultipleImages = Array.isArray(files);
    if (isMultipleImages && files.length > 5) {
        return next(new helper_1.ErrorHandler("You can only upload a maximum of 5 images", 400));
    }
    if (isMultipleImages) {
        const uploadPromise = files.map((file) => uploadImage(file.filepath));
        const uploadResults = await Promise.all(uploadPromise);
        product.images = uploadResults.map(({ secure_url, public_id }) => ({
            url: secure_url,
            public_id: public_id,
        }));
    }
    else {
        if (files) {
            const { secure_url, public_id } = await uploadImage(files.filepath);
            product.images = [{ url: secure_url, public_id }];
        }
    }
    await product.save();
    res.status(201).json({ message: "Added new product!" });
});
exports.getProducts = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { q, category, isPublished, isBestSelling, isFeatured, price, page = 1, } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = 6;
    const skip = (pageNumber - 1) * limitNumber;
    let data;
    if (q) {
        data = await Product_1.default.aggregate([
            {
                $search: {
                    index: "products-index",
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: q,
                                    path: "name",
                                },
                            },
                            {
                                autocomplete: {
                                    query: q,
                                    path: "description",
                                },
                            },
                        ],
                        minimumShouldMatch: 1,
                    },
                },
            },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    images: 1,
                    price: 1,
                    salePrice: 1,
                    category: 1,
                    isPublished: 1,
                },
            },
        ]);
    }
    else if (category) {
        const getCategoryById = await Category_1.default.findById(category);
        data = await Product_1.default.aggregate([
            {
                $match: {
                    category: { $regex: new RegExp(getCategoryById?.name || "", "i") },
                },
            },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    images: 1,
                    price: 1,
                    salePrice: 1,
                    category: 1,
                    isPublished: 1,
                },
            },
        ]);
    }
    else if (isPublished) {
        data = await Product_1.default.find({ isPublished: true })
            .skip(skip)
            .limit(limitNumber)
            .select("_id name slug images price salePrice category isPublished");
    }
    else if (isBestSelling || isBestSelling === "true") {
        data = await Product_1.default.find({ isBestSelling: true })
            .skip(skip)
            .limit(limitNumber)
            .select("_id name slug images price salePrice category isPublished");
    }
    else if (isFeatured) {
        data = await Product_1.default.find({ isFeatured: true })
            .skip(skip)
            .limit(limitNumber)
            .select("_id name slug images price salePrice category isPublished");
    }
    else if (price) {
        data = await Product_1.default.find({
            price: {
                $gte: parseInt(price),
            },
        })
            .skip(skip)
            .limit(limitNumber)
            .select("_id name slug images price salePrice category isPublished");
    }
    else {
        data = await Product_1.default.find({}).skip(skip).limit(limitNumber);
    }
    return res.status(200).json({ products: data, limit: limitNumber });
});
exports.getSingleProduct = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { slug } = req.params;
    const product = await Product_1.default.findOne({}).where("slug").equals(slug);
    if (!product) {
        return next(new helper_1.ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({ product: product });
});
