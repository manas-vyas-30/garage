import { RequestHandler } from "express";
import appointmentService from "../services/appointment.service";

const createAppointment: RequestHandler = async (req, res, next) => {
  try {
    const data = await appointmentService.createAppointment(req.body);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findAppointments: RequestHandler = async (req, res, next) => {
  try {
    const data = await appointmentService.findAppointments();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findAppointmentById: RequestHandler = async (req, res, next) => {
  try {
    const data = await appointmentService.findAppointmentById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not found!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateAppointment: RequestHandler = async (req, res, next) => {
  try {
    const data = await appointmentService.findAppointmentById(req.body._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not found!" });
    const appointment = await appointmentService.updateAppointment(req.body);
    res.status(200).json({ success: true, data: appointment });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteAppointment: RequestHandler = async (req, res, next) => {
  try {
    const data = await appointmentService.findAppointmentById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not found!" });
    const appointment = await appointmentService.deleteAppointment(
      req.params.id,
    );
    res.status(200).json({ success: true, data: appointment });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findAppointmentByUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await appointmentService.findAppointmentByUser(
      req.params.userId,
    );
    if (data.length === 0)
      return res
        .status(404)
        .json({ success: false, msg: "User does not have any appointment!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const appointmentController = {
  createAppointment,
  findAppointments,
  findAppointmentById,
  updateAppointment,
  deleteAppointment,
  findAppointmentByUser,
};

export default appointmentController;
