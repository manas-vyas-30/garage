import { Router } from "express";
import passport from "passport";
import carController from "../controllers/car.controller";
import upload from "../middleware/uploadFile";
require("../config/passport")(passport);

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  carController.findCars,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  carController.findCarById,
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  carController.createCar,
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  carController.updateCar,
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  carController.deleteCar,
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  carController.findCarByUser,
);

export default router;
