import { CategoryType, MainProduct } from "@/types";
import axios from "axios";

export interface ResponseProduct {
  products: MainProduct[];
  limit: number;
}

export interface ProductSingle {
  product: MainProduct;
}

export const getAllProducts = async (fields?: object) => {
  const res = await axios.get<ResponseProduct>(
    `${process.env.NEXT_PUBLIC_API_URL}products`,
    {
      params: { ...fields },
    }
  );
  return res.data;
};

export const getSingleProduct = async (slug: string) => {
  const res = await axios.get<ProductSingle>(
    `${process.env.NEXT_PUBLIC_API_URL}products/${slug}`
  );
  return res.data;
};
