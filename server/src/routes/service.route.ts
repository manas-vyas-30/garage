import { Router } from "express";
import passport from "passport";
import serviceController from "../controllers/service.controller";
import upload from "../middleware/uploadFile";
require("../config/passport")(passport);

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  serviceController.findServices,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  serviceController.findServiceById,
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  serviceController.createService,
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  serviceController.updateService,
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  serviceController.deleteService,
);

export default router;
