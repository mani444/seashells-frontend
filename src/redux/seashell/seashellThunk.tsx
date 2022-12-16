import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../api/Axios";
import { ISeashells } from "../../interfaces/interfaces";

export const getSeashells = createAsyncThunk(
  "/seashells",
  async (setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {
    const response = await Axios.get("/seashells");
    if (response.data.toString().indexOf("!doctype html") > 0) {
      throw new Error("error getting seashells");
    }
    if (setIsLoading) {
      setIsLoading(false);
    }

    return response.data as ISeashells[];
  }
);

export const createSeashells = createAsyncThunk(
  "/seashells/data",
  async (data: ISeashells, { dispatch, rejectWithValue }) => {
    const response = await Axios.post("/seashells", data);
    if (response) {
      await dispatch(getSeashells());
      return response.data as ISeashells;
    } else {
      throw rejectWithValue(response);
    }
  }
);

export const editSeashells = createAsyncThunk(
  "/seashells/edit",
  async (data: ISeashells, { dispatch, rejectWithValue }) => {
    const res = await Axios.patch(`/seashells/${data.id}`, data);
    console.log(res);
    if (res) {
      dispatch(getSeashells());
      return res.data as ISeashells;
    } else {
      throw rejectWithValue(res);
    }
  }
);
