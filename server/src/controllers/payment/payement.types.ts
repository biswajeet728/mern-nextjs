import mongoose from "mongoose";
import Stripe from "stripe";

export interface PaymentOptions {
  amount: number;
  orderId: string;
  userId?: string;
  currency: string;
  orderItems: Array<{
    _id?: mongoose.Types.ObjectId;
    name: string;
    images: {
      url: string;
      public_id: string;
    }[];
    price: number;
    quantity: number;
  }>;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  isBuyNow?: boolean;
}

type GatewayPaymentStatus = "no_payment_required" | "paid" | "unpaid";

interface PaymentSession {
  id: string;
  paymentUrl: string;
  paymentStatus: GatewayPaymentStatus;
}
export interface CustomMetadata {
  orderId: string;
  type?: string;
  productId?: string;
  userId?: string;
}

export interface VerifiedSession {
  id: string;
  metadata: CustomMetadata;
  paymentStatus: GatewayPaymentStatus;
  customer_details?: Stripe.Checkout.Session.CustomerDetails | null;
}

export interface PaymentGW {
  createSession: (options: PaymentOptions) => Promise<PaymentSession>;
  getSession: (id: string) => Promise<VerifiedSession>;
}
