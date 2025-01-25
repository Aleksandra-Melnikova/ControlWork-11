import { Product } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductsOnCategory } from './productsThunk.ts';
import { RootState } from "../../app/store.ts";

interface IProductsState {
  products: Product[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IProductsState = {
  products: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectProductsItems = (state: RootState) => state.products.products;
export const selectFetchLoading = (state: RootState) =>
  state.products.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.products.createLoading;

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
        state.fetchLoading = false;
        state.products = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(fetchProductsOnCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchProductsOnCategory.fulfilled, (state, { payload: products }) => {
        state.fetchLoading = false;
        state.products = products;
      })
      .addCase(fetchProductsOnCategory.rejected, (state) => {
        state.fetchLoading = false;
      })

      // .addCase(createProduct.pending, (state) => {
      //   state.createLoading = true;
      // })
      // .addCase(createProduct.fulfilled, (state) => {
      //   state.createLoading = false;
      // })
      // .addCase(createProduct.rejected, (state) => {
      //   state.createLoading = false;
      // });
  },
});

export const productsReducer = productsSlice.reducer;
