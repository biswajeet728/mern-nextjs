"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/signup", (0, validate_middleware_1.validate)(auth_validator_1.signUpSchema), auth_controller_1.createNewUser);
router.post("/verify", (0, validate_middleware_1.validate)(auth_validator_1.authVerifySchema), auth_controller_1.verifyUser);
router.post("/signin", auth_controller_1.signIn);
router.get("/me", auth_middleware_1.isAuthenticated, auth_controller_1.getProfile);
router.post("/refresh-token", auth_controller_1.requestNewAccessToken);
router.post("/signout", auth_middleware_1.isAuthenticated, auth_controller_1.signOut);
router.get("/google/callback", auth_controller_1.googleOauthHandler);
exports.default = router;
