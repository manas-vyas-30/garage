import { Document, Schema, model } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  username: string;
  productId: string;
  productName: string;
  price: number;
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<IOrder>("Order", OrderSchema);
