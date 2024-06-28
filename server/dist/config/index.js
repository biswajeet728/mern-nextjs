"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const helper_1 = require("../utils/helper");
const mongoose_1 = __importDefault(require("mongoose"));
const URI = helper_1.config.MONGO_URI;
const connectDB = async () => {
    try {
        if (helper_1.config.NODE_ENV === "development") {
            mongoose_1.default.set("debug", true);
        }
        const { connection } = await mongoose_1.default.connect(URI, {
            dbName: helper_1.config.MONGO_DB,
        });
        console.log(`Connected to MongoDB at ${connection.host}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
