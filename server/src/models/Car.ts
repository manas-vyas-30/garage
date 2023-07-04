import { Document, Schema, model } from "mongoose";

export interface ICar extends Document {
  name: string;
  image: string;
  registration: string;
  userId: string;
}

const CarSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    registration: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<ICar>("Car", CarSchema);
