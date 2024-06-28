"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
const fileParser = async (req, res, next) => {
    const form = (0, formidable_1.default)();
    const [fields, files] = await form.parse(req);
    if (!req.body)
        req.body = {};
    for (let key in fields) {
        req.body[key] = fields[key][0];
    }
    if (!req.file)
        req.file = {};
    for (let key in files) {
        req.file = files[key][0];
    }
    next();
};
exports.default = fileParser;
