import {
  createProduct,
  getProducts,
  getSingleProduct,
} from "@/controllers/product.controller";
import { isAdmin } from "@/middlewares/admin.middleware";
import fileParser from "@/middlewares/fileparser.middleware";
import express from "express";

const router = express.Router();

router.post("/create", isAdmin, fileParser, createProduct);
router.get("/", getProducts);
router.get("/:slug", getSingleProduct);

export default router;
