/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export interface IItem {
  _id?: string;
  name: string;
  image?: string;
  description: string;
  cost: number;
  quantity: number;
  sold: number;
  file: string;
}

export const getAllItems = createAsyncThunk("item/getAllItems", async () => {
  try {
    const items = await axios.get(`${config.Backend_URL}item`);
    return items.data.data;
  } catch (error) {
    return error;
  }
});

export const getItemById = async (itemId: string) => {
  try {
    const response = await axios.get(`${config.Backend_URL}item/${itemId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createItem = async (itemDetails: IItem) => {
  const response = await axios.post(
    `${config.Backend_URL}item/create`,
    itemDetails
  );
  return response.data;
};

export const updateItem = async (itemDetails: IItem) => {
  const response = await axios.put(
    `${config.Backend_URL}item/update`,
    itemDetails
  );
  return response.data;
};

export const deleteItem = async (itemId: string) => {
  const response = await axios.delete(
    `${config.Backend_URL}item/delete/${itemId}`
  );
  return response.data;
};
