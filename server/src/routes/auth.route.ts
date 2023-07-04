import { Router } from "express";
import passport from "passport";
import authController from "../controllers/auth.controller";
require("../config/passport")(passport);

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.logInUser);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  authController.protectedRoute,
);

export default router;
