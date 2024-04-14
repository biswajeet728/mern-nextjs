import { NextFunction, Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  avatar?: { url: string; public_id: string };
  tokens: string[];
  bio?: string;
  isSocialLogin: boolean;
  verified: boolean;
  googleId: string;
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
