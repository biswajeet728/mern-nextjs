"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const error_middleware_1 = require("./middlewares/error.middleware");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const profile_route_1 = __importDefault(require("./routes/profile.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const wishlist_route_1 = __importDefault(require("./routes/wishlist.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const coupon_route_1 = __importDefault(require("./routes/coupon.route"));
const helper_1 = require("./utils/helper");
const app = (0, express_1.default)();
(0, config_1.connectDB)();
app.use((0, cors_1.default)({
    origin: [helper_1.config.NEXT_PUBLIC_API_URL, helper_1.config.ADMIN_CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
cloudinary_1.default.v2.config({
    cloud_name: helper_1.config.CLOUDINARY_NAME,
    api_key: helper_1.config.CLOUDINARY_API_KEY,
    api_secret: helper_1.config.CLOUDINARY_API_SECRET,
});
app.get("/", (req, res) => {
    res.send("Hello from express");
});
app.use("/api/auth", auth_route_1.default);
app.use("/api/profile", profile_route_1.default);
app.use("/api/cart", cart_route_1.default);
app.use("/api/wishlist", wishlist_route_1.default);
app.use("/api/orders", order_route_1.default);
app.use("/api/payment", payment_route_1.default);
app.use("/api/products", product_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/coupon", coupon_route_1.default);
app.use(error_middleware_1.errorMiddleware);
app.listen(helper_1.config.PORT || 8800, () => {
    console.log("Server is running on port " + helper_1.config.PORT);
});
