"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const cart_controller_1 = require("../controllers/cart.controller");
const other_controller_1 = require("../controllers/other.controller");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.isAuthenticated, cart_controller_1.createNewCart);
router.post("/create-multiple-cart", auth_middleware_1.isAuthenticated, cart_controller_1.addMultipleItemsToCart);
router.get("/", auth_middleware_1.isAuthenticated, cart_controller_1.getCartItems);
router.post("/get-cart-items", other_controller_1.getProductsByIds);
router.post("/remove-cart-item", auth_middleware_1.isAuthenticated, cart_controller_1.deleteCartItem);
router.put("/update-cart-item", auth_middleware_1.isAuthenticated, cart_controller_1.updateCartItem);
router.put("/clear-cart", auth_middleware_1.isAuthenticated, cart_controller_1.clearCart);
exports.default = router;
