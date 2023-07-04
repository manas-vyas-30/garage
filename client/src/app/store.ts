/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer, {
  AppointmentSlice,
} from "../features/appointment/appointmentSlice";
import authReducer from "../features/auth/authSlice";
import carReducer, { CarSlice } from "../features/car/carSlice";
import carForSellReducer, {
  CarForSellSlice,
} from "../features/carForSell/carForSellSlice";
import itemReducer, { ItemSlice } from "../features/item/itemSlice";
import orderReducer, { OrderSlice } from "../features/order/orderSlice";
import serviceReducer, { ServiceSlice } from "../features/service/serviceSlice";
import userReducer, { UserSlice } from "../features/user/userSlice";

export interface IStore {
  appointment: AppointmentSlice;
  auth: {
    loading: boolean;
    loggedInUser: any;
    error: string;
  };
  car: CarSlice;
  carForSell: CarForSellSlice;
  item: ItemSlice;
  order: OrderSlice;
  service: ServiceSlice;
  user: UserSlice;
}

const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    auth: authReducer,
    car: carReducer,
    carForSell: carForSellReducer,
    item: itemReducer,
    order: orderReducer,
    service: serviceReducer,
    user: userReducer,
  },
});

export default store;
