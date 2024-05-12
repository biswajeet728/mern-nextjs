import express from "express";
import { connectDB } from "./config";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// routes
import authRoute from "@/routes/auth.route";
import cartRoute from "@/routes/cart.route";
import wishlistRoute from "@/routes/wishlist.route";

// utils
import { config } from "./utils/helper";

const app = express();

// db connect
connectDB();

// middlewares
app.use(
  cors({
    origin: [config.NEXT_PUBLIC_API_URL, config.ADMIN_CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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

// routes
app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);

// error handler
app.use(errorMiddleware);

app.listen(config.PORT || 8800, () => {
  console.log("Server is running on port " + config.PORT);
});
