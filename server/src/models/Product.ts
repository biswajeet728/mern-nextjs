import { Schema, model } from "mongoose";
import { IProductResponse } from "@/types";

const ProductSchema = new Schema<IProductResponse>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
  salePrice: {
    type: Number,
    required: false,
  },
  isBestSelling: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

const Product = model("Product", ProductSchema);
export default Product;
