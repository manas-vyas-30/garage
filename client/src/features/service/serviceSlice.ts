import { createSlice } from "@reduxjs/toolkit";
import { IServiceDetails, getAllServices } from "../../api/serviceApi";

export interface ServiceSlice {
  loading: boolean;
  services: IServiceDetails[];
  error: string;
}

const initialState: ServiceSlice = {
  loading: false,
  services: [],
  error: ``,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
      state.error = "";
    });
    builder.addCase(getAllServices.rejected, (state, action) => {
      state.loading = false;
      state.services = [];
      state.error = action.error.message || ``;
    });
  },
  reducers: {},
});

export default serviceSlice.reducer;
