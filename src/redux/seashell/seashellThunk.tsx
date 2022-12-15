import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../api/Axios";
import { ISeashells } from "../../interfaces/interfaces";

export const getSeashells = createAsyncThunk("/seashells", async () => {
  const response = await Axios.get("/seashells");
  if (response.data.toString().indexOf("!doctype html") > 0) {
    throw new Error("error getting seashells");
  }
  return response.data as ISeashells[];
});

export const createSeashells = createAsyncThunk(
  "/seashells/data",
  async (data: ISeashells, { dispatch }) => {
    const response = await Axios.post("/seashells", data);

    await dispatch(getSeashells());
    return response.data as ISeashells;
  }
);

export const editSeashells = createAsyncThunk(
  "/seashells/edit",
  async (data: ISeashells, { dispatch }) => {
    Axios.patch(`/seashells/${data.id}`, data).then((res) => {
      dispatch(getSeashells());
    });
  }
);
