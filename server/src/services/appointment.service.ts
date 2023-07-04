import Appointment, { IAppointment } from "../models/Appointment";

const findAppointments = () => Appointment.find();

const createAppointment = (appointment: IAppointment) => {
  const newAppointment = new Appointment({
    date: appointment.date,
    userId: appointment.userId,
    number: appointment.number,
    carId: appointment.carId,
    mechanicId: appointment.mechanicId,
    status: appointment.status,
    description: appointment.description,
    cost: appointment.cost,
  });
  return newAppointment.save();
};

const findAppointmentById = (id: string) => Appointment.findById(id);

const updateAppointment = (appointment: IAppointment) => {
  const updatedAppointment = {
    date: appointment.date,
    userId: appointment.userId,
    number: appointment.number,
    carId: appointment.carId,
    mechanicId: appointment.mechanicId,
    status: appointment.status,
    description: appointment.description,
    cost: appointment.cost,
  };
  return Appointment.findByIdAndUpdate(appointment._id, updatedAppointment, {
    useFindAndModify: false,
  });
};

const deleteAppointment = (id: string) => Appointment.findByIdAndDelete(id);

const findAppointmentByUser = (userId: string) => Appointment.find({ userId });

const appointmentService = {
  findAppointments,
  createAppointment,
  findAppointmentById,
  updateAppointment,
  deleteAppointment,
  findAppointmentByUser,
};

export default appointmentService;
