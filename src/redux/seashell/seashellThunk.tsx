import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios/Axios";
import { ISeashells } from "../../interfaces/interfaces";

export const getSeashells = createAsyncThunk("/seashells", async () => {
  const response = await Axios.get("/seashells");

  if (response.data.toString().indexOf("!doctype html") > 0) {
    throw new Error("error getting seashells");
  }
  // console.log(response.data);

  return response.data as ISeashells[];
});

export const createSeashells = createAsyncThunk(
  "/seashells/data",
  async (data: ISeashells, { dispatch }) => {
    console.log(data);
    Axios.post("/seashells", data).then((res) => {
      console.log(res.data);
    });

    // return response.data as ISeashells[];
  }
);

export const editSeashells = createAsyncThunk(
  "/seashells/edit",
  async (data: ISeashells, { dispatch }) => {
    console.log(data);

    Axios.patch(`/seashells/${data.id}`, data).then((res) => {
      console.log(res.data);
    });

    // return response.data as ISeashells[];
  }
);
