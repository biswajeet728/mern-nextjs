"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    items: [
        {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            zipCode: { type: Number, required: true },
            phone: { type: Number, required: true },
            landmark: { type: String, required: false },
            isDefault: { type: Boolean, default: false },
        },
    ],
});
const Address = (0, mongoose_1.model)("Address", AddressSchema);
exports.default = Address;
