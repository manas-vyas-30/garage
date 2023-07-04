import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../../api/authApi";

const initialState = {
  loading: false,
  loggedInUser: {},
  error: ``,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signupUser().pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser().fulfilled, (state, action) => {
      state.loading = false;
      const _id = action.payload.user._id;
      const email = action.payload.user.email;
      const name = action.payload.user.name;
      const number = action.payload.user.number;
      const role = action.payload.user.role;
      const token = action.payload.token;
      state.loggedInUser = { _id, email, name, number, role, token };
      state.error = "";
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(signupUser().rejected, (state, action) => {
      state.loading = false;
      state.loggedInUser = {};
      state.error = action.error.message || ``;
    });

    builder.addCase(loginUser().pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser().fulfilled, (state, action) => {
      state.loading = false;
      const _id = action.payload.user._id;
      const email = action.payload.user.email;
      const name = action.payload.user.name;
      const number = action.payload.user.number;
      const role = action.payload.user.role;
      const token = action.payload.token;
      state.loggedInUser = { _id, email, name, number, role, token };
      state.error = "";
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser().rejected, (state, action) => {
      state.loading = false;
      state.loggedInUser = {};
      state.error = action.error.message || ``;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.loggedInUser = {};
      state.error = "";
      localStorage.removeItem("token");
    });

    builder.addCase(updateUser().pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser().fulfilled, (state, action) => {
      state.loading = false;
      const _id = action.payload.data._id;
      const email = action.payload.data.email;
      const name = action.payload.data.name;
      const number = action.payload.data.number;
      const role = action.payload.data.role;
      const token = action.payload.token;
      state.loggedInUser = { _id, email, name, number, role, token };
      state.error = "";
    });
    builder.addCase(updateUser().rejected, (state, action) => {
      state.loading = false;
      state.loggedInUser = {};
      state.error = action.error.message || ``;
    });
  },
  reducers: {},
});

export default authSlice.reducer;
