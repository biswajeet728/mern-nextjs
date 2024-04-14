import { config } from "@/utils/helper";
import mongoose from "mongoose";

const URI = config.MONGO_URI;

export const connectDB = async () => {
  try {
    if (config.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    const { connection } = await mongoose.connect(URI, {
      dbName: "next-eccomerce",
    });
    console.log(`Connected to MongoDB at ${connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
