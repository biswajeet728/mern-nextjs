"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.deleteProfile = exports.defaultAddress = exports.getSingleAddress = exports.updateAddress = exports.deleteAddress = exports.getAddresses = exports.addNewAddress = exports.updateProfileData = exports.updateProfilePicture = void 0;
const error_middleware_1 = require("../middlewares/error.middleware");
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../utils/helper");
const cloudinary_1 = __importDefault(require("cloudinary"));
const Address_1 = __importDefault(require("../models/Address"));
const crypto_1 = __importDefault(require("crypto"));
const PasswordReset_1 = __importDefault(require("../models/PasswordReset"));
const features_1 = require("../utils/features");
const uploadImage = (filePath) => {
    return cloudinary_1.default.v2.uploader.upload(filePath, {
        width: 1280,
        height: 720,
        crop: "fill",
        folder: "sazzy/users/avatar",
    });
};
exports.updateProfilePicture = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const user = await User_1.default.findById(req.user.id);
    if (!user) {
        throw new helper_1.ErrorHandler("Unauthorized User", 404);
    }
    const file = req.file;
    console.log(file, "file");
    console.log("test");
    if (!file) {
        throw new helper_1.ErrorHandler("Please upload a picture", 400);
    }
    const isProfilePicExist = user?.avatar?.public_id;
    if (isProfilePicExist) {
        await cloudinary_1.default.v2.uploader.destroy(user?.avatar?.public_id, (err, result) => {
            if (err) {
                throw new helper_1.ErrorHandler("Something went wrong", 500);
            }
            console.log(result);
        });
        const { secure_url, public_id } = await uploadImage(file.filepath);
        user.avatar = { url: secure_url, public_id };
        await user?.save();
        res.status(200).json({
            success: true,
            message: "Profile picture updated",
            pic_url: secure_url,
        });
    }
    else {
        const { secure_url, public_id } = await uploadImage(file.filepath);
        user.avatar = { url: secure_url, public_id };
        await user?.save();
        res.status(200).json({
            success: true,
            message: "Profile picture Added",
            pic_url: secure_url,
        });
    }
});
exports.updateProfileData = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const user = await User_1.default.findById(req.user.id);
    if (!user) {
        throw new helper_1.ErrorHandler("Unauthorized User", 404);
    }
    const { username, phone, bio } = req.body;
    user.username = username;
    user.phone = phone;
    user.bio = bio;
    await user?.save();
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
    });
});
exports.addNewAddress = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { fullName, address, city, state, country, zipCode, phone, landmark, isDefault, } = req.body;
    if (!fullName || !address || !city || !state || !country || !zipCode) {
        return next(new helper_1.ErrorHandler("Please fill all the fields", 400));
    }
    const isAddressExist = await Address_1.default.findOne({ user: req.user.id });
    if (isAddressExist) {
        isAddressExist.items.push({
            fullName,
            address,
            city,
            state,
            country,
            zipCode,
            phone,
            landmark,
            isDefault,
        });
        await isAddressExist.save();
    }
    else {
        const newAddress = new Address_1.default({
            user: req.user.id,
            items: [
                {
                    fullName,
                    address,
                    city,
                    state,
                    country,
                    zipCode,
                    phone,
                    landmark,
                    isDefault,
                },
            ],
        });
        await newAddress.save();
    }
    res.status(200).json({
        success: true,
        message: "Address Saved !",
    });
});
exports.getAddresses = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const addresses = await Address_1.default.find({ user: req.user.id }).select("items");
    console.log(req.user.id, "req.user.id");
    console.log(addresses, "addresses");
    res.status(200).json({
        success: true,
        items: addresses.length ? addresses.map((address) => address.items)[0] : [],
    });
});
exports.deleteAddress = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const { id } = req.query;
    const address = await Address_1.default.findOne({ user: req.user.id });
    if (!address) {
        throw new helper_1.ErrorHandler("Address not found", 404);
    }
    const index = address.items.findIndex((item) => item._id == id);
    if (index > -1) {
        address.items.splice(index, 1);
        await address.save();
    }
    res.status(200).json({
        success: true,
        message: "Address deleted",
        id,
    });
});
exports.updateAddress = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const { id } = req.query;
    const { fullName, address, city, state, country, zipCode, phone, isDefault } = req.body;
    const addressDoc = await Address_1.default.findOne({ user: req.user.id });
    if (!addressDoc) {
        throw new helper_1.ErrorHandler("Address not found 11", 404);
    }
    const index = addressDoc.items.findIndex((item) => item._id == id);
    if (index > -1) {
        addressDoc.items[index] = {
            fullName,
            address,
            city,
            state,
            country,
            zipCode,
            phone,
            isDefault,
        };
        await addressDoc.save();
    }
    else {
        throw new helper_1.ErrorHandler("Address not found", 404);
    }
    res.status(200).json({
        success: true,
        message: "Address updated",
    });
});
exports.getSingleAddress = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const { id } = req.query;
    const address = await Address_1.default.findOne({ user: req.user.id });
    if (!address) {
        throw new helper_1.ErrorHandler("Address not found", 404);
    }
    const singleAddress = address.items.find((item) => item._id == id);
    res.status(200).json({
        success: true,
        item: singleAddress,
    });
});
exports.defaultAddress = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const { id } = req.body;
    const address = await Address_1.default.findOne({ user: req.user.id });
    if (!address) {
        throw new helper_1.ErrorHandler("Address not found", 404);
    }
    address.items.forEach((item) => {
        if (item._id == id) {
            item.isDefault = !item.isDefault;
        }
        else {
            item.isDefault = false;
        }
    });
    await address.save();
    res.status(200).json({
        success: true,
        message: "Default address set",
    });
});
exports.deleteProfile = (0, error_middleware_1.TryCatch)(async (req, res) => {
    await User_1.default.findByIdAndDelete(req.user.id);
    res.status(200).json({
        success: true,
        message: "Account deleted successfully",
    });
});
exports.forgotPassword = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const { email } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new helper_1.ErrorHandler("User not found", 404);
    }
    const resettoken = crypto_1.default.randomBytes(36).toString("hex");
    await PasswordReset_1.default.create({ owner: user._id, token: resettoken });
    const resetUrl = `${helper_1.config.CLIENT_URL}reset-password?token=${resettoken}&id=${user._id}`;
    await (0, features_1.sendEmail)(email, resetUrl, "forgot-password");
    res.status(200).json({
        success: true,
        message: "Reset password link sent to email",
    });
});
exports.resetPassword = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const { token, id } = req.params;
    const { password } = req.body;
    const user = await User_1.default.findById(id);
    if (!user) {
        throw new helper_1.ErrorHandler("Invalid user", 400);
    }
    const resetToken = await PasswordReset_1.default.findOne({ owner: id });
    if (!resetToken) {
        throw new helper_1.ErrorHandler("Invalid or expired reset token", 400);
    }
    if (!(await resetToken.compareToken(token))) {
        throw new helper_1.ErrorHandler("Invalid or expired reset token", 400);
    }
    user.password = password;
    await user.save();
    await PasswordReset_1.default.findByIdAndDelete(resetToken._id);
    res.status(200).json({
        success: true,
        message: "Password reset successfully",
    });
});
exports.updatePassword = (0, error_middleware_1.TryCatch)(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User_1.default.findById(req.user.id);
    if (!user) {
        throw new helper_1.ErrorHandler("Invalid user", 400);
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        throw new helper_1.ErrorHandler("Invalid password", 400);
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password updated successfully",
    });
});
