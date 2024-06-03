import express from "express";

import {
  updateProfileData,
  updateProfilePicture,
} from "@/controllers/profile.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";
import fileParser from "@/middlewares/fileparser.middleware";

const router = express.Router();

router.post("/update-pic", isAuthenticated, fileParser, updateProfilePicture);
router.put("/update-profile-data", isAuthenticated, updateProfileData);

export default router;
