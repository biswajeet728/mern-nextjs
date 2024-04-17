import express from "express";

import {
  createNewUser,
  getProfile,
  googleOauthHandler,
  requestNewAccessToken,
  signIn,
  signOut,
  verifyUser,
} from "@/controllers/auth.controller";
import { validate } from "@/middlewares/validate.middleware";
import { authVerifySchema, signUpSchema } from "@/validators/auth.validator";
import { isAuthenticated } from "@/middlewares/auth.middleware";
import { config } from "@/utils/helper";

const router = express.Router();

router.post("/signup", validate(signUpSchema), createNewUser);
router.post("/verify", validate(authVerifySchema), verifyUser);
router.post("/signin", signIn);
router.get("/me", isAuthenticated, getProfile);
router.post("/refresh-token", requestNewAccessToken);
router.post("/signout", isAuthenticated, signOut);

router.get("/google/callback", googleOauthHandler);

export default router;
