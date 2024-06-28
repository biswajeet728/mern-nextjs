"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const fileparser_middleware_1 = __importDefault(require("../middlewares/fileparser.middleware"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.isAdmin, fileparser_middleware_1.default, product_controller_1.createProduct);
router.get("/", product_controller_1.getProducts);
router.get("/:slug", product_controller_1.getSingleProduct);
exports.default = router;
