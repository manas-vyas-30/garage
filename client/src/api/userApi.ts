/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserDetails } from "./authApi";
import config from "./config.json";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const users = await axios.get(`${config.Backend_URL}user`);
    return users.data.data;
  } catch (error) {
    return error;
  }
});

export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${config.Backend_URL}user/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (userDetails: IUserDetails) => {
  const response = await axios.put(
    `${config.Backend_URL}user/update`,
    userDetails
  );
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(
    `${config.Backend_URL}user/delete/${userId}`
  );
  return response.data;
};
