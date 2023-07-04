import { Document, Schema, model } from "mongoose";

export interface ICarForSell extends Document {
  name: string;
  image: string;
  registration: string;
  cost: number;
  quantity: number;
  sold: number;
}

const CarForSellSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    registration: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<ICarForSell>("CarForSell", CarForSellSchema);
