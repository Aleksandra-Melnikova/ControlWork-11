import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { IProductMutation, OneProduct, Product, ValidationError } from '../../types';
import { apiUrl } from '../../globalConstants.ts';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async () => {
    const productsResponse = await axiosApi<Product[]>("/products");
    return productsResponse.data || [];
  },
);

export const fetchProductsOnCategory = createAsyncThunk<Product[], string>(
  "products/fetchProductsOnCategory",
  async (id) => {
    const productsResponse = await axiosApi<Product[]>("/products?category_id=" + id);
    return productsResponse.data || [];
  },
);

export const getProduct = createAsyncThunk<OneProduct, string>(
  "products/getProduct",
  async (productId) => {
    const response = await axiosApi.get<OneProduct>(`/products/${productId}`);
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk<void, {productId:string,token:string
}>(
  "products/deleteProduct",
  async ({productId, token}) => {
    return axiosApi.delete(`${apiUrl}/products/${productId}`,
      {headers: { Authorization: `${token}`}});
  },
);


export const createProduct = createAsyncThunk<
  Product,
  { productMutation: IProductMutation },
  { state: RootState; rejectValue: ValidationError }
>("products/createProduct", async ({ productMutation }, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;

  try {
    const formData = new FormData();
    const keys = Object.keys(productMutation) as (keyof  IProductMutation)[];

    keys.forEach((key) => {
      const value  = productMutation[key];

      if (value !== null) {
        formData.append(key, value as string | File);
      }
    });

    const response = await axiosApi.post<Product>("/products", formData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});