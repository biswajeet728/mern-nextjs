import { TryCatch } from "@/middlewares/error.middleware";
import Product from "@/models/Product";
import { ErrorHandler } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const getProductsByIds: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    let ids = req.body.ids;
    // If ids is not an array, convert it to an array with a single element
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    // Check if all the ids are valid
    const isValid = ids.every((id: string) => isValidObjectId(id));
    if (!isValid) {
      return next(new ErrorHandler("Invalid product id", 400));
    }

    // Fetch the products
    const products = await Product.find({ _id: { $in: ids } });

    if (!products) {
      return next(new ErrorHandler("Products not found", 404));
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
  }
);
