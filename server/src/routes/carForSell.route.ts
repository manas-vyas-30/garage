import { Router } from "express";
import passport from "passport";
import carForSellController from "../controllers/carForSell.controller";
import upload from "../middleware/uploadFile";
require("../config/passport")(passport);

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  carForSellController.findCarsForSell,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  carForSellController.findCarForSellById,
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  carForSellController.createCarForSell,
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  carForSellController.updateCarForSell,
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  carForSellController.deleteCarForSell,
);

export default router;
