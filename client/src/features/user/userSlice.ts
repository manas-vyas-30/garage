import { createSlice } from "@reduxjs/toolkit";
import { IUserDetails } from "../../api/authApi";
import { fetchUsers } from "../../api/userApi";

export interface UserSlice {
  loading: boolean;
  users: IUserDetails[];
  error: string;
}

const initialState: UserSlice = {
  loading: false,
  users: [],
  error: ``,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || ``;
    });
  },
  reducers: {},
});

export default userSlice.reducer;
