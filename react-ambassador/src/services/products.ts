// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/product';

export interface ProductInfo {
  success?: boolean;
  message?: string;
  error?: string;
}

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/ambassador',
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  //   refetchOnReconnect: true,
  //   refetchOnMountOrArgChange: 5,

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products/frontend`,
    }),
    // updateUser: builder.mutation<Product, Partial<Product>>({
    //   query(data) {
    //     const { ...body } = data;
    //     return {
    //       url: `/auth/admin/users/info`,
    //       method: 'PUT',
    //       body,
    //     };
    //   },
    // }),
    // loginUser: builder.mutation<UserInfo, Partial<Product>>({
    //   query(data) {
    //     const { ...body } = data;
    //     return {
    //       url: `auth/ambassador/login`,
    //       method: 'POST',
    //       body,
    //     };
    //   },
    // }),
    // logoutUser: builder.mutation<any, Partial<Product>>({
    //   query() {
    //     return {
    //       url: `auth/ambassador/logout`,
    //       method: 'POST',
    //     };
    //   },
    // }),
  }),
});

export const { useGetProductsQuery } = productApi;
