import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserTable } from "~/types";

export interface UsersState {
  data: { [page: number]: IUserTable[] };
}

const initialState: UsersState = {
  data: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers(
      state,
      action: PayloadAction<{ page: number; users: IUserTable[] }>
    ) {
      const page = action.payload.page;
      const users = action.payload.users;
      if (!state.data[page]) {
        state.data[page] = users;
      }
    },
    resetUsers(state) {
      state.data = {};
    },
  },
});

export const { addUsers, resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
