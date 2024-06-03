import { RequestHandler } from "express";
import { TryCatch } from "./error.middleware";
import { ErrorHandler, config } from "@/utils/helper";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import User from "@/models/User";

interface IUserPayload {
  id: string;
  username: string;
  email: string;
  role: string;
  verified: boolean;
  avatar?: object;
  bio?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUserPayload;
    }
  }
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1] || req.cookies.accessToken;

    if (!token) return next(new ErrorHandler("Unauthorized", 401));

    console.log(authToken, "authToken");

    const payload = jwt.verify(token, config.JWT_SECRET) as { id: string };

    if (!payload) return next(new ErrorHandler("Unauthorized", 401));

    const user = await User.findById(payload.id);
    if (!user) return next(new ErrorHandler("Unauthorized Request |", 403));

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      verified: user.verified,
      avatar: user.avatar,
      bio: user.bio,
    };

    next();
  } catch (error) {
    console.log(error, "error");
    if (error instanceof TokenExpiredError) {
      return next(new ErrorHandler("Unauthorized access!", 401));
    }

    if (error instanceof JsonWebTokenError) {
      return next(new ErrorHandler("Unauthorized access!", 401));
    }

    next(error);
  }
};
