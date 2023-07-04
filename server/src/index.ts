import compression from "compression";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import appointmentRouter from "./routes/appointment.route";
import authRouter from "./routes/auth.route";
import carRouter from "./routes/car.route";
import carForSellRouter from "./routes/carForSell.route";
import itemRouter from "./routes/item.route";
import orderRouter from "./routes/order.route";
import serviceRouter from "./routes/service.route";
import userRouter from "./routes/user.route";

const app = express();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

/** Connect to MongoDB */

mongoose
  .connect(process.env.MONGO_URI ?? ``)
  .then(() => {
    console.log("MongoDB connection established successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("returnOriginal", false);

app.use("/appointment", appointmentRouter);
app.use("/auth", authRouter);
app.use("/car", carRouter);
app.use("/car-for-sell", carForSellRouter);
app.use("/item", itemRouter);
app.use("/order", orderRouter);
app.use("/service", serviceRouter);
app.use("/user", userRouter);

/** Start the server */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
