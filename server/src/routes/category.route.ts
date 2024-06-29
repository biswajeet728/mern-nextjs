import {
  createCategory,
  getCategories,
} from "@/controllers/category.controller";
import { isAdmin } from "@/middlewares/admin.middleware";
import express from "express";

const router = express.Router();

router.post("/create", isAdmin, createCategory);
router.get("/", getCategories);

export default router;
