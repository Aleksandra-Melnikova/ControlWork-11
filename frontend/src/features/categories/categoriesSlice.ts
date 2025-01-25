import { Category } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesThunk.ts";
import { RootState } from "../../app/store.ts";

interface ICategoriesState {
  categories: Category[];
  fetchLoading: boolean;
}

const initialState: ICategoriesState = {
  categories: [],
  fetchLoading: false,
};

export const selectCategoriesItems = (state: RootState) =>
  state.categories.categories;
export const selectFetchCategoriesLoading = (state: RootState) =>
  state.categories.fetchLoading;

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.fetchLoading = false;
        state.categories = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
