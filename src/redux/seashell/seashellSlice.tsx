import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISeashells } from "../../interfaces/interfaces";
import { getSeashells, createSeashells, editSeashells } from "./seashellThunk";
// Define the initial state using that type
const initialState: ISeashells[] = [
  {
    id: "",
    name: "",
    description: "",
    species: "",
  },
];

// const initialArrayState: ISeashells[] = [initialState];

export const seashellSlice = createSlice({
  name: "seashell",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    edit: (state, action: PayloadAction<ISeashells>) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSeashells.fulfilled,
      (state, action: PayloadAction<ISeashells[]>) => {
        // console.log(action.payload);

        state = action.payload;
        return state;
      }
    );
    builder.addCase(getSeashells.rejected, () => {
      throw new Error();
    });
    builder.addCase(createSeashells.fulfilled, (state) => {
      console.log(state);

      // state = action.payload;
      return state;
    });
    builder.addCase(editSeashells.fulfilled, (state) => {
      console.log(state);

      // state = action.payload;
      return state;
    });
  },
});

export const { edit } = seashellSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default seashellSlice.reducer;
