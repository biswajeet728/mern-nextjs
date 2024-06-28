"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.default.Router();
router.post("/create-order", auth_middleware_1.isAuthenticated, order_controller_1.createOrder);
router.post("/instant-checkout", auth_middleware_1.isAuthenticated, order_controller_1.instantCheckOut);
router.get("/get-orders", auth_middleware_1.isAuthenticated, order_controller_1.getOrders);
exports.default = router;
