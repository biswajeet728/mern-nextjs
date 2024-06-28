"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.createSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const helper_1 = require("../../utils/helper");
const stripe = new stripe_1.default(helper_1.config.STRIPE_SECRET, {
    apiVersion: "2024-04-10",
    typescript: true,
});
const createSession = async (options) => {
    const { orderItems, amount } = options;
    let lineItems;
    const originalTotal = orderItems.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const discountFactor = amount / originalTotal;
    lineItems = orderItems.map((product) => {
        const discountedPrice = Math.round(product.price * discountFactor * 100);
        return {
            price_data: {
                currency: "INR",
                unit_amount: discountedPrice,
                product_data: {
                    name: product.name,
                    images: product.images && product.images.length
                        ? [product.images[0].url]
                        : [],
                },
            },
            quantity: product.quantity,
        };
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${helper_1.config.CLIENT_URL}payment/success?orderId=${options.orderId}`,
        cancel_url: `${helper_1.config.CLIENT_URL}payement/failed?orderId=${options.orderId}`,
        metadata: {
            orderId: options.orderId,
        },
    });
    return {
        id: session.id,
        paymentUrl: session.url,
        paymentStatus: session.payment_status,
    };
};
exports.createSession = createSession;
const getSession = async (id) => {
    const session = await stripe.checkout.sessions.retrieve(id);
    console.log(JSON.stringify(session.customer_details, null, 2), "session");
    const verifiedSession = {
        id: session.id,
        paymentStatus: session.payment_status,
        metadata: session.metadata,
        customer_details: session.customer_details,
    };
    return verifiedSession;
};
exports.getSession = getSession;
