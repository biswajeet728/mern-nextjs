import express from "express";
import { connectDB } from "./config";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// routes
import authRoute from "@/routes/auth.route";
import profileRoute from "@/routes/profile.route";
import cartRoute from "@/routes/cart.route";
import wishlistRoute from "@/routes/wishlist.route";
import ordersRoute from "@/routes/order.route";
import paymentRoute from "@/routes/payment.route";
import productRoute from "@/routes/product.route";
import categoryRoute from "@/routes/category.route";
import couponRoute from "@/routes/coupon.route";

// utils
import { config } from "./utils/helper";

const app = express();

// db connect
connectDB();

// middlewares
app.use(
  cors({
    origin: [config.CLIENT_URL, config.ADMIN_CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cloudinary config
cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// test route

app.get("/", (req, res) => {
  res.send("Hello from express");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/coupon", couponRoute);

// error handler
app.use(errorMiddleware);

app.listen(config.PORT || 8800, () => {
  console.log("Server is running on port " + config.PORT);
});
