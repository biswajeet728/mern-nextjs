import { TryCatch } from "@/middlewares/error.middleware";
import User from "@/models/User";
import { IUser } from "@/types";
import { ErrorHandler, config } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import crypto from "crypto";
import { sendEmail } from "@/utils/features";
import AuthVerificationTokenModel from "@/models/AuthVerficationToken";
import jwt from "jsonwebtoken";

export const createNewUser: RequestHandler = TryCatch(
  async (req: Request<{}, {}, IUser>, res, next) => {
    const { username, email, password } = req.body;

    const isUserThere = await User.findOne({ email });

    if (isUserThere) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = crypto.randomBytes(36).toString("hex");
    await AuthVerificationTokenModel.create({ userId: user._id, token });

    console.log(token);

    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET);

    const link = `${config.CLIENT_URL}verify?token=${token}&id=${user._id}`;

    await sendEmail(user.email, link);

    if (!user.tokens) user.tokens = [refreshToken];
    else user.tokens.push(refreshToken);

    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful | Please verify your email",
    });
  }
);

export const verifyUser: RequestHandler = TryCatch(async (req, res, next) => {
  console.log(req.body, "req.body");
  const { id, token } = req.body;

  const authToken = await AuthVerificationTokenModel.findOne({ userId: id });
  if (!authToken) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  const isMatched = await authToken.compareToken(token);
  if (!isMatched) return next(new ErrorHandler("Invalid token", 400));

  await User.findByIdAndUpdate(id, { verified: true });

  await AuthVerificationTokenModel.findByIdAndDelete(authToken._id);

  res.json({
    success: true,
    message: "Thanks for joining us, your email is verified.",
  });
});

export const signIn: RequestHandler = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("Invalid credentials", 400));

  const isMatched = await user.comparePassword(password);
  if (!isMatched) return next(new ErrorHandler("Invalid credentials", 400));

  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "5m",
  });

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET);

  if (!user.tokens) user.tokens = [refreshToken];
  else user.tokens.push(refreshToken);

  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });

  res.json({
    success: true,
    profile: {
      id: user._id,
      email: user.email,
      name: user.username,
      verified: user.verified,
      avatar: user.avatar?.url,
      accessToken: accessToken,
    },
    accessToken,
    refreshToken,
  });
});

export const requestNewAccessToken: RequestHandler = TryCatch(
  async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    console.log(refreshToken, "refreshToken111");

    if (!refreshToken)
      return next(new ErrorHandler("Acess Denied | Token Not Found", 400));

    const payload = jwt.verify(refreshToken, config.JWT_SECRET) as {
      id: string;
    };

    console.log(payload, "payload");

    if (!payload)
      return next(
        new ErrorHandler("Unauthorized Request | Access Denied", 400)
      );

    const user = await User.findOne({
      _id: payload.id,
      tokens: refreshToken,
    });
    console.log(user, "user");

    if (!user) {
      // await User.findByIdAndUpdate(payload.id, { tokens: [] });
      return next(new ErrorHandler("Unauthorized Request", 400));
    }

    const newAccessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "5m",
    });
    const newRefreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET);

    const filterTokens = user.tokens.filter((token) => token !== refreshToken);
    console.log(filterTokens, "filterTokens");
    user.tokens = filterTokens;
    user.tokens.push(newRefreshToken);

    await user.save();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    res.json({
      success: true,
      profile: {
        id: user._id,
        email: user.email,
        name: user.username,
        verified: user.verified,
        avatar: user.avatar?.url,
      },
      tokens: {
        access: newAccessToken,
        refresh: newRefreshToken,
      },
    });
  }
);

export const getProfile: RequestHandler = TryCatch(async (req, res, next) => {
  res.json({
    profile: req.user,
  });
});

export const signOut: RequestHandler = TryCatch(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  console.log(refreshToken, "refreshToken");

  if (!refreshToken)
    return next(new ErrorHandler("Acess Denied | Token Not Found", 400));

  const payload = jwt.verify(refreshToken, config.JWT_SECRET) as {
    id: string;
  };

  console.log(payload, "payload");

  if (!payload)
    return next(new ErrorHandler("Unauthorized Request | Access Denied", 400));

  const user = await User.findOne({
    _id: payload.id,
    tokens: refreshToken,
  });

  console.log(user, "user11111");

  if (!user) {
    return next(new ErrorHandler("Unauthorized Request111", 400));
  }

  const filterTokens = user.tokens.filter((token) => token !== refreshToken);
  user.tokens = filterTokens;

  await user.save();

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  res.json({ success: true, message: "Logged out successfully" });
});
