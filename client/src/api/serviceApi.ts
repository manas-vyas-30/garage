/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export interface IServiceDetails {
  _id?: string;
  name: string;
  image?: string;
  cost: number;
  description: string;
  file?: string;
}

export const getAllServices = createAsyncThunk(
  "service/getAllServices",
  async () => {
    const response = await axios.get(`${config.Backend_URL}service`);
    return response.data.data;
  }
);

export const getServicesById = createAsyncThunk(
  "service/getServicesById",
  async (serviceId: string) => {
    const response = await axios.get(
      `${config.Backend_URL}service/${serviceId}`
    );
    return response.data.data;
  }
);

export const addService = async (serviceDetails: IServiceDetails) => {
  const response = await axios.post(
    `${config.Backend_URL}service/create`,
    serviceDetails
  );
  return response.data;
};

export const updateService = async (serviceDetails: IServiceDetails) => {
  const response = await axios.put(
    `${config.Backend_URL}service/update`,
    serviceDetails
  );
  return response.data;
};

export const deleteService = async (serviceId: string) => {
  const response = await axios.delete(
    `${config.Backend_URL}service/delete/${serviceId}`
  );
  return response.data;
};
