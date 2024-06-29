import { RequestHandler } from "express";
import { ErrorHandler, config } from "@/utils/helper";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import User from "@/models/User";

interface IAdminPayload {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      admin: IAdminPayload;
    }
  }
}

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1] || req.cookies.accessToken;

    if (!token) return next(new ErrorHandler("Unauthorized", 401));

    const decoded = jwt.verify(token, config.JWT_SECRET) as IAdminPayload;

    const user = await User.findById(decoded.id);

    if (!user)
      return next(new ErrorHandler("Unauthorized Request Established", 401));

    if (user.role !== "admin") {
      return next(new ErrorHandler("Unauthorized access!", 401));
    }

    req.admin = {
      id: user._id as string,
      username: user.username,
      email: user.email,
      avatar: user.avatar?.url,
      role: user.role,
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
