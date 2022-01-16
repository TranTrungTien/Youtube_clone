import { configureStore } from "@reduxjs/toolkit";
import chanelReducer from "../slices/chanelslice";

export const store = configureStore({
  reducer: {
    user: chanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
