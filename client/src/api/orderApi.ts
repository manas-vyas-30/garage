import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export interface IOrderDetails {
  _id?: string;
  userId: string;
  username: string;
  productId: string;
  productName: string;
  price: number;
}

export const getAllOrders = createAsyncThunk("order/getAllOrders", async () => {
  const response = await axios.get(`${config.Backend_URL}order`);
  return response.data.data;
});

export const createOrder = async (orderDetails: IOrderDetails) => {
  try {
    const response = await axios.post(
      `${config.Backend_URL}order/create`,
      orderDetails
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
