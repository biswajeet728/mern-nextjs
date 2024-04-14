import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../types";

export interface AuthUserState {
  user: Profile | null;
  loading: boolean;
}

const initialState: AuthUserState = {
  user: null,
  loading: true,
};

export const authUserReducer = createSlice({
  name: "authUserReducer",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUserState>) => {
      state.user = action.payload.user;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = authUserReducer.actions;

export default authUserReducer.reducer;
