/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export interface ICarForSellDetails {
  _id?: string;
  name: string;
  image?: string;
  registration: string;
  cost: number;
  quantity: number;
  sold: number;
  file: string;
}

export const getAllCarsForSell = createAsyncThunk(
  "carForSell/getAllCarsForSell",
  async () => {
    try {
      const carForSell = await axios.get(`${config.Backend_URL}car-for-sell`);
      return carForSell.data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getCarForSellById = async (carId: string) => {
  try {
    const response = await axios.get(
      `${config.Backend_URL}car-for-sell/${carId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCarForSell = async (carDetails: ICarForSellDetails) => {
  const response = await axios.post(
    `${config.Backend_URL}car-for-sell/create`,
    carDetails
  );
  return response.data;
};

export const updateCarForSell = async (carDetails: ICarForSellDetails) => {
  const response = await axios.put(
    `${config.Backend_URL}car-for-sell/update`,
    carDetails
  );
  return response.data;
};

export const deleteCarForSell = async (carId: string) => {
  const response = await axios.delete(
    `${config.Backend_URL}car-for-sell/delete/${carId}`
  );
  return response.data;
};
