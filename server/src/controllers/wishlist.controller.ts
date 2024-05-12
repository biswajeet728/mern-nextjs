import { TryCatch } from "@/middlewares/error.middleware";
import Product from "@/models/Product";
import Wishlist from "@/models/Wishlist";
import { ErrorHandler } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import { ObjectId, isValidObjectId } from "mongoose";

export const createNewWishlist: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const { productId } = req.body;

    if (!isValidObjectId(productId)) {
      return next(new ErrorHandler("Invalid data", 400));
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      const newWishlist = await Wishlist.create({
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

    const isExist = wishlist.items.find(
      (item: any) => item.productId.toString() === productId
    );

    if (isExist) {
      return next(
        new ErrorHandler("Product already exists in the Wishlist", 400)
      );
    }

    await Wishlist.updateOne(
      { user: req.user.id },
      { $push: { items: { productId } } }
    );

    await wishlist.save();

    res.json({ success: true });
  }
);

export const getWishlist: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return next(new ErrorHandler("Wishlist not found", 404));
    }

    // extract the product data from the product modal
    const items = wishlist.items.map((item: any) => item.productId);

    const productData = await Product.find({ _id: { $in: items } });

    if (!productData) {
      return next(new ErrorHandler("Products not found", 404));
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
  }
);

export const removeItemFromWishlist: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const { productId } = req.query;

    if (!isValidObjectId(productId)) {
      return next(new ErrorHandler("Invalid product id", 400));
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (wishlist) {
      const itemIndex = wishlist.items.findIndex(
        (item: any) => item.productId.toString() === productId
      );

      if (itemIndex === -1) {
        return next(new ErrorHandler("Product not found in the Wishlist", 404));
      }

      wishlist.items.splice(itemIndex, 1);
    }

    await wishlist.save();

    res.json({ success: true });
  }
);
