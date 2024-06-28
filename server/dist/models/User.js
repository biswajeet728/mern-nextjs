"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: {
        type: Object,
        url: String,
        public_id: String,
    },
    tokens: [String],
    bio: {
        type: String,
        default: null,
    },
    isSocialLogin: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        default: null,
    },
    googlePicture: {
        type: String,
        default: null,
    },
});
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await (0, bcrypt_1.genSalt)(10);
        this.password = await (0, bcrypt_1.hash)(this.password, salt);
    }
    next();
});
UserSchema.methods.comparePassword = async function (password) {
    return await (0, bcrypt_1.compare)(password, this.password);
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
