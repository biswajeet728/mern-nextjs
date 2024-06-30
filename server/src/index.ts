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

// CORS configuration
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mern-nextjs-ecommerce.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

// db connect
connectDB();

// middlewares
app.use(cookieParser());
app.set("trust proxy", 1);
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
