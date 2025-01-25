import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { OneProduct, Product } from '../../types';
import { apiUrl } from '../../globalConstants.ts';

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

// export const createProduct = createAsyncThunk<void, ProductMutation>(
//   "products/createProduct",
//   async (productMutation) => {
//     const formData = new FormData();
//
//     const keys = Object.keys(productMutation) as (keyof ProductMutation)[]; // [title, price]
//
//     keys.forEach((key) => {
//       const value = productMutation[key];
//
//       if (value !== null) {
//         formData.append(key, value);
//       }
//     });
//
//     await axiosApi.post("/products", formData);
//   },
// );
