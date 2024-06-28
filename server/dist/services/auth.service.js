"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleUser = exports.getGoogleAccessTokens = void 0;
const helper_1 = require("../utils/helper");
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
async function getGoogleAccessTokens({ code, }) {
    const url = `https://oauth2.googleapis.com/token`;
    const values = {
        code,
        client_id: helper_1.config.GOOGLE_CLIENT_ID,
        client_secret: helper_1.config.GOOGLE_CLIENT_SECRET,
        redirect_uri: helper_1.config.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
    };
    try {
        const res = await axios_1.default.post(url, qs_1.default.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return res.data;
    }
    catch (error) {
        console.log("token error", JSON.stringify(error, null, 2));
        throw new helper_1.ErrorHandler("Google token error", 500);
    }
}
exports.getGoogleAccessTokens = getGoogleAccessTokens;
async function getGoogleUser({ id_token, access_token, }) {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
    try {
        const res = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return res.data;
    }
    catch (error) {
        console.log("user error", JSON.stringify(error, null, 2));
        throw new helper_1.ErrorHandler("Google user error", 500);
    }
}
exports.getGoogleUser = getGoogleUser;
