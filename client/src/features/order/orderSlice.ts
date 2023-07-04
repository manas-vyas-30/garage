import { createSlice } from "@reduxjs/toolkit";
import { IOrderDetails, getAllOrders } from "../../api/orderApi";

export interface OrderSlice {
  loading: boolean;
  orders: IOrderDetails[];
  error: string;
}

const initialState: OrderSlice = {
  loading: false,
  orders: [],
  error: ``,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = "";
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.error.message || ``;
    });
  },
  reducers: {},
});

export default orderSlice.reducer;
