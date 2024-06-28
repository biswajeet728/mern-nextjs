"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOauthHandler = exports.signOut = exports.getProfile = exports.requestNewAccessToken = exports.signIn = exports.verifyUser = exports.createNewUser = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../utils/helper");
const crypto_1 = __importDefault(require("crypto"));
const features_1 = require("../utils/features");
const AuthVerficationToken_1 = __importDefault(require("../models/AuthVerficationToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("../services/auth.service");
exports.createNewUser = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { username, email, password } = req.body;
    const isUserThere = await User_1.default.findOne({ email });
    if (isUserThere) {
        return next(new helper_1.ErrorHandler("User already exists", 400));
    }
    const user = await User_1.default.create({
        username,
        email,
        password,
    });
    const token = crypto_1.default.randomBytes(36).toString("hex");
    await AuthVerficationToken_1.default.create({ userId: user._id, token });
    console.log(token);
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET, {
        expiresIn: "5m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET);
    const link = `${helper_1.config.CLIENT_URL}verify?token=${token}&id=${user._id}`;
    await (0, features_1.sendEmail)(user.email, link);
    if (!user.tokens)
        user.tokens = [refreshToken];
    else
        user.tokens.push(refreshToken);
    await user.save();
    res.cookie("refreshToken", refreshToken, helper_1.cookieOptions);
    res.cookie("accessToken", accessToken, helper_1.cookieOptions);
    res.status(201).json({
        success: true,
        message: "Registration successful | Please verify your email",
    });
});
exports.verifyUser = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    console.log(req.body, "req.body");
    const { id, token } = req.body;
    const authToken = await AuthVerficationToken_1.default.findOne({ userId: id });
    if (!authToken) {
        return next(new helper_1.ErrorHandler("Invalid token", 400));
    }
    const isMatched = await authToken.compareToken(token);
    if (!isMatched)
        return next(new helper_1.ErrorHandler("Invalid token", 400));
    await User_1.default.findByIdAndUpdate(id, { verified: true });
    await AuthVerficationToken_1.default.findByIdAndDelete(authToken._id);
    res.json({
        success: true,
        message: "Thanks for joining us, your email is verified.",
    });
});
exports.signIn = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user)
        return next(new helper_1.ErrorHandler("Invalid credentials", 400));
    const isMatched = await user.comparePassword(password);
    if (!isMatched)
        return next(new helper_1.ErrorHandler("Invalid credentials", 400));
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET, {
        expiresIn: "45m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET);
    if (!user.tokens)
        user.tokens = [refreshToken];
    else
        user.tokens.push(refreshToken);
    await user.save();
    res.cookie("refreshToken", refreshToken, helper_1.cookieOptions);
    res.cookie("accessToken", accessToken, helper_1.cookieOptions);
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
exports.requestNewAccessToken = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    console.log(refreshToken, "refreshToken111");
    if (!refreshToken)
        return next(new helper_1.ErrorHandler("Acess Denied | Token Not Found", 400));
    const payload = jsonwebtoken_1.default.verify(refreshToken, helper_1.config.JWT_SECRET);
    if (!payload)
        return next(new helper_1.ErrorHandler("Unauthorized Request | Access Denied", 400));
    const user = await User_1.default.findOne({
        _id: payload.id,
        tokens: refreshToken,
    });
    console.log(user, "user");
    if (!user) {
        return next(new helper_1.ErrorHandler("Unauthorized Request", 400));
    }
    const newAccessToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET, {
        expiresIn: "5m",
    });
    const newRefreshToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET);
    const filterTokens = user.tokens.filter((token) => token !== refreshToken);
    console.log(filterTokens, "filterTokens");
    user.tokens = filterTokens;
    user.tokens.push(newRefreshToken);
    await user.save();
    res.cookie("accessToken", newAccessToken, helper_1.cookieOptions);
    res.cookie("refreshToken", newRefreshToken, helper_1.cookieOptions);
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
});
exports.getProfile = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    res.json({
        profile: req.user,
    });
});
exports.signOut = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    console.log(refreshToken, "refreshToken");
    if (!refreshToken)
        return next(new helper_1.ErrorHandler("Acess Denied | Token Not Found", 400));
    const payload = jsonwebtoken_1.default.verify(refreshToken, helper_1.config.JWT_SECRET);
    console.log(payload, "payload");
    if (!payload)
        return next(new helper_1.ErrorHandler("Unauthorized Request | Access Denied", 400));
    const user = await User_1.default.findOne({
        _id: payload.id,
        tokens: refreshToken,
    });
    console.log(user, "user11111");
    if (!user) {
        return next(new helper_1.ErrorHandler("Unauthorized Request111", 400));
    }
    const filterTokens = user.tokens.filter((token) => token !== refreshToken);
    user.tokens = filterTokens;
    await user.save();
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ success: true, message: "Logged out successfully" });
});
exports.googleOauthHandler = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const code = req.query.code;
    const { id_token, access_token } = await (0, auth_service_1.getGoogleAccessTokens)({ code });
    const googleUser = await (0, auth_service_1.getGoogleUser)({ id_token, access_token });
    if (!googleUser) {
        return next(new helper_1.ErrorHandler("Google user not found", 400));
    }
    let user;
    if (googleUser.email) {
        user = await User_1.default.findOne({ email: googleUser.email });
    }
    if (!user) {
        user = await User_1.default.create({
            username: googleUser.name,
            email: googleUser.email,
            isSocialLogin: true,
            verified: googleUser.verified_email,
            googleId: googleUser.id,
            googlePicture: googleUser.picture,
        });
    }
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET, {
        expiresIn: "5m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, helper_1.config.JWT_SECRET);
    if (!user.tokens)
        user.tokens = [refreshToken];
    else
        user.tokens.push(refreshToken);
    await user.save();
    res.cookie("refreshToken", refreshToken, helper_1.cookieOptions);
    res.cookie("accessToken", accessToken, helper_1.cookieOptions);
    res.redirect(helper_1.config.CLIENT_URL);
});
