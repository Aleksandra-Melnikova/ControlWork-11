import { OneProduct, Product } from '../../types';
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductsOnCategory, getProduct } from './productsThunk.ts';
import { RootState } from "../../app/store.ts";

interface IProductsState {
  products: Product[];
  fetchLoading: boolean;
  createLoading: boolean;
  oneProduct: OneProduct | null;
  fetchOneLoading:boolean
}

const initialState: IProductsState = {
  products: [],
  fetchLoading: false,
  createLoading: false,
  oneProduct: null,
  fetchOneLoading: false,
};

export const selectProductsItems = (state: RootState) => state.products.products;
export const selectFetchLoading = (state: RootState) =>
  state.products.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.products.createLoading;
export const selectOneProduct= (state: RootState) => state.products.oneProduct;
export const selectFetchOneLoading = (state: RootState) =>
  state.products.fetchOneLoading;

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
      .addCase(getProduct.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, { payload: product }) => {
        state.fetchOneLoading = false;
        state.oneProduct = product;
      })
      .addCase(getProduct.rejected, (state) => {
        state.fetchOneLoading = false;
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
