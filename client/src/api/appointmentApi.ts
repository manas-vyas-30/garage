/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export interface IAppointmentDetails {
  _id?: string;
  date: string;
  userId: string;
  number: string;
  carId: string;
  mechanicId?: string;
  status: string;
  description: string;
  cost: number;
}

export const getAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async () => {
    const response = await axios.get(`${config.Backend_URL}appointment`);
    return response.data.data;
  }
);

export const getAppointmentsByUserId = () => {
  return createAsyncThunk(
    "appointment/getAppointmentsByUserId",
    async (userId?: string) => {
      const response = await axios.get(
        `${config.Backend_URL}appointment/user/${userId}`
      );
      return response.data.data;
    }
  );
};

export const createAppointment = async (
  appointmentDetails: IAppointmentDetails
) => {
  try {
    const response = await axios.post(
      `${config.Backend_URL}appointment/create`,
      appointmentDetails
    );
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export const updateAppointment = async (
  appointmentDetails: IAppointmentDetails
) => {
  try {
    const response = await axios.put(
      `${config.Backend_URL}appointment/update`,
      appointmentDetails
    );
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};
