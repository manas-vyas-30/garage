/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export interface IUserDetails {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  number: string;
}

export const signupUser = () => {
  return createAsyncThunk(
    "auth/signupUser",
    async (userDetails?: IUserDetails) => {
      const response = await axios.post(
        `${config.Backend_URL}auth/register`,
        userDetails
      );
      return response.data;
    }
  );
};

export const loginUser = () => {
  return createAsyncThunk(
    "auth/loginUser",
    async (userDetails?: { email: string; password: string }) => {
      const response = await axios.post(
        `${config.Backend_URL}auth/login`,
        userDetails
      );
      return response.data;
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const logoutUser = createAsyncThunk("auth/logoutUser", () => {});

export const updateUser = () => {
  return createAsyncThunk(
    "user/updateUser",
    async (userDetails?: IUserDetails) => {
      const response = await axios.put(
        `${config.Backend_URL}user/update`,
        userDetails
      );
      return response.data;
    }
  );
};
