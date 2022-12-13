import { configureStore } from "@reduxjs/toolkit";

import seashellReducer from "./seashell/seashellSlice";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    seashell: seashellReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
