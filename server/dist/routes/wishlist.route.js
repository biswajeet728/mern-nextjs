"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.isAuthenticated, wishlist_controller_1.createNewWishlist);
router.get("/get-user-wishlist", auth_middleware_1.isAuthenticated, wishlist_controller_1.getWishlist);
router.delete("/remove-wishlist-item", auth_middleware_1.isAuthenticated, wishlist_controller_1.removeItemFromWishlist);
exports.default = router;
