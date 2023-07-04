import { createSlice } from "@reduxjs/toolkit";
import { ICarForSellDetails, getAllCarsForSell } from "../../api/carForSellApi";

export interface CarForSellSlice {
  loading: boolean;
  cars: ICarForSellDetails[];
  error: string;
}

const initialState: CarForSellSlice = {
  loading: false,
  cars: [],
  error: ``,
};

const carForSellSlice = createSlice({
  name: "carForSell",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllCarsForSell.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCarsForSell.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
      state.error = "";
    });
    builder.addCase(getAllCarsForSell.rejected, (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.error.message || ``;
    });
  },
  reducers: {},
});

export default carForSellSlice.reducer;
