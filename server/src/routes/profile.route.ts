import express from "express";

import {
  addNewAddress,
  defaultAddress,
  deleteAddress,
  getAddresses,
  getSingleAddress,
  updateAddress,
  updateProfileData,
  updateProfilePicture,
} from "@/controllers/profile.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";
import fileParser from "@/middlewares/fileparser.middleware";

const router = express.Router();

router.post("/update-pic", isAuthenticated, fileParser, updateProfilePicture);
router.put("/update-profile-data", isAuthenticated, updateProfileData);

router.post("/add-new-address", isAuthenticated, addNewAddress);
router.get("/get-address", isAuthenticated, getAddresses);
router.put("/update-address", isAuthenticated, updateAddress);
router.delete("/delete-address", isAuthenticated, deleteAddress);
router.get("/one-address", isAuthenticated, getSingleAddress);
router.post("/update-default-address", isAuthenticated, defaultAddress);

export default router;
