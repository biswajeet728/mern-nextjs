"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = void 0;
const error_middleware_1 = require("../../middlewares/error.middleware");
const stripe_1 = require("./stripe");
const Order_1 = __importDefault(require("../../models/Order"));
const types_1 = require("../../types");
const Product_1 = __importDefault(require("../../models/Product"));
const helper_1 = require("../../utils/helper");
const User_1 = __importDefault(require("../../models/User"));
const Cart_1 = __importDefault(require("../../models/Cart"));
exports.handleWebhook = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const webhookBody = req.body;
    if (webhookBody.type === "checkout.session.completed") {
        const session = webhookBody.data.object;
        const verifiedSession = await (0, stripe_1.getSession)(webhookBody.data.object.id);
        const isPaymentSuccess = verifiedSession.paymentStatus === "paid";
        const paymentIntentId = session.payment_intent;
        const isInstantCheckout = verifiedSession.metadata.type === "instant-checkout";
        if (isInstantCheckout) {
            console.log("Instant Checkout");
            const id = verifiedSession.metadata.productId;
            const user_id = verifiedSession.metadata.userId;
            const product = await Product_1.default.findById(id);
            if (!product) {
                return next(new helper_1.ErrorHandler("Product not found", 404));
            }
            const user = await User_1.default.findById(user_id);
            await Order_1.default.create({
                orderItems: [
                    {
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        quantity: 1,
                        images: product.images,
                    },
                ],
                address: {
                    fullName: verifiedSession.customer_details.name,
                    address: verifiedSession.customer_details.address.line1,
                    city: verifiedSession.customer_details.address.city,
                    state: verifiedSession.customer_details.address.state,
                    country: verifiedSession.customer_details.address.country,
                    zipCode: verifiedSession.customer_details.address.postal_code,
                    phone: verifiedSession.customer_details.phone,
                    isDefault: true,
                    landMark: "N/A",
                },
                user: user,
                finalTotal: product.price,
                discountTotal: 0,
                orderStatus: types_1.OrderStatus.RECEIVED,
                paymentStatus: isPaymentSuccess
                    ? types_1.PaymentStatus.PAID
                    : types_1.PaymentStatus.FAILED,
                paymentId: paymentIntentId,
            });
            return res.status(200).json({ received: true });
        }
        else {
            const updatedOrder = await Order_1.default.findOneAndUpdate({
                _id: verifiedSession.metadata.orderId,
            }, {
                paymentStatus: isPaymentSuccess
                    ? types_1.PaymentStatus.PAID
                    : types_1.PaymentStatus.FAILED,
                paymentId: paymentIntentId,
            }, { new: true });
            if (isPaymentSuccess) {
                const user = await User_1.default.findById(updatedOrder?.user);
                if (!user) {
                    return next(new helper_1.ErrorHandler("User not found", 404));
                }
                console.log(user, "user");
                await Cart_1.default.findOneAndUpdate({ userId: user?._id }, {
                    $pull: {
                        items: { productId: updatedOrder?.orderItems[0].productId },
                    },
                }, { new: true });
            }
            return res.status(200).json(updatedOrder);
        }
    }
    return res.status(200).json({ received: true });
});
