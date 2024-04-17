import express from "express";
import { connectDB } from "./config";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import authRoute from "./routes/auth.route";
import { config } from "./utils/helper";

const app = express();

// db connect
connectDB();

// middlewares
app.use(
  cors({
    origin: config.NEXT_PUBLIC_API_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoute);

// error handler
app.use(errorMiddleware);

app.listen(config.PORT || 8800, () => {
  console.log("Server is running on port " + config.PORT);
});
