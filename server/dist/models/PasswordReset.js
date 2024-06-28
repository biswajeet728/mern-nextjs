"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const PasswordResetSchema = new mongoose_1.Schema({
    owner: {
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
        expires: 3600,
        default: Date.now(),
    },
});
PasswordResetSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        const salt = await (0, bcrypt_1.genSalt)(10);
        this.token = await (0, bcrypt_1.hash)(this.token, salt);
    }
    next();
});
PasswordResetSchema.methods.compareToken = async function (token) {
    return await (0, bcrypt_1.compare)(token, this.token);
};
PasswordResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
const PasswordReset = (0, mongoose_1.model)("PasswordReset", PasswordResetSchema);
exports.default = PasswordReset;
