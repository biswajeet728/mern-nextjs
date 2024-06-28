"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrder = exports.getOrders = exports.instantCheckOut = exports.createOrder = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const Address_1 = __importDefault(require("../models/Address"));
const Order_1 = __importDefault(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../utils/helper");
const stripe_1 = require("./payment/stripe");
const Product_1 = __importDefault(require("../models/Product"));
const stripe_2 = __importDefault(require("stripe"));
const stripe = new stripe_2.default(helper_1.config.STRIPE_SECRET, {
    apiVersion: "2024-04-10",
    typescript: true,
});
exports.createOrder = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { orderItems, finalTotal, discountTotal, address } = req.body;
    console.log(req.body, "req.body");
    if (!orderItems || !finalTotal || !address) {
        return next(new helper_1.ErrorHandler("Please fill all the fields", 400));
    }
    const addressList = await Address_1.default.findOne({ user: req.user.id });
    if (!addressList) {
        return next(new helper_1.ErrorHandler("Address not found", 404));
    }
    const singleAddress = addressList.items.find((item) => item._id.toString() === address);
    if (!singleAddress) {
        return next(new helper_1.ErrorHandler("Address not found", 404));
    }
    orderItems.map((item) => {
        item.productId = item._id;
        delete item._id;
    });
    const order = new Order_1.default({
        orderItems,
        finalTotal,
        discountTotal,
        address: singleAddress,
        user: await User_1.default.findById(req.user.id).select("-password -role -verified -googleId -tokens -__v -createdAt -updatedAt"),
    });
    await order.save();
    const session = await (0, stripe_1.createSession)({
        amount: discountTotal ? discountTotal : finalTotal,
        currency: "INR",
        orderId: order._id.toString(),
        orderItems,
    });
    return res.status(201).json({
        paymentUrl: session.paymentUrl,
        order,
    });
});
exports.instantCheckOut = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { productId } = req.body;
    if (!productId) {
        return next(new helper_1.ErrorHandler("Please fill all the fields", 400));
    }
    const product = await Product_1.default.findById(productId);
    if (!product) {
        return next(new helper_1.ErrorHandler("Product not found", 404));
    }
    const user = await User_1.default.findById(req.user.id);
    if (!user) {
        return next(new helper_1.ErrorHandler("User not found", 404));
    }
    console.log(product, "product");
    const amount = product.salePrice
        ? product.salePrice * 1
        : product.price * 1;
    console.log(amount, "amount");
    const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
            userId: user._id.toString(),
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
        success_url: `${helper_1.config.CLIENT_URL}orders`,
        cancel_url: `${helper_1.config.CLIENT_URL}payement/failed`,
        customer: customer.id,
        shipping_address_collection: { allowed_countries: ["IN"] },
        phone_number_collection: { enabled: true },
        metadata: {
            type: "instant-checkout",
            productId: product._id.toString(),
            userId: user._id.toString(),
        },
    });
    return res.status(201).json({
        paymentUrl: session.url,
    });
});
exports.getOrders = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return next(new helper_1.ErrorHandler("User not found", 404));
    }
    const userOrders = await Order_1.default.find({ "user._id": req.user.id }).exec();
    console.log(userOrders, "userOrders");
    return res.status(200).json(userOrders);
});
exports.getOrder = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const order = await Order_1.default.findById(req.query.id);
    if (!order) {
        return next(new helper_1.ErrorHandler("Order not found", 404));
    }
    return res.status(200).json(order);
});
exports.updateOrderStatus = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const order = await Order_1.default.findById(req.query.id);
    if (!order) {
        return next(new helper_1.ErrorHandler("Order not found", 404));
    }
    order.orderStatus = req.body.status;
    await order.save();
    return res.status(200).json(order);
});
exports.deleteOrder = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const order = await Order_1.default.findById(req.query.id);
    if (!order) {
        return next(new helper_1.ErrorHandler("Order not found", 404));
    }
    await Order_1.default.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: "Order deleted successfully" });
});
