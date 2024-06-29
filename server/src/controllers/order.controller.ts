import { TryCatch } from "@/middlewares/error.middleware";
import Address from "@/models/Address";
import Order from "@/models/Order";
import User from "@/models/User";
import { ErrorHandler, config } from "@/utils/helper";
import { RequestHandler } from "express";
import { createSession } from "./payment/stripe";
import Product from "@/models/Product";
import Stripe from "stripe";

const stripe = new Stripe(config.STRIPE_SECRET!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const createOrder: RequestHandler = TryCatch(async (req, res, next) => {
  const { orderItems, finalTotal, discountTotal, address } = req.body;

  console.log(req.body, "req.body");

  if (!orderItems || !finalTotal || !address) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const addressList = await Address.findOne({ user: req.user.id });
  if (!addressList) {
    return next(new ErrorHandler("Address not found", 404));
  }

  const singleAddress = addressList.items.find(
    (item: any) => item._id.toString() === address
  );

  if (!singleAddress) {
    return next(new ErrorHandler("Address not found", 404));
  }

  orderItems.map((item: any) => {
    item.productId = item._id;
    delete item._id;
  });

  const order = new Order({
    orderItems,
    finalTotal,
    discountTotal,
    address: singleAddress,
    user: await User.findById(req.user.id).select(
      "-password -role -verified -googleId -tokens -__v -createdAt -updatedAt"
    ),
  });

  await order.save();

  const session = await createSession({
    amount: discountTotal ? discountTotal : finalTotal,
    currency: "INR",
    orderId: order._id.toString(),
    orderItems, // Pass orderItems to the createSession function
  });

  return res.status(201).json({
    paymentUrl: session.paymentUrl,
    order,
  });
});

export const instantCheckOut: RequestHandler = TryCatch(
  async (req, res, next) => {
    const { productId } = req.body;

    if (!productId) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const product = await Product.findById(productId)!;

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    console.log(product, "product");

    const amount = product.salePrice
      ? product.salePrice * 1
      : product.price * 1;

    console.log(amount, "amount");

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user._id as string,
        type: "instant-checkout",
        product: JSON.stringify({
          id: product._id,
          name: product.name,
          price: product.salePrice ? product.salePrice : product.price,
          totalPrice: amount,
          thumbnail: product.images[0].url,
          qty: 1,
        }),
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            unit_amount: amount * 100,
            product_data: {
              name: product.name,
              images: [product.images[0].url],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${config.CLIENT_URL}orders`,
      cancel_url: `${config.CLIENT_URL}payement/failed`,
      customer: customer.id,
      shipping_address_collection: { allowed_countries: ["IN"] },
      phone_number_collection: { enabled: true },
      metadata: {
        type: "instant-checkout",
        productId: product._id.toString(),
        userId: user._id as string,
      },
    });

    return res.status(201).json({
      paymentUrl: session.url,
    });
  }
);

export const getOrders: RequestHandler = TryCatch(async (req, res, next) => {
  // Ensure req.user.id exists and is correctly set
  if (!req.user || !req.user.id) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Fetch orders where the user ID matches the authenticated user
  const userOrders = await Order.find({ "user._id": req.user.id }).exec();

  console.log(userOrders, "userOrders");

  return res.status(200).json(userOrders);
});

export const getOrder: RequestHandler = TryCatch(async (req, res, next) => {
  const order = await Order.findById(req.query.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  return res.status(200).json(order);
});

export const updateOrderStatus: RequestHandler = TryCatch(
  async (req, res, next) => {
    const order = await Order.findById(req.query.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    order.orderStatus = req.body.status;

    await order.save();

    return res.status(200).json(order);
  }
);

export const deleteOrder: RequestHandler = TryCatch(async (req, res, next) => {
  const order = await Order.findById(req.query.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await Order.findByIdAndDelete(req.query.id);

  return res.status(200).json({ message: "Order deleted successfully" });
});
