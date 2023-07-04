import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller";
require("../config/passport")(passport);

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.findUsers,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.findUserById,
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  userController.createUser,
);
router.put("/update", userController.updateUser);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser,
);

export default router;
