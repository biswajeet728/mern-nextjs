import { CategoryResponse } from "@/types";
import axios from "axios";

export const getAllCategories = async () => {
  const res = await axios.get<CategoryResponse>(
    `${process.env.NEXT_PUBLIC_CATALOGUE_URL}categories`
  );
  return res.data.data;
};
