import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
  role: string;
  number: number;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: String, required: true },
    number: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>("User", UserSchema);
