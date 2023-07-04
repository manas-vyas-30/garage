/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export interface ICarDetails {
  _id?: string;
  name: string;
  image?: string;
  registration: string;
  userId: string;
  file: string;
}

export const getCarsByUserId = () => {
  return createAsyncThunk("car/getCarsByUserId", async (userId?: string) => {
    const response = await axios.get(`${config.Backend_URL}car/user/${userId}`);
    return response.data.data;
  });
};

export const addCar = () => {
  return createAsyncThunk("car/addCar", async (carDetails?: ICarDetails) => {
    const response = await axios.post(
      `${config.Backend_URL}car/create`,
      carDetails
    );
    return response.data;
  });
};

export const updateCar = () => {
  return createAsyncThunk("car/updateCar", async (carDetails?: ICarDetails) => {
    const response = await axios.put(
      `${config.Backend_URL}car/update`,
      carDetails
    );
    return response.data;
  });
};

export const deleteCar = () => {
  return createAsyncThunk("car/deleteCar", async (carId?: string) => {
    const response = await axios.delete(
      `${config.Backend_URL}car/delete/${carId}`
    );
    return response.data.data;
  });
};
