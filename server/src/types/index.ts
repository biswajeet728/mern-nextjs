import { NextFunction, Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  avatar?: { url: string; public_id: string };
  tokens: string[];
  bio?: string;
  isSocialLogin: boolean;
  verified: boolean;
  googleId: string;
  googlePicture?: string;
  createdAt: string;
  updatedAt: string;
}
export interface IAuthVerificationType extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface UserProfile {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  role: string;
  avatar?: { url: string; public_id: string };
  bio?: string;
  isSocialLogin: boolean;
  verified: boolean;
}

export interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface IProductResponse {
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  description: string;
  images: { url: string; public_id: string }[];
  category: string;
  stock: number;
  isPublished: boolean;
  isBestSelling?: boolean;
  isFeatured?: boolean;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  slug: string;
  category: string;
  description: string;
  images: Image[];
  salePrice?: number;
  isBestSelling?: boolean;
  stock: number;
  isPublished: boolean;
  isFeatured?: boolean;
}

export type Image = {
  file: File;
};

export interface ICategory extends Document {
  name: string;
  slug: string;
  isPublished?: boolean;
}

export interface Coupon {
  id: string;
  title: string;
  code: string;
  validUpto: Date;
  discount: number;
  updatedAt: Date;
}

export interface IAddress extends Document {
  user: Schema.Types.ObjectId;
  items: [
    {
      fullName: string;
      address: string;
      city: string;
      state: string;
      country: string;
      zipCode: number;
      landmark?: string;
      phone: number;
      isDefault: boolean;
    }
  ];
}

export interface Coupon {
  id: string;
  title: string;
  code: string;
  validUpto: Date;
  discount: number;
  updatedAt: Date;
}

export enum OrderStatus {
  RECEIVED = "received",
  CONFIRMED = "confirmed",
  OUT_FOR_DELIVERY = "out_for_deliver",
  DELIVERED = "delivered",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export interface CartItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  images: [
    {
      url: string;
      public_id: string;
    }
  ];
  category: string;
  quantity: number;
}

export interface Order {
  orderItems: CartItem[];
  user: IUser;
  finalTotal: number;
  discountTotal?: number;
  address: object;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
}
