import { Document, Schema, model } from "mongoose";

export interface IService extends Document {
  name: string;
  image: string;
  cost: number;
  description: string;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<IService>("Service", ServiceSchema);
