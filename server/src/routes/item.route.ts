import { Router } from "express";
import passport from "passport";
import itemController from "../controllers/item.controller";
import upload from "../middleware/uploadFile";
require("../config/passport")(passport);

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  itemController.findItems,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  itemController.findItemById,
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  itemController.createItem,
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  itemController.updateItem,
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  itemController.deleteItem,
);

export default router;
