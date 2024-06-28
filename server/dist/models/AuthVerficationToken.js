"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 86400,
        default: Date.now(),
    },
});
TokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        const salt = await (0, bcrypt_1.genSalt)(10);
        this.token = await (0, bcrypt_1.hash)(this.token, salt);
    }
    next();
});
TokenSchema.methods.compareToken = async function (token) {
    return await (0, bcrypt_1.compare)(token, this.token);
};
const AuthVerificationTokenModel = (0, mongoose_1.model)("AuthVerificationToken", TokenSchema);
exports.default = AuthVerificationTokenModel;
