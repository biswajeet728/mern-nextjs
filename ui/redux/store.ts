import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authQuery";
import { authUserReducer } from "./reducer/auth.reducer";
import { uiReducer } from "./reducer/ui.reducer";

export const store = () => {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [authUserReducer.name]: authUserReducer.reducer,
      [uiReducer.name]: uiReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore["getState"]>;
