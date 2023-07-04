import { Router } from "express";
import passport from "passport";
import ROLES from "../config/roles";
import appointmentController from "../controllers/appointment.controller";
import verifyRoles from "../middleware/verifyRoles";
require("../config/passport")(passport);

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  verifyRoles(ROLES.ADMIN),
  appointmentController.findAppointments,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  appointmentController.findAppointmentById,
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  appointmentController.createAppointment,
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  appointmentController.updateAppointment,
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  appointmentController.deleteAppointment,
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  appointmentController.findAppointmentByUser,
);

export default router;
