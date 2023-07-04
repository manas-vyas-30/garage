import { Router } from "express";
import passport from "passport";
import orderController from "../controllers/order.controller";
require("../config/passport")(passport);

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  orderController.findOrders,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.findOrderById,
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  orderController.createOrder,
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  orderController.updateOrder,
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.deleteOrder,
);

export default router;
