"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const helper_1 = require("../utils/helper");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const isAuthenticated = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        const token = authToken?.split(" ")[1] || req.cookies.accessToken;
        if (!token)
            return next(new helper_1.ErrorHandler("Unauthorized", 401));
        console.log(authToken, "authToken");
        const payload = jsonwebtoken_1.default.verify(token, helper_1.config.JWT_SECRET);
        if (!payload)
            return next(new helper_1.ErrorHandler("Unauthorized", 401));
        const user = await User_1.default.findById(payload.id);
        if (!user)
            return next(new helper_1.ErrorHandler("Unauthorized Request |", 403));
        if (user?.isSocialLogin) {
            req.user = {
                id: user._id,
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
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            verified: user.verified,
            avatar: user.avatar,
            bio: user.bio,
        };
        next();
    }
    catch (error) {
        console.log(error, "error");
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return next(new helper_1.ErrorHandler("Unauthorized access!", 401));
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return next(new helper_1.ErrorHandler("Unauthorized access!", 401));
        }
        next(error);
    }
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        const token = authToken?.split(" ")[1] || req.cookies.accessToken;
        if (!token)
            return next(new helper_1.ErrorHandler("Unauthorized", 401));
        const decoded = jsonwebtoken_1.default.verify(token, helper_1.config.JWT_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user)
            return next(new helper_1.ErrorHandler("Unauthorized Request Established", 401));
        if (user.role !== "admin") {
            return next(new helper_1.ErrorHandler("Unauthorized access!", 401));
        }
        req.admin = {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar?.url,
            role: user.role,
        };
        next();
    }
    catch (error) {
        console.log(error, "error");
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return next(new helper_1.ErrorHandler("Unauthorized access!", 401));
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return next(new helper_1.ErrorHandler("Unauthorized access!", 401));
        }
        next(error);
    }
};
exports.isAdmin = isAdmin;
