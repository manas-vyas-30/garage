import { Document, Schema, model } from "mongoose";

export interface IItem extends Document {
  name: string;
  image: string;
  description: string;
  cost: number;
  quantity: number;
  sold: number;
}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<IItem>("Item", ItemSchema);
