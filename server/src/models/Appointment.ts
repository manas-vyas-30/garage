import { Document, Schema, model } from "mongoose";

export interface IAppointment extends Document {
  date: string;
  userId: string;
  number: number;
  carId: string;
  mechanicId?: string;
  status: string;
  description: string;
  cost: number;
}

const AppointmentSchema: Schema = new Schema(
  {
    date: { type: String, required: true },
    userId: { type: String, required: true },
    number: { type: Number, required: true },
    carId: { type: String, required: true },
    mechanicId: { type: Number },
    status: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<IAppointment>("Appointment", AppointmentSchema);
