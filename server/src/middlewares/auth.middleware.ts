import { RequestHandler } from "express";
import { ErrorHandler, config } from "@/utils/helper";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import User from "@/models/User";

interface IUserPayload {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: string;
  verified: boolean;
  isSocialLogin?: boolean;
  googleId?: string;
  googlePicture?: string;
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

    console.log(payload, "payload");

    if (!payload) return next(new ErrorHandler("Unauthorized", 401));

    const user = await User.findById(payload.id);
    if (!user) return next(new ErrorHandler("Unauthorized Request |", 403));

    console.log(user, "user");

    if (user?.isSocialLogin) {
      req.user = {
        id: user._id as string,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        verified: user.verified,
        isSocialLogin: user.isSocialLogin,
        googleId: user.googleId,
        googlePicture: user.googlePicture,
        avatar: user.avatar,
        bio: user.bio,
      };

      return next();
    }

    req.user = {
      id: user._id as string,
      username: user.username,
      email: user.email,
      phone: user.phone,
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
