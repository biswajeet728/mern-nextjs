import { TryCatch } from "@/middlewares/error.middleware";
import { RequestHandler } from "express";
import { getSession } from "./stripe";
import Order from "@/models/Order";
import { OrderStatus, PaymentStatus } from "@/types";
import Stripe from "stripe";
import Product from "@/models/Product";
import { ErrorHandler, config } from "@/utils/helper";
import User from "@/models/User";

export const handleWebhook: RequestHandler = TryCatch(
  async (req, res, next) => {
    const webhookBody = req.body;

    if (webhookBody.type === "checkout.session.completed") {
      const session = webhookBody.data.object as Stripe.Checkout.Session;
      const verifiedSession = await getSession(webhookBody.data.object.id);

      const isPaymentSuccess = verifiedSession.paymentStatus === "paid";
      const paymentIntentId = session.payment_intent;

      const isInstantCheckout =
        verifiedSession.metadata.type === "instant-checkout";

      if (isInstantCheckout) {
        console.log("Instant Checkout");
        // create order
        const id = verifiedSession.metadata.productId;
        const user_id = verifiedSession.metadata.userId;

        const product = await Product.findById(id);

        if (!product) {
          return next(new ErrorHandler("Product not found", 404));
        }

        const user = await User.findById(user_id);

        await Order.create({
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
            fullName: verifiedSession.customer_details!.name!,
            address: verifiedSession.customer_details!.address!.line1!,
            city: verifiedSession.customer_details!.address!.city!,
            state: verifiedSession.customer_details!.address!.state!,
            country: verifiedSession.customer_details!.address!.country!,
            zipCode: verifiedSession.customer_details!.address!.postal_code!,
            phone: verifiedSession.customer_details!.phone!,
            isDefault: true,
            landMark: "N/A",
          },
          user: user!,
          finalTotal: product.price,
          discountTotal: 0,
          orderStatus: OrderStatus.RECEIVED,
          paymentStatus: isPaymentSuccess
            ? PaymentStatus.PAID
            : PaymentStatus.FAILED,
          paymentId: paymentIntentId,
        });

        return res.status(200).json({ received: true });
      } else {
        const updatedOrder = await Order.findOneAndUpdate(
          {
            _id: verifiedSession.metadata.orderId,
          },
          {
            paymentStatus: isPaymentSuccess
              ? PaymentStatus.PAID
              : PaymentStatus.FAILED,
            paymentId: paymentIntentId,
          },
          { new: true }
        );

        return res.status(200).json(updatedOrder);
      }
    }

    return res.status(200).json({ received: true });
  }
);
