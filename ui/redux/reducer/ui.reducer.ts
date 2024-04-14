import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  tooggleAuthModal: boolean;
}

const initialState: UiState = {
  tooggleAuthModal: false,
};

export const uiReducer = createSlice({
  name: "uiReducer",
  initialState,
  reducers: {
    toogleAuthModal: (state) => {
      state.tooggleAuthModal = !state.tooggleAuthModal;
    },
  },
});

export const { toogleAuthModal } = uiReducer.actions;

export default uiReducer.reducer;
