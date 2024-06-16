import Stripe from "stripe";
import {
  CustomMetadata,
  PaymentOptions,
  VerifiedSession,
} from "./payement.types";
import { config } from "@/utils/helper";

const stripe = new Stripe(config.STRIPE_SECRET!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const createSession = async (options: PaymentOptions) => {
  const { orderItems, amount, isBuyNow } = options;
  let lineItems;

  // Calculate the total amount from orderItems
  const originalTotal = orderItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Calculate the discount factor
  const discountFactor = amount / originalTotal;
  lineItems = orderItems.map((product) => {
    const discountedPrice = Math.round(product.price * discountFactor * 100);
    return {
      price_data: {
        currency: "INR",
        unit_amount: discountedPrice,
        product_data: {
          name: product.name,
          images:
            product.images && product.images.length
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
    success_url: `${config.CLIENT_URL}payement/success?orderId=${options.orderId}`,
    cancel_url: `${config.CLIENT_URL}payement/failed?orderId=${options.orderId}`,
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

export const getSession = async (id: string) => {
  const session = await stripe.checkout.sessions.retrieve(id);

  console.log(JSON.stringify(session.customer_details, null, 2), "session");

  const verifiedSession: VerifiedSession = {
    id: session.id,
    paymentStatus: session.payment_status,
    metadata: session.metadata as unknown as CustomMetadata,
    customer_details: session.customer_details,
  };

  return verifiedSession;
};

// instant check out
// export const createSession = async (options: PaymentOptions) => {
//   const { orderItems, amount, isBuyNow, userId } = options;
//   let lineItems;

//   let session: Stripe.Response<Stripe.Checkout.Session>;

//   if (!isBuyNow) {
//     // Calculate the total amount from orderItems
//     const originalTotal = orderItems.reduce(
//       (sum, product) => sum + product.price * product.quantity,
//       0
//     );

//     // Calculate the discount factor
//     const discountFactor = amount / originalTotal;
//     lineItems = orderItems.map((product) => {
//       const discountedPrice = Math.round(product.price * discountFactor * 100);
//       return {
//         price_data: {
//           currency: "INR",
//           unit_amount: discountedPrice,
//           product_data: {
//             name: product.name,
//             images:
//               product.images && product.images.length
//                 ? [product.images[0].url]
//                 : [],
//           },
//         },
//         quantity: product.quantity,
//       };
//     });

//     session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${config.CLIENT_URL}payement/success?orderId=${options.orderId}`,
//       cancel_url: `${config.CLIENT_URL}payement/failed?orderId=${options.orderId}`,
//       metadata: {
//         orderId: options.orderId,
//       },
//     });
//   } else {
//     lineItems = [
//       {
//         price_data: {
//           currency: "INR",
//           unit_amount: amount * 100,
//           product_data: {
//             name: "Buy Now",
//           },
//         },
//         quantity: 1,
//       },
//     ];

//     const user = await User.findById(userId);

//     const customer = await stripe.customers.create({
//       email: user?.email,
//       metadata: {
//         userId: user?._id.toString(),
//         type: "instant-checkout",
//         product: JSON.stringify({
//           id: orderItems[0]._id,
//           name: orderItems[0].name,
//           price: orderItems[0].price,
//           totalPrice: amount,
//           thumbnail: orderItems[0].images[0].url,
//           qty: orderItems[0].quantity,
//         }),
//       },
//     });

//     session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${config.CLIENT_URL}payement/success`,
//       cancel_url: `${config.CLIENT_URL}payement/failed`,
//       customer: customer.id,
//     });
//   }

//   console.log(lineItems, "lineItems");

//   return {
//     id: session.id,
//     paymentUrl: session.url,
//     paymentStatus: session.payment_status,
//   };
// };
