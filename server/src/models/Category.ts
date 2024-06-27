import { ICategory } from "@/types";
import { Schema, model } from "mongoose";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", CategorySchema);
export default Category;
