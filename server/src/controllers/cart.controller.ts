import { TryCatch } from "@/middlewares/error.middleware";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { ErrorHandler } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const createNewCart: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const { productId, quantity } = req.body;

    if (!isValidObjectId(productId) || isNaN(quantity)) {
      return next(new ErrorHandler("Invalid product id", 400));
    }

    // find if the the cart already exists
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      // create a new cart
      const newCart = await Cart.create({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
      return res
        .status(201)
        .json({ success: true, items: newCart, message: "Item added to Cart" });
    }

    const existItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existItem) {
      return next(new ErrorHandler("Product already exists in the Cart", 400));
    }

    cart.items.push({ productId, quantity });

    await cart.save();

    res.json({ success: true });
  }
);

export const addMultipleItemsToCart: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const { productIds } = req.body;

    if (!Array.isArray(productIds)) {
      return next(new ErrorHandler("Invalid data", 400));
    }

    // Check if all productIds are valid
    if (productIds.some((id: string) => !isValidObjectId(id))) {
      return next(new ErrorHandler("Invalid product id", 400));
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      const newCart = await Cart.create({
        userId: req.user.id,
        items: productIds.map((id) => ({ productId: id, quantity: 1 })),
      });

      return res.json({ success: true });
    } else {
      const existingItems = cart.items.map((item) => item.productId.toString());
      const newItems = productIds.filter((id) => !existingItems.includes(id));

      if (!newItems.length) {
        return next(
          new ErrorHandler("Product already exists in the Cart", 400)
        );
      }

      const items = newItems.map((id) => ({ productId: id, quantity: 1 }));

      cart.items.push(...items);

      await cart.save();

      res.json({
        success: true,
        message: "Items added to Cart",
      });
    }
  }
);

export const getCartItems: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.json({ success: true, items: [] });
    }

    res.json({ success: true, items: cart.items });
  }
);

export const deleteCartItem: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const { id } = req.query;

    if (!isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid product id", 400));
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === id
    );

    if (itemIndex === -1) {
      return next(new ErrorHandler("Product not found in the Cart", 404));
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.json({ success: true });
  }
);

export const updateCartItem: RequestHandler = TryCatch(
  async (req: Request, res, next) => {
    const { type, id } = req.query;

    if (!isValidObjectId(id)) {
      return next(new ErrorHandler("Invalid data", 400));
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    const item = cart.items.find((item) => item.productId.toString() === id);

    if (!item) {
      return next(new ErrorHandler("Product not found in the Cart", 404));
    }

    if (type === "increase") {
      item.quantity += 1;
    } else {
      if (item.quantity === 1) {
        return next(new ErrorHandler("Quantity cannot be less than 1", 400));
      }
      item.quantity -= 1;
    }

    await cart.save();

    res.json({ success: true });
  }
);
