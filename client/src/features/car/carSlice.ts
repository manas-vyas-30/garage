import { createSlice } from "@reduxjs/toolkit";
import {
  ICarDetails,
  addCar,
  deleteCar,
  getCarsByUserId,
  updateCar,
} from "../../api/carApi";

export interface CarSlice {
  loading: boolean;
  cars: ICarDetails[];
  error: string;
}

const initialState: CarSlice = {
  loading: false,
  cars: [],
  error: ``,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCarsByUserId().pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCarsByUserId().fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
      state.error = "";
    });
    builder.addCase(getCarsByUserId().rejected, (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.error.message || ``;
    });

    builder.addCase(addCar().pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCar().fulfilled, (state, action) => {
      state.loading = false;
      const car: never = action.payload.data as unknown as never;
      state.cars = [...state.cars, car];
      state.error = "";
    });
    builder.addCase(addCar().rejected, (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.error.message || ``;
    });

    builder.addCase(updateCar().pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCar().fulfilled, (state, action) => {
      const updatedCars = state.cars.map((car) =>
        car._id === action.payload.data._id
          ? {
              ...car,
              name: action.payload.data.name,
              image: action.payload.data.image,
              registration: action.payload.data.registration,
              updatedAt: action.payload.data.updateAt,
              __v: action.payload.data._v,
            }
          : car
      );
      state.loading = false;
      state.cars = updatedCars as never[];
      state.error = "";
    });
    builder.addCase(updateCar().rejected, (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.error.message || ``;
    });

    builder.addCase(deleteCar().pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCar().fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteCar().rejected, (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.error.message || ``;
    });
  },
  reducers: {},
});

export default carSlice.reducer;
